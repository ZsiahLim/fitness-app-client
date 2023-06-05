import React, { useState } from 'react'
import {
    EllipsisOutlined
} from '@ant-design/icons';
import Message from './message';
import { Button } from 'antd';

export default function ChatBox() {
    return (
        <>
            <div className='chatInfo'>
                <div className='ChatUserName'>Leon</div>
                <div className='chat-icons'><EllipsisOutlined /></div>
            </div>
            <div className='chat-messages'>
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </div>
            <div className='chat-sendInput'>
                <input type='text' placeholder='Type something...'></input>
                <div className='chat-sendPart'>
                    {/* <input type="file"></input> */}
                    <Button>Send</Button>
                </div>
            </div >
        </>
    )
}
