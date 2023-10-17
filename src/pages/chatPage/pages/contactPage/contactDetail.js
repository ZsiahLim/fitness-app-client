import { EllipsisOutlined, LeftOutlined, MessageFilled, MessageOutlined, UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createconversation, createreport, getuser, removecontact } from '../../../../api/user.api'
import { Avatar, Dropdown, Form, Modal, message } from 'antd'
import './contactDetail.less'
import { useDispatch, useSelector } from 'react-redux'
import TextArea from 'antd/es/input/TextArea'
import { loginStart, loginSuccess } from '../../../../redux/userSlice'

export default function ContactDetail() {
    const { currentTheme } = useSelector(state => state.user)
    const [contact, setContact] = useState()
    const location = useLocation()
    const navigateTo = useNavigate()

    const dispatch = useDispatch()
    useEffect(() => {
        const contactID = location.pathname.split('/')[4]
        getData(contactID).then((res) => {
            setContact(res)
            console.log('contact', res);
        })
    }, [location])

    const getData = async (userID) => {
        return await getuser(userID)
    }
    const confirmDelete = async (id) => {
        dispatch(loginStart())
        const updatedUser = await removecontact(id)
        message.success('this contact has been already deleted')
        dispatch(loginSuccess(updatedUser))
        navigateTo('/chat/contacts')
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
                <div onClick={() => confirmDelete(contact._id)}>
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
    const doConversation = async (contactID) => {
        try {
            const conversation = await createconversation({ receiverId: contactID })
            navigateTo(`/chat/conversations/specific/${conversation._id}`)
        } catch (error) {
            message.error('failed to create conversation')
        }
    }
    return (
        <>
            <div className="chat-contentBox-rightBar-header">
                <LeftOutlined style={{ fontSize: 24 }} onClick={() => navigateTo('/chat/contacts')} />
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
                    </div>
                </div>
                <div className='chat-contentBox-rightBar-contactDetail-remarks'>
                    <div className='chat-contentBox-rightBar-contactDetail-remarks-title'>Remark</div>
                    <div className='chat-contentBox-rightBar-contactDetail-remarks-item'>{contact?.name}</div>
                </div>
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
