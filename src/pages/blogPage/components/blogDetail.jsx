import React, { useEffect, useState } from 'react'
import { Avatar, message, Modal, Tag, Skeleton, List, Input, Form, Tooltip, Popconfirm, Popover } from 'antd'
import { useSelector } from 'react-redux'
import { UserOutlined, HeartTwoTone, HeartFilled, StarFilled, StarTwoTone, MessageFilled, LikeFilled, EllipsisOutlined, WarningFilled, DeleteFilled, ShareAltOutlined, EditFilled } from '@ant-design/icons';
import { FormattedTime } from '../../../utils/formatTime'
import noGender from '../../../Pic/noGender.jpg'
import MyCarousel from './myCarousel'
import { addcomment, cancelfavoriteblog, cancellikeblog, createreport, deleteblog, favoriteblog, getblogcomments, getuser, likeblog, likecomment } from '../../../api/user.api'
import EditBlog from './editBlog';
import VideoJS from '../../../components/VideoJS';
import videojs from 'video.js';
const { TextArea } = Input;

export default function BlogDetail({ blog, getData, handleCloseDetailModal }) {
    const [blogInfo, setBlogInfo] = useState(blog)
    const { userID, title, content, likesUsers, favoriteUsers, imgUrl, tags, blogType, videoUrl } = blogInfo || {}
    const { currentUser, currentTheme } = useSelector((state) => state.user)
    const { _id } = currentUser
    const [liked, setLiked] = useState(likesUsers.includes(_id))
    const [favorited, setFavorited] = useState(favoriteUsers.includes(_id))
    const [likedNum, setLikeNum] = useState(likesUsers.length)
    const [favoritedNum, setFavoritedNum] = useState(favoriteUsers.length)
    const [owner, setOwner] = useState(userID === _id)
    const [user, setUser] = useState()
    const [comments, setComments] = useState([])
    const [mycomment, setMycomment] = useState('')
    const getUserData = async () => {
        await getuser(userID)
            .then(user => {
                setUser(user)
            }).catch(error => {
                message.error('failed to get user data')
            })
    }
    const getBlogComments = async () => {
        await getblogcomments(blogInfo._id).then(comments => {
            setComments(comments)
            if (comments.length !== 0) {
                const usersReqs = comments.map(async (comment) => {
                    return await getuser(comment.userID)
                })
                getWholeBlogInfo(usersReqs, comments)
            }
        }).catch(err => {
            console.log(err);
            message.error('failed to get user data')
        })
    }
    const getWholeBlogInfo = async (userReq, comments) => {
        await Promise.all(userReq).then(usersInfo => {
            setComments(comments.map((comment, i) => { return { ...comment, commentUserInfo: usersInfo[i] } }))
        })
    }
    useEffect(() => {
        getUserData();
        getBlogComments()
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
    const handleFavoriteBlog = async (blogID) => {
        favorited ? await cancelfavoriteblog(blogID)
            .then((res) => {
                message.success(res)
                setFavoritedNum(favoritedNum - 1)
                setFavorited(false)
            }).catch(() => {
                message.error("error happens")
            }) : await favoriteblog(blogID)
                .then(() => {
                    message.success('favorite blog successfully')
                    setFavoritedNum(favoritedNum + 1)
                    setFavorited(true)
                }).catch(() => {
                    message.error("error happens")
                })
    }
    const handleDeleteBlog = async (blogID) => {
        await deleteblog(blogID)
            .then(() => {
                message.success('delete successfully')
                getData()
                handleCloseDetailModal()
            }).catch((err) => {
                message.error('error happens')
                console.log(err);
            })
    }
    const handleComment = async () => {
        mycomment && await addcomment({ blogID: blogInfo._id, content: mycomment })
            .then(() => {
                message.success('comment successfully')
                getBlogComments()
                setMycomment('')
            }).catch(error => {
                message.error(error)
                console.log(error);
            })
    }
    const handleLikeComment = async (commentId) => {
        await likecomment(commentId)
            .then(() => {
                message.success('like comment successfully')
                getBlogComments()
            }).catch(error => {
                message.error(error)
                console.log(error);
            })
    }
    const [reportReason, setReportReason] = useState();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    const handleSubmitReportCancel = () => {
        setIsReportModalOpen(false)
    }
    const handleSubmitReport = async () => {
        reportReason ? await createreport({ type: 'blog', targetID: blogInfo._id, content: reportReason })
            .then(() => {
                message.success('We received your report, we will inform you the results later')
                setIsReportModalOpen(false)
            }).catch(err => {
                console.log(err);
                message.error('error happens, failed to report')
            }) : message.warning('please write the reason of the report')
    }
    const [reportCommentReason, setReportCommentReason] = useState();
    const [isCommentReportModalOpen, setIsCommentReportModalOpen] = useState(false)
    const [reportCommentID, setReportCommentID] = useState()
    const handleSubmitCommentReportCancel = () => {
        setIsCommentReportModalOpen(false)
    }
    const handleSubmitCommentReport = async () => {
        (reportCommentReason && reportCommentID) ? await createreport({ type: 'comment', targetID: reportCommentID, content: reportCommentReason })
            .then(() => {
                message.success('We received your report, we will inform you the results later')
                setIsCommentReportModalOpen(false)
            }).catch(err => {
                console.log(err);
                message.error('error happens, failed to report')
            }) : message.warning('please write the reason of the report')
    }
    const reportCommmentContent = (<div style={{ display: 'flex', userSelect: 'none', cursor: 'pointer', justifyContent: "center", alignItems: 'center', width: 60, height: 36, borderRadius: 10, backgroundColor: currentTheme === 'light' ? "#f0f0f0" : '#383838' }} onClick={() => setIsCommentReportModalOpen(true)}>Report</div>)
    const lightBlogModalClassname = currentTheme === 'light' ? 'BlogModal-light' : ''
    const withoutImgBlogMainPart = imgUrl.length === 0 && !videoUrl ? 'blogMainPart-without' : ''
    const [EditModalOpen, setEditModalOpen] = useState(false)
    const videoJsOptions = {
        autoplay: false,
        fill: true,
        controls: true,
        responsive: true,
        fluid: false,
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
            videojs.log('player is waiting zheli');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose zheli');
        });

        player.on('pause', () => {
            videojs.log('player will pause zheli');
        });
    };
    useEffect(() => {
        console.log('init');
        return () => {
            console.log('destory');
        }
    })
    return (
        <div className={`BlogModal ${lightBlogModalClassname}`} >
            {blogType === "video" && <div className='blogImg'><div style={{ width: "100%", height: "100%" }}><VideoJS options={videoJsOptions} onReady={handlePlayerReady} /></div></div>}
            {imgUrl.length !== 0 && <div className='blogImg'><MyCarousel imgArr={imgUrl} /></div>}
            <div className={`blogMainPart ${withoutImgBlogMainPart}`} >
                <div className='blogInfo'>
                    <div className='blogTitle'><div className='border'></div><h1>{title}</h1></div>
                    <div className='blogDescri'>{content}</div>
                    <div className='tags'>
                        {tags.map((tag, index) => <Tag key={index} bordered={false} color="processing">
                            <span>#{tag}</span>
                        </Tag>)}
                    </div>
                    <div className='time'>
                        {FormattedTime(new Date(blogInfo.createdAt))}
                    </div>
                    <div className='blogOperation'>
                        <div className='UserInfo'>
                            <Avatar size={30} icon={<UserOutlined />} src={user?.avator ? user.avator : ''} />
                            &nbsp;{user?.name}
                        </div>
                        <div className='operation'>
                            <div className='Btn' onClick={() => handleLikeBlog(blogInfo._id)}>
                                {liked ? <HeartTwoTone /> : <HeartFilled />} {likedNum}
                            </div>
                            <div className='Btn' onClick={() => handleFavoriteBlog(blogInfo._id)}>
                                {favorited ? <StarTwoTone /> : <StarFilled />} {favoritedNum}
                            </div>
                            <div className='Btn'>
                                <MessageFilled /> {comments.length}
                            </div>
                            <div className='Btn'>
                                <EditFilled onClick={() => setEditModalOpen(true)} />
                            </div>
                            <div className='Btn'>
                                {owner ? <Popconfirm
                                    title="Delete the blog"
                                    description="Are you sure to delete this blog?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => handleDeleteBlog(blogInfo._id)}
                                >
                                    <DeleteFilled />
                                </Popconfirm>
                                    : <Tooltip placement="top" title={'report'}><WarningFilled onClick={() => setIsReportModalOpen(true)} /></Tooltip>}
                            </div>
                            <div className='Btn'>
                                <Tooltip placement="top" title={'share'}>
                                    <ShareAltOutlined />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='blogComments'>
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        size='small'
                        dataSource={comments}
                        renderItem={(item) => (
                            <List.Item
                                actions={[<div className='btn' onClick={() => handleLikeComment(item._id)}><LikeFilled />&nbsp;{item.likedUsers.length}</div>, <div className='btn'><Popover content={reportCommmentContent} trigger="click"><EllipsisOutlined onClick={() => { setReportCommentID(item._id) }} /></Popover></div>]}
                            >
                                <Skeleton avatar loading={false} active>
                                    <List.Item.Meta
                                        avatar={<Avatar size={49} src={item.commentUserInfo ? item.commentUserInfo.avator : noGender} />}
                                        title={<a href="https://ant.design">{item.commentUserInfo ? item.commentUserInfo.name : ''}</a>}
                                        description={item.content}
                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </div>
                <div className='myComment'>
                    <Avatar size={52} icon={<UserOutlined />} src={currentUser?.avator ? currentUser.avator : ''} />
                    <div className='commentInput'>
                        <Input value={mycomment} onChange={(e) => setMycomment(e.target.value)} onPressEnter={handleComment} maxLength={50} placeholder="Give your kindly comment here ~" bordered={false} />
                    </div>
                </div>
            </div>
            <Modal title="Report" open={isReportModalOpen} onOk={handleSubmitReport} onCancel={handleSubmitReportCancel}>
                <Form
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item label="Report Reason">
                        <TextArea onChange={({ target: { value } }) => { console.log(value); setReportReason(value) }} rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Report" open={isCommentReportModalOpen} onOk={handleSubmitCommentReport} onCancel={handleSubmitCommentReportCancel}>
                <Form
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item label="Report Reason">
                        <TextArea onChange={({ target: { value } }) => { setReportCommentReason(value) }} rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal zIndex={1001} open={EditModalOpen} footer={null} onCancel={() => setEditModalOpen(false)}>
                <EditBlog selectedBlog={blogInfo} setModalOpen={setEditModalOpen} />
            </Modal>
        </div >
    )
}
