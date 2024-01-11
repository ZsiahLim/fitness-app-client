import React, { useEffect, useRef, useState } from 'react'
import './blogBrief.less'
import { Avatar, message, Skeleton } from 'antd'
import { useSelector } from 'react-redux'
import { UserOutlined, HeartTwoTone, HeartFilled, PlayCircleFilled } from '@ant-design/icons';
import { cancellikeblog, getuser, likeblog } from '../../../api/user.api'
import BlogDetailModal from './blogDetailModal';
import VideoJS from '../../../components/VideoJS'
import { useIntl } from 'react-intl';

export default function BlogBrief({ blogInfo, getData, waterfallItemsWidth, calcWaterfall }) {
    const intl = useIntl()
    const { userID, title, likesUsers, imgUrl, blogType, videoUrl, width, height } = blogInfo || {}
    const { currentUser, currentTheme } = useSelector((state) => state.user)
    const blogRef = useRef(null)
    const { _id } = currentUser
    const [liked, setLiked] = useState(likesUsers.includes(_id))
    const [likedNum, setLikeNum] = useState(likesUsers.length)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // 创建一个防抖函数
    const debounce = (func, delay) => {
        let timeoutId;
        return function () {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(func, delay);
        };
    };

    // 窗口调整大小时的处理方法
    const handleResize = () => {
        setWindowWidth(window.innerWidth); // 更新窗口宽度
        const width = window.innerWidth
        let coloumnNum = Math.floor(width / 300)
        coloumnNum = width < 600 ? 2 : coloumnNum
        calcWaterfall(coloumnNum, 2)
    };

    useEffect(() => {
        // 添加窗口resize事件监听器，并在事件触发时调用防抖函数
        const debouncedResizeHandler = debounce(handleResize, 200); // 200毫秒的防抖延迟
        window.addEventListener('resize', debouncedResizeHandler);
        return () => {
            // 在组件卸载时，移除窗口resize事件监听器
            window.removeEventListener('resize', debouncedResizeHandler);
        };
    }, []);
    useEffect(() => {
        console.log("blogRef.current?.offsetHeight", blogRef.current?.offsetHeight);
        handleResize()
    }, [blogRef.current?.offsetHeight])
    const getUserData = async () => {
        await getuser(userID)
            .then(user => {
                setUser(user)
            }).catch(error => {
                message.error(intl.formatMessage({ id: 'error.blog.failToGetUserData' }))
            })
    }
    useEffect(() => {
        getUserData();
        setLoading(false)
    }, [])
    const handleLikeBlog = async (blogID) => {
        liked ? await cancellikeblog(blogID).then(() => {
            message.success(intl.formatMessage({ id: 'app.blog.msg.cancelLike' }))
            setLikeNum(likedNum - 1)
            setLiked(false)
        }).catch((err) => {
            message.error('error happens')
        }) : await likeblog(blogID).then(() => {
            message.success(intl.formatMessage({ id: 'app.blog.msg.likeBlog' }))
            setLikeNum(likedNum + 1)
            setLiked(true)
        }).catch(() => {
            message.error(intl.formatMessage({ id: 'error.errorHappens' }))
        })
    }
    const [isBlogOpen, setIsBlogOpen] = useState(false);
    const showModal = () => {
        setIsBlogOpen(true);
    };

    const lightOneBlogClassname = currentTheme === 'light' ? 'oneBlog-light' : ''
    const videoJsOptions = {
        autoplay: false,
        controls: false,
        responsive: true,
        fluid: true,
        sources: [{
            src: videoUrl,
            type: 'video/mp4'
        }]
    };
    const imgRef = React.useRef(null)
    useEffect(() => {
        const callback = entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target
                    image.setAttribute('src', imgUrl[0])
                    observer.unobserve(image)
                    console.log('chufale');
                }
            })
        }
        const observer = new IntersectionObserver(callback)
        imgRef?.current && observer.observe(imgRef.current)
        return () => {
            imgRef?.current && observer.unobserve(imgRef.current)
        }
    }, [])

    return (
        <>
            <div ref={blogRef} className={`oneBlog ${lightOneBlogClassname}`} >
                {blogType === 'video' && <div className='blogImg' style={{ width: waterfallItemsWidth - 12, height: (height * (waterfallItemsWidth - 12) / width) }} onClick={showModal}>
                    <VideoJS options={videoJsOptions} />
                    <div className='playBtn'><PlayCircleFilled /></div>
                </div>}
                {imgUrl.length !== 0 &&
                    <div className='blogImg' style={{ width: waterfallItemsWidth - 12, height: (height * (waterfallItemsWidth - 12) / width) }} onClick={showModal}>
                        <img onLoad={() => { console.log("new width", waterfallItemsWidth); }} ref={imgRef} data-src={imgUrl[0]} style={{ width: "100%" }} />
                    </div>
                }
                <Skeleton active loading={!user?.avator} >
                    <div className={`blogMainPart`}>
                        <div className='blogTitle' onClick={showModal}>{title}</div>
                        <div className='blogOperation'>
                            <div className='UserInfo'>
                                {user?.avator ? <Avatar size={30} icon={<UserOutlined />} src={user.avator} /> : <Avatar size={30} icon={<UserOutlined />} />}
                                &nbsp;{user?.name}
                            </div>
                            <div className='operation'>
                                <div className='likeStatusBtn' onClick={() => handleLikeBlog(blogInfo._id)}>
                                    {liked ? <HeartTwoTone /> : <HeartFilled />} {likedNum}
                                </div>
                            </div>
                        </div>
                    </div>
                </Skeleton>
            </div >
            <BlogDetailModal blog={blogInfo} getData={getData} imgUrl={imgUrl} videoUrl={videoUrl} isBlogOpen={isBlogOpen} setIsBlogOpen={setIsBlogOpen} />
        </>
    )
}
