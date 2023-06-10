import React, { useState, useRef, useEffect } from 'react'
import {
    StarTwoTone,
    MessageTwoTone,
    ContactsTwoTone,
    SearchOutlined,
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Input, Button, Popover, Badge } from 'antd';
import ContactMessage from './contactMessage';


const content = (
    <div>
        username or <br />
        user's Email
    </div>
);


export default function Sidebar(props) {
    const { theme } = props
    useEffect(() => {
        console.log(theme);
    }, [theme])
    const [selectPage, setSelectPage] = useState('chat');
    const lightnavigation = theme === 'light' ? 'navigation-light' : ''
    const lightchatContact = theme === 'light' ? 'chat-contact-light' : ''
    return (
        <>
            <div className='chat-edit-bar'>
                <div className='navigationBar'>
                    <div className={`navigation ${lightnavigation}`}
                        style={{
                            borderBottom: selectPage === 'chat' ? '2px solid #4e8df5' : '',
                            backgroundColor: selectPage === 'chat' ? `${theme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => setSelectPage('chat')}
                    >
                        <Badge size="small" count={5}>
                            <MessageTwoTone
                                className='navigationCenteredItem'
                                twoToneColor={selectPage === 'chat' ? '#4e8df5' : "#3d3d3d"}
                                style={{ fontSize: 18 }}
                            />
                        </Badge>
                    </div>
                    <div className={`navigation ${lightnavigation}`}
                        style={{
                            borderBottom: selectPage === 'contact' ? '2px solid #4e8df5' : '',
                            backgroundColor: selectPage === 'contact' ? `${theme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => setSelectPage('contact')}
                    >
                        <ContactsTwoTone
                            className='navigationCenteredItem'
                            twoToneColor={selectPage === 'contact' ? '#4e8df5' : "#3d3d3d"}
                            style={{ fontSize: 18 }}
                        />
                    </div>
                    <div className={`navigation ${lightnavigation}`}
                        style={{
                            borderBottom: selectPage === 'favorites' ? '2px solid #4e8df5' : '',
                            backgroundColor: selectPage === 'favorites' ? `${theme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => setSelectPage('favorites')}
                    >
                        <StarTwoTone
                            className='navigationCenteredItem'
                            twoToneColor={selectPage === 'favorites' ? '#4e8df5' : "#3d3d3d"}
                            style={{ fontSize: 18 }}
                        />
                    </div>
                </div >
            </div>
            <div className={`chat-contact ${lightchatContact}`}>
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
