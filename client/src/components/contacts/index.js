import React, { useState, useEffect } from 'react'
import { UserOutlined, HeartTwoTone } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import './index.less'
import { useSelector } from 'react-redux'

export default function Index(props) {
    const { currentUser } = useSelector((state) => state.user)

    const { theme } = props
    const contactsDashboardClassname = theme === 'light' ? 'contacts-light' : ''
    return (
        <div className={`contacts ${contactsDashboardClassname}`}>
            <div className='header' style={{ fontWeight: 500, fontsize: 24, fontWeight: 700 }}>
                Contacts
            </div>
            <div className='contactlist' style={{ hight: '90%', width: "100%" }}>
                <div className='contactor'>
                    <div className='avator'>
                        <Avatar size={70} icon={<UserOutlined />} src={currentUser?.avator ? currentUser.avator : ''} />
                    </div>
                    <div className='contactname'>
                        <h2>Leon666</h2>
                    </div>
                    <div className='contactstatus'>
                        <p>Have a nice day!</p>
                        <div className='likeStatusBtn'>
                            <HeartTwoTone />
                        </div>
                    </div>
                    <div className='contactOperationBtn'>
                        <Button>Message</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
