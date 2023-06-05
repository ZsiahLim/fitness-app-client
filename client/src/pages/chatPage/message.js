import React from 'react'
import {
    UserOutlined
} from '@ant-design/icons';
import { Avatar } from 'antd';
import pngurl5 from '../../Pic/workoutPlan.jpg'
import { useSelector } from 'react-redux'


export default function Message(props) {

    const { currentUser } = useSelector((state) => state.user)

    return (
        <>
            <div className='chat-message owner'>
                <div className='chat-messagerInfo'>
                    <Avatar size={40} icon={<UserOutlined />} src={currentUser?.avator ? currentUser.avator : ''} />
                </div>
                <div className='chat-messagerContent'>
                    <span className='messageItself'>hello</span>
                    <img className='messagePhoto' src={pngurl5}></img>
                </div>
            </div>
        </>
    )
}
