import React, { useState } from 'react'
import imgPath from '../../Pic/workoutPlan.jpg'
import imgPath1 from '../../Pic/tutorial.webp'
import imgPath2 from '../../Pic/game.webp'
import './blog.less'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'

import { UserOutlined, HeartTwoTone, MessageFilled, HeartFilled } from '@ant-design/icons';


export default function Blog({ blogInfo }) {
    const { userID, title, content, likesUsers, dislikeUsers, favoriteUsers, imgUrl, tags } = blogInfo || {}
    const { currentUser } = useSelector((state) => state.user)
    const { _id, name, personalStatus, age, preferedTheme, preferedLanguage, gender } = currentUser
    const [liked, setLiked] = useState(true)
    return (
        <div className='oneBlog' style={{ width: "100%" }}>
            <div className='blogImg'>
                <img src={imgUrl} style={{ width: "100%" }} />
            </div>
            <div className='blogMainPart'>
                <div className='blogTitle'>{title}</div>
                <div className='blogOperation'>
                    <div className='UserInfo'>
                        <Avatar size={30} icon={<UserOutlined />} src={currentUser?.avator ? currentUser.avator : ''} />
                        &nbsp;{name}
                    </div>
                    <div className='operation'>
                        <div className='likeStatusBtn' onClick={() => setLiked(!liked)}>
                            {liked ? <HeartTwoTone /> : <HeartFilled />} {likesUsers.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
