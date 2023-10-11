import React, { useState } from 'react'
import { UserOutlined, HeartTwoTone, MessageFilled, HeartFilled } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import './index.less'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl';

export default function Index() {//need to update
    const { currentUser, currentTheme } = useSelector((state) => state.user)
    const { formatMessage } = useIntl()
    const [liked, setLiked] = useState(true)
    const contactsDashboardClassname = currentTheme === 'light' ? 'contacts-light' : ''
    const contactorClassname = currentTheme === 'light' ? 'contactor-light' : ''

    return (
        <div className={`contacts ${contactsDashboardClassname}`}>
            <div className='header' style={{ marginLeft: 20, fontWeight: 500, fontsize: 30, fontWeight: 700 }}>
                {formatMessage({ id: 'contacts' })}
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
                        <Button>{formatMessage({ id: 'sendMessage' })}<MessageFilled /></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
