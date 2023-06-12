import React from 'react'
import Blog from './blog';
import imgPath from '../../Pic/workoutPlan.jpg'
import imgPath1 from '../../Pic/tutorial.webp'
import imgPath2 from '../../Pic/game.webp'
import imgPath3 from '../../Pic/contact2.avif'
import imgPath4 from '../../Pic/contact.webp'
import jay from '../../Pic/jay.jpg'
import test1 from '../../Pic/test1.jpg'
export default function BlogsBox() {
    return (
        <div className='blog-content'>
            <div class="row">
                <div class="column">
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath2, title: 'zhendehao', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: test1, title: 'wow', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath2, title: 'apple', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath1, title: 'huawei', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: '磊恒', likesUsers: ['1', '2', '3'] }} />
                </div>

                <div class="column">
                    <Blog blogInfo={{ imgUrl: jay, title: '周杰伦', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath2, title: '你好', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath1, title: 'hello', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: '你好呀', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath1, title: '真牛', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'huawei mate 30 pro', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'iphone 14 pro', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath1, title: 'nihao', likesUsers: ['1', '2', '3'] }} />
                </div>

                <div class="column">
                    <Blog blogInfo={{ imgUrl: imgPath4, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath4, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                </div>
                <div class="column">
                    <Blog blogInfo={{ imgUrl: imgPath3, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                    <Blog blogInfo={{ imgUrl: imgPath, title: 'nihaoya', likesUsers: ['1', '2', '3'] }} />
                </div>
            </div>
        </div>
    )
}
