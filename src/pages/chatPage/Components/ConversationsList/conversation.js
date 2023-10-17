import React, { useEffect, useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, message } from 'antd';
import axios from 'axios'
import { formatDateTime } from '../../../../utils/chatContactFormat'
import { useSelector } from 'react-redux';
import './index.less'
import { useLocation } from 'react-router-dom';
import { getspecificconversationunreadnum, getuser } from '../../../../api/user.api';

export default function Conversation(props) {
    const { conversation, currentUserId } = props
    const currentConversationID = useLocation().pathname.split('/')[4]
    const { currentTheme } = useSelector(state => state.user)
    const [contact, setContact] = useState()
    const [unreadNum, setUnreadNum] = useState(0)
    useEffect(() => {
        const contactIndex = conversation.members.indexOf(currentUserId) === 1 ? 0 : 1
        const contactID = conversation.members[contactIndex]
        const getContactInfo = async () => {
            const res = await getuser(contactID)
            setContact(res)
        }
        getContactInfo()
    }, [props])
    useEffect(() => {
        const getUnreadNum = async () => {
            const res = await getspecificconversationunreadnum(conversation._id)
            console.log(res);
            setUnreadNum(res.length)
        }
        getUnreadNum()
        // const readNum = setInterval(getUnreadNum, 3000)
        // return () => {
        //     clearInterval(readNum)
        // }
    }, [])

    const selectedChatMessageBoxClassname = currentConversationID === conversation._id ? (currentTheme === 'light' ? "chat-MessageBox-light-selected" : "chat-MessageBox-dark-selected") : ''
    const lightClassname = currentTheme === 'light' ? "chat-MessageBox-light" : ''
    return (
        <div className={`chat-MessageBox ${selectedChatMessageBoxClassname} ${lightClassname}`} >
            <div className='chat-messageBox-avator'>
                <Badge size="small" count={currentConversationID === conversation._id ? 0 : unreadNum}>
                    {contact ? <Avatar shape='square' size={50} src={contact.avator} icon={<UserOutlined />} /> :
                        <Avatar shape='square' size={50} icon={<UserOutlined />} />}
                </Badge>
            </div>
            <div className='userInfo'>
                <div className='topInfo'>
                    <p className='userName'>{contact && contact.name}</p>
                    <span className='date'>{formatDateTime(conversation.updatedAt)}</span>
                </div>
                {currentConversationID !== conversation._id && <p className='message'>
                    {conversation.lastWordType === 'text' && conversation.lastWords}
                    {conversation.lastWordType === 'picture' && '[ picture ]'}
                    {conversation.lastWordType === 'video' && '[ video ]'}
                </p>}
            </div>
        </div>
    )
}
