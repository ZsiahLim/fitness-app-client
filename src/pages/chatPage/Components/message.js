import React, { useEffect, useState } from 'react'
import {
    UserOutlined
} from '@ant-design/icons';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { FormatTimestamp } from '../../../utils/chatMessageFormat';



export default function Message(props) {
    const { owner, text, sender, createdAt } = props
    const ownerClassname = owner === true ? 'owner' : ''
    const { currentUser } = useSelector((state) => state.user)
    const [contactImg, setContactImg] = useState()
    useEffect(() => {
        const getContactImg = async () => {
            const res = await axios.get(`http://localhost:3001/api/users/find/${sender}`, { withCredentials: true })
            setContactImg(res.data.avator)
        }
        !owner && getContactImg()
        console.log();
    }, [])
    return (
        <>
            <div className={`chat-message ${ownerClassname}`}>
                <div className='chat-messagerInfo'>
                    {owner ? <Avatar size={40} icon={<UserOutlined />} src={currentUser?.avator ? currentUser.avator : ''} /> :
                        <Avatar size={40} icon={<UserOutlined />} src={contactImg ? contactImg : ''} />}
                </div>
                <div className='chat-messagerContent'>
                    <span className='messageItself'>{text}</span>
                    {Math.abs(new Date().getTime() - new Date(createdAt).getTime()) >= (3 * 60 * 1000) && <span span className='messageTimeAgo'>{FormatTimestamp(createdAt)}</span>}
                </div>
            </div >
        </>
    )
}
