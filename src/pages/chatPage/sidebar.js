import React, { useState, useRef, useEffect } from 'react'
import {
    StarTwoTone,
    MessageTwoTone,
    ContactsTwoTone,
    SearchOutlined,
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Input, Button, Popover } from 'antd';
import ContactMessage from './contactMessage';


const content = (
    <div>
        username or <br />
        user's Email
    </div>
);


export default function Sidebar(props) {
    const { theme } = props
    const [selectPage, setSelectPage] = useState('chat');
    const lightnavigation = theme === 'light' ? 'navigation-light' : ''
    return (
        <>
            <div className='chat-edit-bar'>
                <div className='navigationBar'>
                    <div className={`navigation ${lightnavigation}`} onClick={() => setSelectPage('chat')}>
                        <MessageTwoTone className='navigationCenteredItem' twoToneColor={selectPage === 'chat' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} />
                    </div>
                    <div className={`navigation ${lightnavigation}`} onClick={() => setSelectPage('contact')}>
                        <ContactsTwoTone className='navigationCenteredItem' twoToneColor={selectPage === 'contact' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} />
                    </div>
                    <div className={`navigation ${lightnavigation}`} onClick={() => setSelectPage('favorites')}>
                        <StarTwoTone className='navigationCenteredItem' twoToneColor={selectPage === 'favorites' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} />
                    </div>
                </div >
            </div>
            <div className='chat-contact'>
                <div className='chat-contact-header'>
                    <Input placeholder="Search" style={{ width: '200px' }} prefix={<SearchOutlined />} allowClear />
                    <Popover placement="bottomLeft" title={<h3>Add a new user</h3>} content={content} arrow={false}>
                        <Button icon={<PlusOutlined />} />
                    </Popover>
                </div>
                <div>
                    <ContactMessage />
                    <ContactMessage />
                    <ContactMessage />
                    <ContactMessage />
                    <ContactMessage />
                    <ContactMessage />
                    <ContactMessage />
                    <ContactMessage />
                    <ContactMessage />
                    <ContactMessage />
                    <ContactMessage />
                    <ContactMessage />
                    <ContactMessage />
                    <ContactMessage />
                    <ContactMessage />
                </div>
            </div>
        </>
    )
}
