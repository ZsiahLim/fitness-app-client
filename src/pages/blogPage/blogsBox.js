import React, { useEffect, useRef, useState } from 'react'
import Blog from './components/blog';
import axios from 'axios';
import { Input, Tooltip, message, Empty } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom';
export default function BlogsBox() {
    const { theme } = useParams()
    const ref = useRef(null)
    const [blogs, setBlogs] = useState([])
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
        await axios.get('http://localhost:3001/api/blogs/random', { withCredentials: true }).then((res) => {
            setBlogs(res.data)
        })
    }
    const handleSearchBlog = async () => {
        console.log('daozhele');
        console.log(searchText);
        if (searchText) {
            await axios.get(`http://localhost:3001/api/blogs/search?params=${searchText}`, { withCredentials: true }).then((res) => {
                setSearchedBlogs(res.data)
                console.log(res.data);
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
        getData()
    }, [])
    useEffect(() => {
        arrange(blogs)
    }, [blogs])
    useEffect(() => {
        console.log(searchedBlogs.length);
        arrangeSearch(searchedBlogs)
    }, [searchedBlogs])
    useEffect(() => {
        console.log(searchedBlogs.length === 0 || blogs.length === 0);
    }, [searchedBlogs, blogs])
    const lightHeaderClassname = theme === 'light' ? 'header-light' : ''
    return (
        <>
            <div className={`header ${lightHeaderClassname}`}>
                <div className='searchBox'>
                    <SearchOutlined /><Input ref={ref} onChange={({ target: { value } }) => setSearchText(value)} size='large' placeholder="Search the blog here~" onPressEnter={(e) => handleSearchBlog(e.target.value)} allowClear bordered={false} />
                </div>
                <div className='refresh' onClick={getData}>
                    <Tooltip title="refresh">
                        <ReloadOutlined />
                    </Tooltip>
                </div>
            </div>
            <div className='blog-content'>
                {searchText && (searchedBlogs.length === 0 || blogs.length === 0) &&
                    <div style={{ marginTop: "100px" }}>
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{ height: 180 }}
                            description={
                                <span>
                                    No blog fits
                                </span>
                            }
                        >
                        </Empty>
                    </div>
                }
                {!searchText ? <div className="row">
                    <div className="column">
                        {column1.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}
                    </div>
                    <div className="column">
                        {column2.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}
                    </div>

                    <div className="column">
                        {column3.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}
                    </div>
                    <div className="column">
                        {column4.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}
                    </div>
                </div> : <div className="row">
                    <div className="column">
                        {searchedColumn1.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}
                    </div>
                    <div className="column">
                        {searchedColumn2.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}
                    </div>

                    <div className="column">
                        {searchedColumn3.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}
                    </div>
                    <div className="column">
                        {searchedColumn4.map((blog) => <Blog key={blog._id} blogInfo={blog} />)}
                    </div>
                </div>}
            </div>
        </>

    )
}
