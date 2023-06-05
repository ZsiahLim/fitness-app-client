import React from 'react'
import {
    UserOutlined
} from '@ant-design/icons';
import { Avatar } from 'antd';

export default function ContactMessage() {
    return (
        <>
            <div className='chat-MessageBox'>
                <Avatar size={50} icon={<UserOutlined />} />
                <div className='userInfo'>
                    <span className='userName'>Leon</span>
                    <p className='message'>hello</p>
                </div>
            </div>
        </>
    )
}
