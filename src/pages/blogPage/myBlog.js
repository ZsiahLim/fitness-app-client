import React, { useEffect, useState } from 'react'
import { Button, Empty, Modal, Tabs } from 'antd';
import { getmyblog, getmyfavorblogs } from '../../api/user.api';
import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LeftOutlined, UploadOutlined } from '@ant-design/icons';
import PostBlog from './components/postBlog';
import WaterfallContainer from '../../components/waterfallContainer/BlogsWrapper';
export default function MyBlog() {
    const { currentTheme } = useSelector(state => state.user)
    const [myBlogs, setMyBlogs] = useState(useLoaderData())
    const [pageTab, setPageTab] = useState('myblogs')
    const getData = async () => {
        await getmyblog().then((myblogs) => {
            setMyBlogs(myblogs)
        })
    }
    const [favorBlogs, setFavorBlogs] = useState()
    useEffect(() => {
        const getFavorBlogs = async () => {
            await getmyfavorblogs().then(favors => {
                setFavorBlogs(favors)
            })
        }
        getFavorBlogs()
    }, [])

    const myblogHeaderClassname = currentTheme === 'light' ? 'myblog-header-light' : ''
    const [uploadBlogOpen, setUploadBlogOpen] = useState(false)
    const tabItems = [{ key: 'myblogs', label: 'My Blogs' }, { key: 'favoriteBlogs', label: 'My Favorites Blogs', disabled: favorBlogs ? false : true }]
    return (
        <>
            <div className={`myblog-header ${myblogHeaderClassname}`}>
                <div className='goBackBtn' onClick={() => window.history.back()}><LeftOutlined style={{ fontSize: 16 }} /> Back</div>
                <div className='postBlogBtn' onClick={() => setUploadBlogOpen(true)}><UploadOutlined style={{ marginRight: 10 }} />Post blog</div>
            </div>
            <div className='blog-content-tabs' style={{ padding: '0 10px' }}>
                <Tabs defaultActiveKey="1" items={tabItems} onChange={(tab) => { setPageTab(tab) }} />
            </div>
            <div className='blog-content'>
                {(myBlogs.length === 0) &&
                    <div className='empty'><Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" imageStyle={{ height: 120 }} description={<span>No blogs right now</span>}><Button type="primary" onClick={() => setUploadBlogOpen(true)}>Post your first blog</Button></Empty></div>}
                <div className='myblogpageview' style={{ width: '100%', height: 'calc(100% - 112px)' }}>
                    {pageTab === 'myblogs' && <WaterfallContainer blogs={myBlogs} />}
                    {pageTab === 'favoriteBlogs' && <WaterfallContainer blogs={favorBlogs} />}
                </div>
            </div >
            <Modal open={uploadBlogOpen} footer={null} onCancel={() => setUploadBlogOpen(false)}>
                <PostBlog updateData={getData} setUploadBlogOpen={setUploadBlogOpen} />
            </Modal>
        </>
    )
}
