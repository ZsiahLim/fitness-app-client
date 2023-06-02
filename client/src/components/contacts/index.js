import React, { useState, useEffect } from 'react'
import { EditOutlined, EllipsisOutlined, CommentOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import './index.css'
const { Meta } = Card;
const TAGS = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)
export default function Index(props) {
    const { theme } = props
    const contactsDashboardClassname = theme === 'light' ? 'contacts-light' : ''
    return (
        <div className={`contacts ${contactsDashboardClassname}`}>
            <div className='header' style={{ fontWeight: 500, fontsize: 24, fontWeight: 700 }}>
                Contacts
            </div>
            <div className='contactlist' style={{ hight: '80%', width: "100%" }}>
                <Card
                    className='contactor'
                    style={{
                        width: '90%',
                    }}
                    cover={
                        <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                    }
                    actions={[
                        <CommentOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]}
                >
                    <Meta
                        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                        title="Leon"
                        description="I am free please contact me"
                    />
                </Card>
            </div>
        </div>
    )
}
