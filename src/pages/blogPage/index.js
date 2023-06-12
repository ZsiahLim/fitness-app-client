import React, { useState } from 'react'
import './index.less'
import {
    HomeTwoTone,
    MessageTwoTone,
    BookTwoTone
} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import BlogsBox from './blogsBox';
import PostBlog from './postBlog';
import MyBlog from './myBlog';

export default function BlogPage() {
    let { theme } = useParams()
    const [currentTheme, setTheme] = useState(theme)
    const lightBlogPageClassname = currentTheme === 'light' ? 'blogPage-light' : ''
    const lightnavigation = currentTheme === 'light' ? 'navigation-light' : ''
    const [selectedBar, setSelectedBar] = useState('find')
    return (
        <div className={`blogPage ${lightBlogPageClassname}`}>
            <div className='blogPage-navigation-bar'>
                <div
                    className={`navigation ${lightnavigation}`}
                    onClick={() => setSelectedBar('find')}
                    style={selectedBar === 'find' ? { backgroundColor: currentTheme === 'dark' ? '#383838' : "#f0f0f0" } : {}}
                >
                    <HomeTwoTone
                        className='navigationItem'
                        twoToneColor={selectedBar === 'find' ? '#4e8df5' : "#3d3d3d"}
                        style={{ fontSize: 18 }}
                    />
                    <span
                        className='navigationName navigationItem'
                        style={{ fontWeight: 500 }}>
                        Find
                    </span>
                </div>
                <div
                    className={`navigation ${lightnavigation}`}
                    onClick={() => setSelectedBar('post')}
                    style={selectedBar === 'post' ? { backgroundColor: currentTheme === 'dark' ? '#383838' : "#f0f0f0" } : {}}
                >
                    <MessageTwoTone
                        className='navigationItem'
                        twoToneColor={selectedBar === 'post' ? '#4e8df5' : "#3d3d3d"}
                        style={{ fontSize: 18 }}
                    />
                    <span
                        className='navigationName navigationItem'
                        style={{ fontWeight: 500 }}
                    >
                        Post Blog
                    </span>
                </div>
                <div
                    className={`navigation ${lightnavigation}`}
                    onClick={() => setSelectedBar('myBlog')}
                    style={selectedBar === 'myBlog' ? { backgroundColor: currentTheme === 'dark' ? '#383838' : "#f0f0f0" } : {}}
                >
                    <BookTwoTone
                        className='navigationItem'
                        twoToneColor={selectedBar === 'myBlog' ? '#4e8df5' : "#3d3d3d"}
                        style={{ fontSize: 18 }}
                    />
                    <span
                        className='navigationName navigationItem'
                        style={{ fontWeight: 500 }}>
                        My blog
                    </span>
                </div>
            </div>
            <div className='blog-box'>
                {selectedBar === 'find' && <BlogsBox />}
                {selectedBar === 'post' && <PostBlog />}
                {selectedBar === 'myBlog' && <MyBlog />}
            </div>
        </div >
    )
}
