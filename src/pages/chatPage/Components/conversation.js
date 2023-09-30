import React, { useEffect, useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, message } from 'antd';
import axios from 'axios'
import { formatDateTime } from '../../../utils/chatContactFormat'

export default function Conversation(props) {
    const { conversation, currentUserId, selected } = props
    const [contact, setContact] = useState()
    useEffect(() => {
        const contactIndex = conversation.members.indexOf(currentUserId) === 1 ? 0 : 1
        const contactID = conversation.members[contactIndex]
        const getContactInfo = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/users/find/${contactID}`)
                setContact(res.data)
            } catch (error) {
                console.log(error);
                message.error('failed to get your contact')
            }
        }
        contactID && getContactInfo()
        console.log(conversation.updatedAt);
    }, [props])
    const selectedChatMessageBoxClassname = selected ? 'chat-MessageBox-selected' : ''
    return (
        <>
            <div className={`chat-MessageBox ${selectedChatMessageBoxClassname}`} >
                <div className='chat-messageBox-avator'>
                    {contact ? <Avatar size={50} src={contact.avator} icon={<UserOutlined />} /> :
                        <Avatar size={50} icon={<UserOutlined />} />}
                </div>
                <div className='userInfo'>
                    <div className='topInfo'>
                        <p className='userName'>{contact && contact.name}</p>
                        <span className='date'>{formatDateTime(conversation.updatedAt)}</span>
                    </div>
                    <p className='message'>{conversation.lastWords}</p>
                </div>
            </div>
        </>
    )
}
