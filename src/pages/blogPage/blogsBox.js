import React, { useEffect, useState } from 'react'
import Blog from './components/blogBrief';
import { message } from 'antd'
import { getrandomblog, searchblog } from '../../api/user.api';
import { useSelector } from 'react-redux';
import BlogPageHeader from './components/header';
import EmptyBlog from './components/empty';
import { useLoaderData } from 'react-router-dom';
export default function BlogsBox() {
    const { currentTheme } = useSelector(state => state.user)
    const [blogs, setBlogs] = useState(useLoaderData())
    const [column1, setColumn1] = useState([])
    const [column2, setColumn2] = useState([])
    const [column3, setColumn3] = useState([])
    const [column4, setColumn4] = useState([])
    const [searchedColumn1, setSearchedColumn1] = useState([])
    const [searchedColumn2, setSearchedColumn2] = useState([])
    const [searchedColumn3, setSearchedColumn3] = useState([])
    const [searchedColumn4, setSearchedColumn4] = useState([])
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
    const arrangeSearch = (blogs) => {
        setSearchedColumn1([])
        setSearchedColumn2([])
        setSearchedColumn3([])
        setSearchedColumn4([])
        if (blogs) {
            let forColumn1 = []
            let forColumn2 = []
            let forColumn3 = []
            let forColumn4 = []
            blogs.map((blog, i) => {
                let index = i % 4
                switch (index) {
                    case 0:
                        forColumn1.push(blog)
                        setSearchedColumn1(forColumn1)
                        break;
                    case 1:
                        forColumn2.push(blog)
                        setSearchedColumn2(forColumn2)
                        break;
                    case 2:
                        forColumn3.push(blog)
                        setSearchedColumn3(forColumn3)
                        break;
                    case 3:
                        forColumn4.push(blog)
                        setSearchedColumn4(forColumn4)
                        break;
                    default:
                        break;
                }
            })
        }
    }
    const arrange = (blogs) => {
        if (blogs) {
            let forColumn1 = []
            let forColumn2 = []
            let forColumn3 = []
            let forColumn4 = []
            blogs.map((blog, i) => {
                let index = i % 4
                switch (index) {
                    case 0:
                        forColumn1.push(blog)
                        setColumn1(forColumn1)
                        break;
                    case 1:
                        forColumn2.push(blog)
                        setColumn2(forColumn2)
                        break;
                    case 2:
                        forColumn3.push(blog)
                        setColumn3(forColumn3)
                        break;
                    case 3:
                        forColumn4.push(blog)
                        setColumn4(forColumn4)
                        break;
                    default:
                        break;
                }
            })
        }
    }
    useEffect(() => {
        arrange(blogs)
    }, [blogs])
    useEffect(() => {
        arrangeSearch(searchedBlogs)
    }, [searchedBlogs])
    const lightHeaderClassname = currentTheme === 'light' ? 'header-light' : ''
    return (
        <>
            <div className={`header ${lightHeaderClassname}`}>
                <BlogPageHeader setSearchText={setSearchText} handleSearchBlog={handleSearchBlog} getData={getData} />
            </div>
            <div className='blog-content'>
                {searchText && (searchedBlogs.length === 0 || blogs.length === 0) && <EmptyBlog />}

                {!searchText ? <div className="row">
                    <div className="column">{column1.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}</div>
                    <div className="column">{column2.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}</div>
                    <div className="column">{column3.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}</div>
                    <div className="column">{column4.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}</div>
                </div> : <div className="row">
                    <div className="column">{searchedColumn1.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}</div>
                    <div className="column">{searchedColumn2.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}</div>
                    <div className="column">{searchedColumn3.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}</div>
                    <div className="column">{searchedColumn4.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}</div>
                </div>}
            </div>
        </>

    )
}
