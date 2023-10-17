import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ContactsTwoTone, MessageTwoTone, StarTwoTone, } from '@ant-design/icons';
import { Badge, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom'
import { getunreadedmessage } from '../../../api/user.api';

export default function FootNavigationBar() {
    const { currentTheme } = useSelector(state => state.user)
    const navigateTo = useNavigate()
    const page = useLocation()
    const selectPage = page.pathname.split('/')[2]
    const lightnavigation = currentTheme === 'light' ? 'navigation-light' : ''
    const [unreadNum, setUnreadNum] = useState(0)
    const getData = () => {
        getunreadedmessage().then(msgs => {
            setUnreadNum(msgs.length)
        })
    }
    useEffect(() => {
        getData()
        const intervalId = setInterval(getData, 3000);
        return () => {
            clearInterval(intervalId);
        };
    }, [page])
    return (
        <>
            <div className={`navigation ${lightnavigation}`}
                style={{
                    backgroundColor: selectPage === 'conversations' ? `${currentTheme === 'dark' ? '#383838' : '#ffffff'}` : ''
                }}
                onClick={() => navigateTo('/chat/conversations')}
            >
                <Badge size="small" count={unreadNum}>
                    <MessageTwoTone
                        className='navigationCenteredItem'
                        twoToneColor={selectPage === 'conversations' ? '#4e8df5' : "#3d3d3d"}
                        style={{ fontSize: 26 }}
                    />
                </Badge>
            </div>
            <div className={`navigation ${lightnavigation}`}
                style={{
                    backgroundColor: selectPage === 'contacts' ? `${currentTheme === 'dark' ? '#383838' : '#ffffff'}` : ''
                }}
                onClick={() => navigateTo('/chat/contacts')}
            >
                <ContactsTwoTone
                    className='navigationCenteredItem'
                    twoToneColor={selectPage === 'contacts' ? '#4e8df5' : "#3d3d3d"}
                    style={{ fontSize: 26 }}
                />
            </div>
            <div className={`navigation ${lightnavigation}`}
                style={{
                    backgroundColor: selectPage === 'favorites' ? `${currentTheme === 'dark' ? '#383838' : '#ffffff'}` : ''
                }}
                onClick={() => navigateTo('/chat/favorites')}
            >
                <StarTwoTone
                    className='navigationCenteredItem'
                    twoToneColor={selectPage === 'favorites' ? '#4e8df5' : "#3d3d3d"}
                    style={{ fontSize: 26 }}
                />
            </div>
        </>
    )
}
