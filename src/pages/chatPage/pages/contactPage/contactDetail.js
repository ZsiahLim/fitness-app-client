import { EllipsisOutlined, LeftOutlined, UserOutlined } from '@ant-design/icons'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addcontactbyid, createconversation, createreport, getuser, removecontact } from '../../../../api/user.api'
import { Avatar, Dropdown, Form, Modal, Tabs, message } from 'antd'
import './contactDetail.less'
import { useDispatch, useSelector } from 'react-redux'
import TextArea from 'antd/es/input/TextArea'
import { loginSuccess } from '../../../../redux/userSlice'
import SIZE from '../../../../constants/SIZE'
import useUserTheme from '../../../../hooks/useUserTheme'
import COLORS from '../../../../constants/COLORS'
import { formatTimeToChinese } from '../../../../utils/formatTime'
import WaterfallContainer from '../../../../components/waterfallContainer/BlogsWrapper'
import UserRecordSum from '../../../../components/UserRecordSum'
import UserBestRecord from '../../../../components/UserBestRecord'
import { useIntl } from 'react-intl'
import ChatIcon from '../../../../Pic/chatIcon.gif'
import useRecordsByUserId from '../../../../hooks/useRecordsByUserID'
import ExerciseOverview from '../../../StatisticPage/ExerciseOverview'
import UserPageExerciseTrend from '../../../../components/UserPageExerciseTrend'
import APPTHEME from '../../../../constants/COLORS/APPTHEME'

export default function ContactDetail() {
    const intl = useIntl()
    const { userID: ContactID } = useParams()
    const { durationSum, calorieSum, distanceSum, stepSum, weeklyData, monthlyData, yearlyData } = useRecordsByUserId(ContactID)
    const navigateTo = useNavigate()
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const [contact, setContact] = useState()
    const [records, setRecords] = useState([])
    const alreadySubscribed = useMemo(() => currentUser.contactsUsers.includes(ContactID), [currentUser.contactsUsers, ContactID])
    const isOwn = useMemo(() => ContactID === currentUser._id, [ContactID])
    const getData = async () => {
        await getuser(ContactID).then(res => {
            if (res.status !== false) {
                setContact(res)
                setRecords(res.records)
            } else {
                message.error(intl.formatMessage({ id: 'error.errorMsg' }))
            }
        })
    }
    useEffect(() => {
        getData()
    }, [ContactID])
    const handleSendMessage = async () => {
        await createconversation({ receiverId: ContactID }).then(res => {
            if (res.status !== false) {
                const conversation = res.conversation
                navigateTo(`/chat/conversations/specific/${conversation._id}`)
            } else {
                message.error(intl.formatMessage({ id: 'error.errorMsg' }))
            }
        }).catch(err => {
            message.error(intl.formatMessage({ id: 'error.errorMsg' }))
        })
    }
    const handleSubscribe = async () => {
        await addcontactbyid(ContactID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res))
            } else {
                message.error(intl.formatMessage({ id: 'error.errorMsg' }))
            }
        }).catch(err => {
            message.error(intl.formatMessage({ id: 'error.errorMsg' }))
        })
    }
    const handleUnSubscribe = async () => {
        await removecontact(ContactID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res))
            } else {
                message.error(intl.formatMessage({ id: 'error.errorMsg' }))
            }
        })
    }
    const handleSubmitReport = async () => {
        reportReason ? await createreport({ type: 'user', targetID: contact._id, content: reportReason }).then(() => {
            message.success(intl.formatMessage({ id: 'app.blog.msg.reportSuccess' }))
            setIsReportModalOpen(false)
        }).catch(err => {
            console.log(err);
            message.error(intl.formatMessage({ id: 'error.blog.failToReport' }))
        }) : message.warning(intl.formatMessage({ id: 'app.blog.msg.reportWarn' }))
    }

    const items = [
        {
            key: '3',
            label: (<div onClick={() => setIsReportModalOpen(true)}>Report</div>),
        },
        alreadySubscribed && {
            key: '5',
            label: (<div onClick={handleUnSubscribe}>{intl.formatMessage({ id: 'app.cmty.btn.unsub' })}</div>),
        },
    ];

    const [reportReason, setReportReason] = useState();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)

    const handleSubmitReportCancel = () => {
        setIsReportModalOpen(false)
    }
    const lightContactDetailClassName = theme === 'light' ? 'chat-contentBox-rightBar-contactDetail-light' : ''

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
                        <div className="chat-contentBox-rightBar-contactDetail-contactCard-detail-namej commentText">{intl.formatMessage({ id: 'app.cmty.label.userName' })} {contact?.name}</div>
                        <div className="chat-contentBox-rightBar-contactDetail-contactCard-detail-medalID commentText">ID: {contact?._id}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', flexDirection: 'row', marginBottom: 10, marginHorizontal: '3%', }}>
                            <div style={{ fontSize: 14 }}>@{contact?.name}</div>
                            <div style={{ fontSize: 12, color: COLORS.commentText }}> {intl.formatMessage({ id: 'app.cmty.label.since' })}{formatTimeToChinese(contact?.createdAt)}{intl.formatMessage({ id: 'app.cmty.label.joined' })}</div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

                {contact?.personalStatus && <div className='chat-contentBox-rightBar-contactDetail-remarks'>
                    <div className='chat-contentBox-rightBar-contactDetail-remarks-title'>{intl.formatMessage({ id: 'app.cmty.label.bio' })}</div>
                    <div className='chat-contentBox-rightBar-contactDetail-remarks-item'>{contact?.personalStatus}</div>
                </div>}
                {!isOwn && <div style={{ margin: "10px 0", display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: SIZE.NormalMargin, paddingRight: SIZE.NormalMargin }}>
                    {(!alreadySubscribed) && <div
                        className='buttonHover'
                        style={{ padding: '0 10px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderStyle: "solid", borderRadius: SIZE.CardBorderRadiusForBtn, borderWidth: 2, borderColor: COLORS.primary }}
                        onClick={handleSubscribe}
                    >
                        <div style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.primary }}>{intl.formatMessage({ id: 'app.cmty.btn.sub' })}</div>
                    </div>}
                    <div
                        className='buttonHover'
                        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: SIZE.NormalMargin, paddingHorizontal: SIZE.LargerMargin, borderRadius: SIZE.CardBorderRadiusForBtn, borderWidth: 2, borderColor: COLORS.primary }}
                        onClick={handleSendMessage}
                    >
                        <div style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.primary, display: 'flex', alignItems: 'center' }}>
                            {theme === "light" && <img src={ChatIcon} style={{ width: 30, }} />}
                            <span>{intl.formatMessage({ id: 'app.cmty.btn.sendText' })}</span>
                        </div>
                    </div>
                </div>}
                <div style={{ height: 0.4, width: '100%', }}></div>
                <div>
                    <Tabs
                        defaultActiveKey='blog'
                        centered
                        items={[{
                            label: intl.formatMessage({ id: 'app.cmty.label.blog' }),
                            key: 'blog',
                            children: <div>
                                {contact?.blogs && <div style={{ marginBottom: SIZE.LittleMargin }}><div style={{ fontSize: 12, color: COLORS.commentText }}>{intl.formatMessage({ id: 'app.cmty.label.total' })}{contact.blogs.length}{intl.formatMessage({ id: 'app.cmty.label.totalBlogs' })}</div></div>}
                                {contact?.blogs && <WaterfallContainer blogs={contact.blogs} />}
                            </div>,
                        }, {
                            label: intl.formatMessage({ id: 'app.cmty.label.record' }),
                            key: "record",
                            children: <div>
                                {records.length !== 0 && <UserRecordSum records={records} />}
                                <div style={{ fontSize: SIZE.SmallTitle, color: COLORS.commentText }}>{intl.formatMessage({ id: 'app.cmty.label.total' })}{records.length}{intl.formatMessage({ id: 'app.cmty.label.totalRecord' })}</div>
                                <ExerciseOverview durationSum={durationSum} calorieSum={calorieSum} distanceSum={distanceSum} stepSum={stepSum} />
                                {records.length !== 0 && <UserBestRecord records={records} />}
                                <div style={{ marginBottom: 10, backgroundColor: THEME.backgroundColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
                                    <UserPageExerciseTrend weeklyData={weeklyData} monthlyData={monthlyData} yearlyData={yearlyData} />
                                </div>
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
                        <Form.Item label={intl.formatMessage({ id: 'app.cmty.label.reportReason' })}>
                            <TextArea placeholder={intl.formatMessage({ id: 'app.cmty.msg.lackDetails' })} onChange={({ target: { value } }) => { setReportReason(value) }} rows={4} />
                        </Form.Item>
                    </Form>
                </Modal >
            </div>
        </>
    )
}
