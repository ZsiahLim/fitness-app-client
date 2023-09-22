import React, { useState, useEffect } from 'react'
import { UserOutlined, HeartTwoTone, MessageFilled, HeartFilled } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import './index.less'
import { useSelector } from 'react-redux'

export default function Index(props) {
    const { currentUser } = useSelector((state) => state.user)

    const { theme } = props
    const [liked, setLiked] = useState(true)
    const contactsDashboardClassname = theme === 'light' ? 'contacts-light' : ''
    const contactorClassname = theme === 'light' ? 'contactor-light' : ''

    return (
        <div className={`contacts ${contactsDashboardClassname}`}>
            <div className='header' style={{ marginLeft: 20, fontWeight: 500, fontsize: 30, fontWeight: 700 }}>
                Contacts
            </div>
            <div className='contactlist' style={{ hight: '90%', width: "100%" }}>
                <div className={`contactor ${contactorClassname}`}>
                    <div className='avator'>
                        <Avatar size={88} icon={<UserOutlined />} src={currentUser?.avator ? currentUser.avator : ''} />
                    </div>
                    <div className='contactname'>
                        <h2>Leon666</h2>
                    </div>
                    <div className='contactstatus'>
                        <p>Have a nice day!</p>
                        <div className='likeStatusBtn' onClick={() => setLiked(!liked)}>
                            {liked ? <HeartTwoTone /> : <HeartFilled />}
                        </div>
                    </div>
                    <div className='contactOperationBtn'>
                        <Button>Message<MessageFilled /></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
