import React, { useEffect, useState } from 'react'
import { Button, Empty, Modal, Tabs, message } from 'antd';
import { getmyblog, getmyfavorblogs, getspecificblog } from '../../api/user.api';
import { useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LeftOutlined, UploadOutlined } from '@ant-design/icons';
import PostBlog from './components/postBlog';
import WaterfallContainer from '../../components/waterfallContainer/BlogsWrapper';
import useCheckUserStatus from '../../hooks/useCheckUserStatus';
import { useIntl } from 'react-intl';
export default function MyBlog() {
    const intl = useIntl()
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
                    message.error(intl.formatMessage({ id: 'error.errorMsg' }))
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
    const tabItems = [{ key: 'myblogs', label: intl.formatMessage({ id: 'app.blog.title.myBlogs' }) }, { key: 'likedBlogs', label: intl.formatMessage({ id: 'app.blog.title.likedBlogs' }) }, { key: 'favoriteBlogs', label: intl.formatMessage({ id: 'app.blog.title.favouriteBlogs' }), disabled: favorBlogs ? false : true }]
    return (
        <>
            <div className={`myblog-header ${myblogHeaderClassname}`}>
                <div className='goBackBtn' onClick={() => window.history.back()}><LeftOutlined style={{ fontSize: 16 }} /> {intl.formatMessage({ id: 'btn.back' })}</div>
                <Button type={isMuted ? 'default' : 'primary'} onClick={() => {
                    if (!isMuted) {
                        setUploadBlogOpen(true)
                    } else {
                        message.error(intl.formatMessage({ id: 'app.blog.msg.accStatus' }) + muteDate, 5)
                    }
                }}><UploadOutlined style={{ marginRight: 10 }} />{intl.formatMessage({ id: 'btn.postBlog' })}</Button>
            </div>
            <div className='blog-content-tabs' style={{ padding: '0 10px' }}>
                <Tabs defaultActiveKey="1" items={tabItems} onChange={(tab) => { setPageTab(tab) }} />
            </div>
            <div className='blog-content'>
                {(myBlogs.length === 0) &&
                    <div className='empty'><Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" imageStyle={{ height: 120 }} description={<span>{intl.formatMessage({ id: 'app.blog.msg.noPostedBlog' })}</span>}><Button type="primary" onClick={() => setUploadBlogOpen(true)}>{intl.formatMessage({ id: 'app.blog.msg.postFirstBlog' })}</Button></Empty></div>}
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
