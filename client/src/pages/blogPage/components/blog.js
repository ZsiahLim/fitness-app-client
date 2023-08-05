import React, { useEffect, useState } from 'react'
import './blog.less'
import { Avatar, message, Modal, Tag, Skeleton, List, Input, Form, Tooltip, Popconfirm, Popover } from 'antd'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { UserOutlined, HeartTwoTone, HeartFilled, StarFilled, StarTwoTone, MessageFilled, LikeFilled, LikeTwoTone, DislikeTwoTone, DislikeFilled, EllipsisOutlined, SettingFilled, WarningFilled, DeleteFilled, ShareAltOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom'
import { FormattedTime } from '../../../utils/formatTime'
import noGender from '../../../Pic/noGender.jpg'

const { TextArea } = Input;

export default function Blog({ blogInfo, getData }) {
    const { theme } = useParams()
    const { userID, title, content, likesUsers, dislikeUsers, favoriteUsers, imgUrl, tags } = blogInfo || {}
    const { currentUser } = useSelector((state) => state.user)
    const { _id, name, personalStatus, age, preferedTheme, preferedLanguage, gender } = currentUser
    const [liked, setLiked] = useState(likesUsers.includes(_id))
    const [favorited, setFavorited] = useState(favoriteUsers.includes(_id))
    const [likedNum, setLikeNum] = useState(likesUsers.length)
    const [favoritedNum, setFavoritedNum] = useState(favoriteUsers.length)
    const [owner, setOwner] = useState(userID === _id)
    const [user, setUser] = useState()
    const [comments, setComments] = useState([])
    const [mycomment, setMycomment] = useState('')
    const getUserData = async () => {
        const res = await axios.get(`http://localhost:3001/api/users/find/${userID}`)
        if (res.status === 200) {
            setUser(res.data)
        } else {
            message.error('failed to get user data')
        }
    }
    useEffect(() => {
        getUserData()
    }, [])
    const getBlogComments = async () => {
        await axios.get(`http://localhost:3001/api/comments/${blogInfo._id}`).then(res => {
            setComments(res.data)
            const comments = res.data
            if (comments.length !== 0) {
                const usersReqs = comments.map(async (comment) => {
                    return await axios.get(`http://localhost:3001/api/users/find/${comment.userID}`)
                })
                getWholeBlogInfo(usersReqs, comments)
            }
        }).catch(err => {
            console.log(err);
            message.error('failed to get user data')
        })
    }
    const getWholeBlogInfo = async (userReq, comments) => {
        console.log("userReq", userReq);
        await Promise.all(userReq).then(res => {
            const usersInfo = res.map(oneData => oneData.data)
            console.log("comments222", comments);
            let newComments = comments.map((comment, i) => {
                return { ...comment, commentUserInfo: usersInfo[i] }
            })
            setComments(newComments)
        })
    }
    useEffect(() => {
        getBlogComments()
    }, [])
    useEffect(() => {
        console.log("comments", comments);
    }, [comments])
    const handleLikeBlog = async (blogID) => {
        if (liked) {
            await axios.put(`http://localhost:3001/api/users/cancerlike/${blogID}`, {}, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    message.success('cancer like blog successfully')
                    setLikeNum(likedNum - 1)
                    setLiked(false)
                }
            })
        } else {
            await axios.put(`http://localhost:3001/api/users/like/${blogID}`, {}, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    message.success('like blog successfully')
                    setLikeNum(likedNum + 1)
                    setLiked(true)
                }
            })
        }
    }
    const handleFavoriteBlog = async (blogID) => {
        if (favorited) {
            await axios.put(`http://localhost:3001/api/users/cancerfavorite/${blogID}`, {}, { withCredentials: true }).then((res) => {
                message.success(res.data)
                setFavoritedNum(favoritedNum - 1)
                setFavorited(false)
            })
        } else {
            await axios.put(`http://localhost:3001/api/users/favorite/${blogID}`, {}, { withCredentials: true }).then((res) => {
                if (res.status === 200) {
                    message.success('favorite blog successfully')
                    setFavoritedNum(favoritedNum + 1)
                    setFavorited(true)
                }
            })
        }
    }
    const handleDeleteBlog = async (blogID) => {
        await axios.delete(`http://localhost:3001/api/blogs/${blogID}`).then((res) => {
            message.success('delete successfully')
            getData()
            handleCancel()
        }).catch((err) => {
            message.error('error happens')
            console.log(err);
        })
    }
    const [isBlogOpen, setIsBlogOpen] = useState(false);
    const showModal = () => {
        setIsBlogOpen(true);
    };
    const handleOk = () => {
        setIsBlogOpen(false);
    };
    const handleCancel = () => {
        setIsBlogOpen(false);
    };
    const handleComment = async () => {
        mycomment && await axios.post('http://localhost:3001/api/comments', { blogID: blogInfo._id, content: mycomment })
            .then(res => {
                if (res.status === 200) {
                    message.success('comment successfully')
                    getBlogComments()
                } else {
                    message.error('error happens')
                }
            })
            .catch(error => {
                message.error(error)
                console.log(error);
            })
    }
    const handleLikeComment = async (commentId) => {
        await axios.put(`http://localhost:3001/api/users/likecomment/${commentId}`, {}, { withCredentials: true })
            .then(res => {
                message.success('like comment successfully')
                getBlogComments()
            })
            .catch(error => {
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
        reportReason ? await axios.post('http://localhost:3001/api/users/report', { type: 'blog', targetID: blogInfo._id, reason: reportReason }, { withCredentials: true }).then((res) => {
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
        (reportCommentReason && reportCommentID) ? await axios.post('http://localhost:3001/api/users/report', { type: 'comment', targetID: reportCommentID, reason: reportCommentReason }, { withCredentials: true }).then((res) => {
            message.success('We received your report, we will inform you the results later')
            setIsCommentReportModalOpen(false)
        }).catch(err => {
            console.log(err);
            message.error('error happens, failed to report')
        }) : message.warning('please write the reason of the report')
    }
    const reportCommmentContent = (
        <div
            style={{ display: 'flex', userSelect: 'none', cursor: 'pointer', justifyContent: "center", alignItems: 'center', width: 60, height: 36, borderRadius: 10, backgroundColor: theme === 'light' ? "#f0f0f0" : '#383838' }}
            onClick={() => setIsCommentReportModalOpen(true)}
        >
            Report
        </div>)
    const lightOneBlogClassname = theme === 'light' ? 'oneBlog-light' : ''
    const lightBlogModalClassname = theme === 'light' ? 'BlogModal-light' : ''
    const withoutImgBlogMainPart = imgUrl.length === 0 ? 'blogMainPart-without' : ''
    return (
        <>
            <div className={`oneBlog ${lightOneBlogClassname}`} style={{ width: "100%" }}>
                {imgUrl.length !== 0 && <div className='blogImg' onClick={showModal}>
                    <img src={imgUrl[0]} style={{ width: "100%" }} />
                </div>}
                <div className={`blogMainPart`}>
                    <div className='blogTitle' onClick={showModal}>{title}</div>
                    <div className='blogOperation'>
                        <div className='UserInfo'>
                            <Avatar size={30} icon={<UserOutlined />} src={user?.avator ? user.avator : ''} />
                            &nbsp;{user?.name}
                        </div>
                        <div className='operation'>
                            <div className='likeStatusBtn' onClick={() => handleLikeBlog(blogInfo._id)}>
                                {liked ? <HeartTwoTone /> : <HeartFilled />} {likedNum}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal bodyStyle={{ height: '80vh' }} width={imgUrl.length !== 0 ? "80%" : '50%'} maskStyle={{ 'opacity': 0.9, backgroundColor: '#000' }} footer={null} open={isBlogOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className={`BlogModal ${lightBlogModalClassname}`} >
                    {imgUrl.length !== 0 && <div className='blogImg'>
                        <img src={imgUrl} style={{ width: "100%", maxWidth: "100%", maxHeight: '100%' }} />
                    </div>}
                    <div className={`blogMainPart ${withoutImgBlogMainPart}`} >
                        <div className='blogInfo'>
                            <div className='blogTitle'><div className='border'></div><h1>{title}</h1></div>
                            <div className='blogDescri'>{content}</div>
                            <div className='tags'>
                                {tags.map((tag) => <Tag bordered={false} color="processing">
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
                                <Input onChange={(e) => setMycomment(e.target.value)} onPressEnter={handleComment} maxLength={50} placeholder="Give your kindly comment here ~" bordered={false} />
                            </div>
                        </div>
                    </div>
                </div >
            </Modal >
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
        </>
    )
}
