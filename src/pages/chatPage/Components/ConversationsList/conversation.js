import React, { useEffect, useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, message } from 'antd';
import axios from 'axios'
import { formatDateTime } from '../../../../utils/chatContactFormat'
import { useSelector } from 'react-redux';
import './index.less'
import { useLocation } from 'react-router-dom';
import { getspecificconversationunreadnum, getuser } from '../../../../api/user.api';
import COLORS from '../../../../constants/COLORS';

export default function Conversation(props) {
    const { conversation, currentUserId } = props
    const contactIndex = conversation.members.indexOf(currentUserId) === 1 ? 0 : 1
    const contactID = conversation.members[contactIndex]

    const currentConversationID = useLocation().pathname.split('/')[4]
    const { currentTheme, currentUser } = useSelector(state => state.user)
    const [contact, setContact] = useState()
    const [unreadNum, setUnreadNum] = useState(0)
    const [alreadySubscribed, setAlreadySubscribed] = useState(true)
    useEffect(() => {
        setAlreadySubscribed(currentUser.contactsUsers.includes(contactID))
    }, [currentUser])

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
    }, [])

    const getMsgValue = (conversation) => {
        switch (conversation.lastWordType) {
            case 'text':
                return conversation.lastWords
            case 'image':
                return '[picture]'
            case 'video':
                return '[video]'
            default:
                break;
        }
    }
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
                    <div className='userName' style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div>{contact && contact.name}</div>
                        {!alreadySubscribed && <div style={{ fontSize: 10, color: COLORS.commentText }}>[未关注]</div>}
                    </div>
                    <span className='date'>{formatDateTime(conversation.updatedAt)}</span>
                </div>
                {currentConversationID !== conversation._id && <p className='message'>
                    {getMsgValue(conversation)}
                </p>}
            </div>
        </div>

    )
}
