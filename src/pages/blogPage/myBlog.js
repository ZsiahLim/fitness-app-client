import React, { useEffect, useState } from 'react'
import { Button, Empty, Modal, Tabs, message } from 'antd';
import { getmyblog, getmyfavorblogs, getspecificblog } from '../../api/user.api';
import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LeftOutlined, UploadOutlined } from '@ant-design/icons';
import PostBlog from './components/postBlog';
import WaterfallContainer from '../../components/waterfallContainer/BlogsWrapper';
import useCheckUserStatus from '../../hooks/useCheckUserStatus';
import { formatTimeToChinese } from '../../utils/formatTime';
export default function MyBlog() {
    const { currentTheme, currentUser } = useSelector(state => state.user)
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
                if (favors.status !== false) {
                    setFavorBlogs(favors)
                } else {
                    message.error('出现异常请重试')
                }
            })
        }
        getFavorBlogs()
    }, [])

    const [likeBlogs, setLikeBlogs] = useState([])
    useEffect(() => {
        if (currentUser?.likeBlogs && currentUser?.likeBlogs.length !== 0) {
            getLikedBlogs(currentUser.likeBlogs)
        }
    }, [currentUser])

    const getLikedBlogs = async (likedBlogsID) => {
        const likedBlogs = likedBlogsID.map(async (blogID) => { return await getspecificblog(blogID) })
        await Promise.all(likedBlogs).then((responses) => {
            const likedBlogs = responses.filter(blog => blog.status !== false)
            setLikeBlogs(likedBlogs)
        })
    }

    const { isMuted, muteDate } = useCheckUserStatus()

    const myblogHeaderClassname = currentTheme === 'light' ? 'myblog-header-light' : ''
    const [uploadBlogOpen, setUploadBlogOpen] = useState(false)
    const tabItems = [{ key: 'myblogs', label: 'My Blogs' }, { key: 'likedBlogs', label: 'Liked Blogs' }, { key: 'favoriteBlogs', label: 'My Favorites Blogs', disabled: favorBlogs ? false : true }]
    return (
        <>
            <div className={`myblog-header ${myblogHeaderClassname}`}>
                <div className='goBackBtn' onClick={() => window.history.back()}><LeftOutlined style={{ fontSize: 16 }} /> Back</div>
                <Button type={isMuted ? 'default' : 'primary'} onClick={() => {
                    if (!isMuted) {
                        setUploadBlogOpen(true)
                    } else {
                        message.error("您因违反社区规定已被禁言, 禁言期间无法发博客, 禁言终止日期:" + muteDate, 5)
                    }
                }}><UploadOutlined style={{ marginRight: 10 }} />Post blog</Button>
            </div>
            <div className='blog-content-tabs' style={{ padding: '0 10px' }}>
                <Tabs defaultActiveKey="1" items={tabItems} onChange={(tab) => { setPageTab(tab) }} />
            </div>
            <div className='blog-content'>
                {(myBlogs.length === 0) &&
                    <div className='empty'><Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" imageStyle={{ height: 120 }} description={<span>No blogs right now</span>}><Button type="primary" onClick={() => setUploadBlogOpen(true)}>Post your first blog</Button></Empty></div>}
                <div className='myblogpageview' style={{ width: '100%', height: 'calc(100% - 112px)' }}>
                    {pageTab === 'myblogs' && <WaterfallContainer blogs={myBlogs} />}
                    {pageTab === 'likedBlogs' && <WaterfallContainer blogs={likeBlogs} />}
                    {pageTab === 'favoriteBlogs' && <WaterfallContainer blogs={favorBlogs} />}
                </div>
            </div >
            <Modal open={uploadBlogOpen} footer={null} onCancel={() => setUploadBlogOpen(false)}>
                <PostBlog updateData={getData} setUploadBlogOpen={setUploadBlogOpen} />
            </Modal>
        </>
    )
}
