import React, { useEffect, useState } from 'react'
import BlogBrief from './components/blogBrief';
import { Button, Empty, Modal, Tabs } from 'antd';
import { getmyblog } from '../../api/user.api';
import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LeftOutlined, UploadOutlined } from '@ant-design/icons';
import PostBlog from './components/postBlog';
export default function MyBlog() {
    const { currentTheme } = useSelector(state => state.user)
    const [myBlogs, setMyBlogs] = useState(useLoaderData())
    const [column1, setColumn1] = useState([])
    const [column2, setColumn2] = useState([])
    const [column3, setColumn3] = useState([])
    const [column4, setColumn4] = useState([])
    const getData = async () => {
        await getmyblog().then((myblogs) => {
            setMyBlogs(myblogs)
        })
    }
    useEffect(() => {
        if (myBlogs) {
            let forColumn1 = []
            let forColumn2 = []
            let forColumn3 = []
            let forColumn4 = []
            myBlogs.map((blog, i) => {
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
    }, [myBlogs])
    const myblogHeaderClassname = currentTheme === 'light' ? 'myblog-header-light' : ''
    const [uploadBlogOpen, setUploadBlogOpen] = useState(false)
    const onChange = (key) => { console.log(key) };
    const tabItems = [{ key: 'myblogs', label: 'My Blogs' }, { key: 'favoriteBlogs', label: 'My Favorites Blogs' }]
    return (
        <>
            <div className={`myblog-header ${myblogHeaderClassname}`}>
                <div className='goBackBtn' onClick={() => window.history.back()}><LeftOutlined style={{ fontSize: 16 }} /> Back</div>
                <div className='postBlogBtn' onClick={() => setUploadBlogOpen(true)}><UploadOutlined style={{ marginRight: 10 }} />Post blog</div>
            </div>
            <div className='blog-content-tabs' style={{ padding: '0 10px' }}>
                <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} />
            </div>
            <div className='blog-content'>
                {(column1.length === 0 && column2.length === 0 && column3.length === 0 && column4.length === 0) &&
                    <div className='empty'><Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" imageStyle={{ height: 120 }} description={<span>No blogs right now</span>}><Button type="primary">Create Now</Button></Empty></div>}
                <div className='myblogpageview' style={{ width: '100%', height: 'calc(100% - 112px)' }}>
                    <div className="row">
                        <div className="column">
                            {column1.map((blog) => <BlogBrief getData={getData} key={blog._id} blogInfo={blog} />)}
                        </div>
                        <div className="column">
                            {column2.map((blog) => <BlogBrief getData={getData} key={blog._id} blogInfo={blog} />)}
                        </div>
                        <div className="column">
                            {column3.map((blog) => <BlogBrief getData={getData} key={blog._id} blogInfo={blog} />)}
                        </div>
                        <div className="column">
                            {column4.map((blog) => <BlogBrief getData={getData} key={blog._id} blogInfo={blog} />)}
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={uploadBlogOpen} footer={null} onCancel={() => setUploadBlogOpen(false)}>
                <PostBlog updateData={getData} setUploadBlogOpen={setUploadBlogOpen} />
            </Modal>
        </>
    )
}
