import { EllipsisOutlined, LeftOutlined, MessageFilled, MessageOutlined, UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { addcontactbyid, createconversation, createreport, getuser, removecontact } from '../../../../api/user.api'
import { Avatar, Dropdown, Form, Modal, Tabs, message } from 'antd'
import './contactDetail.less'
import { useDispatch, useSelector } from 'react-redux'
import TextArea from 'antd/es/input/TextArea'
import { loginStart, loginSuccess } from '../../../../redux/userSlice'
import SIZE from '../../../../constants/SIZE'
import useUserTheme from '../../../../hooks/useUserTheme'
import APPTHEME from '../../../../constants/COLORS/APPTHEME'
import COLORS from '../../../../constants/COLORS'
import { formatTimeToChinese } from '../../../../utils/formatTime'
import WaterfallContainer from '../../../../components/waterfallContainer/BlogsWrapper'
import UserRecordSum from '../../../../components/UserRecordSum'
import UserBestRecord from '../../../../components/UserBestRecord'

export default function ContactDetail() {
    const { userID: ContactID } = useParams()
    const navigateTo = useNavigate()
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const dispatch = useDispatch()
    const { currentTheme, currentUser } = useSelector(state => state.user)
    const [contact, setContact] = useState()

    const [records, setRecords] = useState([])
    const [alreadySubscribed, setAlreadySubscribed] = useState(currentUser.contactsUsers.includes(ContactID))

    const getData = async () => {
        await getuser(ContactID).then(res => {
            if (res.status !== false) {
                setContact(res)
                setRecords(res.records)
            } else {
                message.error("出现异常请稍后重试")
            }
        })
    }

    useEffect(() => {
        getData()
    }, [ContactID])

    useEffect(() => {
        setAlreadySubscribed(currentUser.contactsUsers.includes(ContactID))
    }, [currentUser])

    const confirmDelete = async () => {
        navigateTo('/chat/contacts')
        dispatch(loginStart())
        await removecontact(ContactID).then(res => {
            if (res.status !== false) {
                console.log("currentUser contact", res.contactsUsers);
                message.success('this contact has been already deleted')
                dispatch(loginSuccess(res))
            } else {
                message.error('出现异常请稍后重试')
            }
        })
    };
    const items = [
        {
            key: '3',
            label: (<div onClick={() => setIsReportModalOpen(true)}>Report</div>),
        },
    ];

    const [reportReason, setReportReason] = useState();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    const handleSubmitReportCancel = () => {
        setIsReportModalOpen(false)
    }
    const handleSubmitReport = async () => {
        reportReason ? await createreport({ type: 'user', targetID: contact._id, content: reportReason }).then(() => {
            message.success('We received your report, we will inform you the results later')
            setIsReportModalOpen(false)
        }).catch(err => {
            console.log(err);
            message.error('error happens, failed to report')
        }) : message.warning('please write the reason of the report')
    }

    const lightContactDetailClassName = currentTheme === 'light' ? 'chat-contentBox-rightBar-contactDetail-light' : ''
    const doConversation = async () => {
        try {
            await createconversation({ receiverId: ContactID }).then((res) => {
                if (res.status !== false) {
                    const conversation = res.conversation
                    navigateTo(`/chat/conversations/specific/${conversation._id}`)
                } else {
                    message.error('failed to create conversation')
                }
            })
        } catch (error) {
            message.error('failed to create conversation')
        }
    }

    const handleSendMessage = async () => {
        await createconversation({ receiverId: ContactID }).then(res => {
            if (res.status !== false) {
                const conversation = res.conversation
                navigateTo(`/chat/conversations/specific/${conversation._id}`)
            } else {
                message.error('出现异常请重试')
            }
        }).catch(err => {
            message.error('出现异常请重试')
        })
    }
    const handleSubscribe = async () => {
        await addcontactbyid(ContactID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res))
            } else {
                message.error('出现异常请重试')
            }
        }).catch(err => {
            message.error('出现异常请重试')
        })
    }
    const handleUnSubscribe = async () => {
        await removecontact(ContactID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res))
            } else {
                message.error('出现异常请稍后重试')
            }
        })
    }

    return (
        <>
            <div className="chat-contentBox-rightBar-header">
                <LeftOutlined style={{ fontSize: 24 }} onClick={() => navigateTo(-1)} />
                <Dropdown menu={{ items }}>
                    <EllipsisOutlined style={{ fontSize: 24, cursor: "pointer" }} />
                </Dropdown>
            </div>
            <div className={`chat-contentBox-rightBar-contactDetail ${lightContactDetailClassName}`}>
                <div className='chat-contentBox-rightBar-contactDetail-contactCard'>
                    <div className="chat-contentBox-rightBar-contactDetail-contactCard-avator">
                        <Avatar src={contact?.avator} icon={<UserOutlined />} shape='square' size={80} />
                    </div>
                    <div className="chat-contentBox-rightBar-contactDetail-contactCard-detail">
                        <div className="chat-contentBox-rightBar-contactDetail-contactCard-detail-remark">{contact?.name}</div>
                        <div className="chat-contentBox-rightBar-contactDetail-contactCard-detail-namej commentText">Username: {contact?.name}</div>
                        <div className="chat-contentBox-rightBar-contactDetail-contactCard-detail-medalID commentText">MedalID: {contact?._id}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', flexDirection: 'row', marginBottom: 10, marginHorizontal: '3%', }}>
                            <div style={{ fontSize: 14 }}>@{contact?.name}</div>
                            <div style={{ fontSize: 12, color: COLORS.commentText }}>于{formatTimeToChinese(contact?.createdAt)}加入</div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

                {contact?.personalStatus && <div className='chat-contentBox-rightBar-contactDetail-remarks'>
                    <div className='chat-contentBox-rightBar-contactDetail-remarks-title'>Personal Status</div>
                    <div className='chat-contentBox-rightBar-contactDetail-remarks-item'>{contact?.personalStatus}</div>
                </div>}
                <div style={{ margin: "10px 0", display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: SIZE.NormalMargin, paddingRight: SIZE.NormalMargin }}>
                    <div
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: SIZE.NormalMargin, paddingHorizontal: SIZE.LargerMargin, borderRadius: SIZE.CardBorderRadiusForBtn, borderWidth: 2, borderColor: COLORS.primary }}
                        onClick={handleSendMessage}
                    >
                        <div style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.primary }}>发消息</div>
                    </div>
                    {alreadySubscribed ?
                        <div
                            style={{ padding: '0 40px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: SIZE.CardBorderRadiusForBtn, backgroundColor: COLORS.primary }}
                            onClick={handleUnSubscribe}
                        >
                            <div style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.white }}>取消关注</div>
                        </div> : <div
                            style={{ padding: '0 40px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: SIZE.CardBorderRadiusForBtn, backgroundColor: COLORS.primary }}
                            onClick={handleSubscribe}
                        >
                            <div style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.white }}>关注</div>
                        </div>}
                </div>
                <div style={{ height: 0.4, width: '100%', backgroundColor: "#383838" }}></div>
                <div>
                    <Tabs
                        defaultActiveKey='blog'
                        centered
                        items={[{
                            label: `Blog`,
                            key: 'blog',
                            children: <div>
                                {contact?.blogs && <div style={{ marginBottom: SIZE.LittleMargin }}><div style={{ fontSize: 12, color: COLORS.commentText }}>总共「{contact.blogs.length}」个动态</div></div>}
                                {contact?.blogs && <WaterfallContainer blogs={contact.blogs} />}
                                {/* {user?.blogs && user.blogs.map((item, index) => <BlogCard blog={item} key={index} />)} */}
                            </div>,
                        }, {
                            label: `Record`,
                            key: "record",
                            children: <div>
                                {records.length !== 0 && <UserRecordSum records={records} />}
                                {records.length !== 0 && <UserBestRecord records={records} />}
                                <div style={{ fontSize: SIZE.SmallTitle, color: COLORS.commentText }}>总共「{records.length}」个运动记录</div>
                            </div>,
                        }]}
                    />
                </div>
                <Modal title="Report" open={isReportModalOpen} onOk={handleSubmitReport} onCancel={handleSubmitReportCancel}>
                    <Form
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item label="Report Reason">
                            <TextArea placeholder={'please write more detail for us to deal with your report'} onChange={({ target: { value } }) => { setReportReason(value) }} rows={4} />
                        </Form.Item>
                    </Form>
                </Modal >
            </div>
        </>
    )
}
