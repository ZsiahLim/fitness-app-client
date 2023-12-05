import { EllipsisOutlined, LeftOutlined, MessageFilled, MessageOutlined, UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { createconversation, createreport, getuser, removecontact } from '../../../../api/user.api'
import { Avatar, Dropdown, Form, Modal, message } from 'antd'
import './contactDetail.less'
import { useDispatch, useSelector } from 'react-redux'
import TextArea from 'antd/es/input/TextArea'
import { loginStart, loginSuccess } from '../../../../redux/userSlice'
import SIZE from '../../../../constants/SIZE'
import useUserTheme from '../../../../hooks/useUserTheme'
import APPTHEME from '../../../../constants/COLORS/APPTHEME'
import COLORS from '../../../../constants/COLORS'
import { formatTimeToChinese } from '../../../../utils/formatTime'

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
    }, [])

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
        {
            key: '4',
            danger: true,
            label: (
                <div onClick={() => confirmDelete()}>
                    Delete user
                </div>
            ),
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
                <div className='chat-contentBox-rightBar-contactDetail-action'>
                    <div className='chat-contentBox-rightBar-contactDetail-action-item' onClick={() => doConversation(contact?._id)}>
                        <MessageOutlined style={{ fontSize: 36 }} />
                        <div className='chat-contentBox-rightBar-contactDetail-action-item-desc commentText'>
                            Message
                        </div>
                    </div>
                </div>
                <div className='chat-contentBox-rightBar-contactDetail-'>

                </div>
                <div className='chat-contentBox-rightBar-contactDetail-'>

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
