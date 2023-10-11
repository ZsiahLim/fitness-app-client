import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { getrandomblog, searchblog } from '../../api/user.api';
import { useSelector } from 'react-redux';
import BlogPageHeader from './components/header';
import EmptyBlog from './components/empty';
import { useLoaderData } from 'react-router-dom';
import WaterfallContainer from '../../components/waterfallContainer/BlogsWrapper';
export default function BlogsBox() {
    const { currentTheme } = useSelector(state => state.user)
    const [blogs, setBlogs] = useState(useLoaderData())
    const [searchText, setSearchText] = useState()
    const [searchedBlogs, setSearchedBlogs] = useState([])
    const getData = async () => {
        await getrandomblog().then((blogs) => {
            setBlogs(blogs)
        })
    }
    const handleSearchBlog = async () => {
        if (searchText) {
            const query = { params: searchText }
            await searchblog(query).then((blogs) => {
                setSearchedBlogs(blogs)
            }).catch(err => {
                console.log(err);
                message.error('error happens, can not get the blogs')
            })
        } else {
            setSearchedBlogs([])
        }
    }
    const lightHeaderClassname = currentTheme === 'light' ? 'header-light' : ''
    return (
        <>
            <div className={`header ${lightHeaderClassname}`}>
                <BlogPageHeader setSearchText={setSearchText} handleSearchBlog={handleSearchBlog} getData={getData} />
            </div>
            <div className='blog-content'>
                {searchText && (searchedBlogs.length === 0 || blogs.length === 0) && <EmptyBlog />}
                <WaterfallContainer blogs={!searchText ? blogs : searchedBlogs} />
            </div>
        </>

    )
}
