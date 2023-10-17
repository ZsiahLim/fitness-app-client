import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux'
import { FormatTimestamp } from '../../../utils/chatMessageFormat';
import VideoJSForMessage from '../../../components/VideoJSForMessage';
import { useState } from 'react';

export default function Message(props) {
    const { owner, contact, message } = props
    const { msgValue, createdAt, msgType } = message
    const ownerClassname = owner ? 'owner' : ''
    const { currentUser } = useSelector((state) => state.user)
    const [msgWidth, setMsgWidth] = useState(message.msgWidth > message.msgHeight ? 280 : 200)
    return (
        <>
            <div className={`chat-message ${ownerClassname}`}>
                <div className='chat-messagerInfo'>
                    {owner ? <Avatar size={40} icon={<UserOutlined />} src={currentUser?.avator ? currentUser.avator : ''} /> :
                        <Avatar size={40} icon={<UserOutlined />} src={contact && contact.avator} />}
                </div>
                <div className='chat-messagerContent'>
                    {msgType === 'text' && <span className='message-text'>{msgValue}</span>}
                    {msgType === 'image' && <div className='message-image' style={{ width: msgWidth }}>
                        <img src={msgValue}></img>
                    </div>}
                    {msgType === 'video' && <div className='message-image' style={{ width: msgWidth, height: (msgWidth * message.msgHeight / message.msgWidth) }}>
                        <VideoJSForMessage message={message} />
                    </div>}
                    {Math.abs(new Date().getTime() - new Date(createdAt).getTime()) >= (3 * 60 * 1000) && <span span className='messageTimeAgo'>{FormatTimestamp(createdAt)}</span>}
                </div>
            </div >
        </>
    )
}
