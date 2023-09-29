import React, { useEffect, useState } from 'react'
import './blogBrief.less'
import { Avatar, message, Modal, Skeleton } from 'antd'
import { useSelector } from 'react-redux'
import { UserOutlined, HeartTwoTone, HeartFilled } from '@ant-design/icons';
import { cancellikeblog, getuser, likeblog } from '../../../api/user.api'
import BlogDetail from './blogDetail';
import VideoJS from '../../../components/VideoJS'

export default function BlogBrief({ blogInfo, getData }) {
    const { userID, title, likesUsers, imgUrl, blogType, videoUrl } = blogInfo || {}
    const { currentUser, currentTheme } = useSelector((state) => state.user)
    const { _id } = currentUser
    const [liked, setLiked] = useState(likesUsers.includes(_id))
    const [likedNum, setLikeNum] = useState(likesUsers.length)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const getUserData = async () => {
        await getuser(userID)
            .then(user => {
                setUser(user)
            }).catch(error => {
                message.error('failed to get user data')
            })
    }
    useEffect(() => {
        getUserData();
        setLoading(false)
    }, [])
    const handleLikeBlog = async (blogID) => {
        liked ? await cancellikeblog(blogID).then(() => {
            message.success('cancer like blog successfully')
            setLikeNum(likedNum - 1)
            setLiked(false)
        }).catch((err) => {
            message.error('error happens')
        }) : await likeblog(blogID).then(() => {
            message.success('like blog successfully')
            setLikeNum(likedNum + 1)
            setLiked(true)
        }).catch(() => {
            message.error("error happens")
        })
    }
    const [isBlogOpen, setIsBlogOpen] = useState(false);
    const showModal = () => {
        setIsBlogOpen(true);
    };
    const handleOk = () => {
        setIsBlogOpen(false);
    };
    const handleCloseDetailModal = () => {
        setIsBlogOpen(false);
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
    const playerRef = React.useRef(null);
    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            // videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            // videojs.log('player will dispose');
        });
    };
    const imgRef = React.useRef(null)
    const [imgLoading, setImgLoading] = useState(false)
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
            imgRef?.current && console.log('xiezaile');
        }
    }, [])
    return (
        <>
            <div className={`oneBlog ${lightOneBlogClassname}`} style={{ width: "100%" }}>
                {blogType === 'video' && <div className='blogImg' onClick={showModal}>
                    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                </div>}
                {imgUrl.length !== 0 &&
                    // <Skeleton.Image active loading={false}>
                    <div className='blogImg' onClick={showModal}>
                        <img onLoad={() => { console.log('loaded'); }} ref={imgRef} data-src={imgUrl[0]} style={{ width: "100%" }} />
                    </div>
                    // </Skeleton.Image>
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
            <Modal style={{ top: 60 }} bodyStyle={{ height: '80vh' }} width={imgUrl.length !== 0 || videoUrl ? "80%" : '50%'} maskStyle={{ 'opacity': 0.8, backgroundColor: '#000' }} footer={null} open={isBlogOpen} onOk={handleOk} onCancel={handleCloseDetailModal}>
                <BlogDetail blog={blogInfo} getData={getData} handleCloseDetailModal={handleCloseDetailModal} />
            </Modal >
        </>
    )
}
