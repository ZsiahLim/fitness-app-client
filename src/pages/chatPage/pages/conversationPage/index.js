import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Conversation from '../../Components/ConversationsList/conversation';
import { getconversation } from '../../../../api/user.api';
import FootNavigationBar from '../../Components/footNavigationBar';
import { useIntl } from 'react-intl';
import { Empty } from 'antd';
export default function ConversationPage() {
    const intl = useIntl()
    const { currentUser } = useSelector((state) => state.user)
    const location = useLocation()
    const navigateTo = useNavigate()
    const [conversations, setConversations] = useState(useLoaderData())
    useEffect(() => {
        const getData = async () => {
            const conversations = await getconversation()
            setConversations(conversations)
        }
        getData()
    }, [location])
    return (
        <>
            <div className="chat-contentBox-leftBar">
                <div className="chat-contentBox-leftBar-header">
                    <div className="chat-contentBox-leftBar-header-title">{intl.formatMessage({ id: 'app.cmty.title.chat' })}</div>
                </div>
                <div className="chat-contentBox-leftBar-mainContent">
                    <div className='conversations'>
                        {conversations?.length === 0 && <div style={{ padding: '50px 0' }}>
                            <Empty description={false} />
                        </div>}
                        {conversations?.map((conversation) => <div key={conversation._id} onClick={() => navigateTo(`/chat/conversations/specific/${conversation._id}`)}> <Conversation conversation={conversation} currentUserId={currentUser._id} /></div>)}
                    </div>
                </div>
                <div className="chat-contentBox-leftBar-footNavigationBar">
                    <FootNavigationBar />
                </div>
            </div>
            <div className="chat-contentBox-rightBar">
                <Outlet />
            </div>
        </>
    )
}
