import React from 'react'
import { Avatar, Button, List, Skeleton, message, Modal, Select, Input, Popconfirm, Drawer, Segmented, Divider, Form } from 'antd';
import { UserOutlined, HeartTwoTone, MessageFilled, HeartFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { UserAddOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom';
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
axios.defaults.withCredentials = true

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);
const DataUrl = `http://localhost:3001/api/users/`;
export default function ContactPage({ setSelectPage }) {
    const { currentUser } = useSelector((state) => state.user)
    const { theme } = useParams()
    const dispatch = useDispatch()
    const contactsId = currentUser.contactsUsers
    const [contacts, setContacts] = useState([])
    const lightcontactsPageClassname = theme === 'light' ? "contactsPage-light" : ''
    const [isaddContactModalOpen, setIsaddContactOpen] = useState(false);
    const [addMethod, setAddMethod] = useState('email');
    const [addInfo, setAddInfo] = useState('');
    const showAddModal = () => {
        setIsaddContactOpen(true);
    };
    const confirmDelete = async (user) => {
        dispatch(loginStart())
        const res = await axios.put(`http://localhost:3001/api/users/remove/${user._id}`)
        if (res.status === 200) {
            message.success('this contact has been already deleted')
            dispatch(loginSuccess(res.data))
            setContacts(contacts.filter((e) => e._id !== user._id))
        } else {
            message.error('error')
        }
    };
    const handleOk = async () => {
        let reqBody
        switch (addMethod) {
            case 'email':
                reqBody = { method: 'email', value: addInfo }
                break;
            case 'userId':
                reqBody = { method: 'userId', value: addInfo }
                break;
            case 'name':
                reqBody = { method: 'name', value: addInfo }
                break;
            default:
                break;
        }
        console.log('shizhe');
        try {
            dispatch(loginStart())
            const res = await axios.put(`http://localhost:3001/api/users/add/${currentUser._id}`, { ...reqBody }, { withCredentials: true })
            if (res.status === 200) {
                message.success('Add contact successfully!')
                setIsaddContactOpen(false)
                dispatch(loginSuccess(res.data))
            } else {
                message.error(res.statusText)
            }
        } catch (error) {
            message.error('can not add the contact')
            console.log(error);
        }
    };
    const handleCancel = () => {
        setIsaddContactOpen(false);
    };
    useEffect(() => {
        const getContactByID = async (userID) => {
            return await axios.get(`http://localhost:3001/api/users/find/${userID}`, { withCredentials: true }).then(res => {
                console.log('daozhelileA', res.data);
                return res.data
            }).catch(err => {
                console.log(err);
                message.error('failed to get your contact')
            })
        }
        const requests = contactsId.map(userId => getContactByID(userId));
        const getWholeContacts = async () => {
            return await Promise.all(requests)
                .then(userData => {
                    // userData是一个包含每个用户对象的数组
                    // 在这里可以对userData进行处理或使用
                    setContacts(userData)
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
        getWholeContacts()
    }, [])
    const handleMessage = async (contactID) => {
        await axios.post('http://localhost:3001/api/conversations', {
            receiverId: contactID
        }, { withCredentials: true }).then(res => {
            if (res.status === 200) {
                setSelectPage('chat')
                message.success('create conversation successfully')
            } else {
                message.error('failed to create conversation')
            }
        })
    }
    const handleOptionsChange = (value) => {
        setAddMethod(value)
    };
    const [userProfileDrawer, setUserProfileDrawer] = useState()
    const [open, setOpen] = useState(false);
    const showDrawer = (item) => {
        setOpen(true);
        setUserProfileDrawer(item)
    };
    const onClose = () => {
        setOpen(false);
    };
    const [reportReason, setReportReason] = useState();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    const [reportUserID, setReportUserID] = useState()
    const handleSubmitReportCancel = () => {
        setIsReportModalOpen(false)
    }
    const handleSubmitReport = async () => {
        reportReason ? await axios.post('http://localhost:3001/api/users/report', { type: 'user', targetID: reportUserID, reason: reportReason }, { withCredentials: true }).then((res) => {
            message.success('We received your report, we will inform you the results later')
            setIsReportModalOpen(false)
        }).catch(err => {
            console.log(err);
            message.error('error happens, failed to report')
        }) : message.warning('please write the reason of the report')
    }
    return (
        <div className={`contactsPage ${lightcontactsPageClassname}`}>
            <div className='contactPage-header'>
                <div className='contactPage-addBtn' onClick={showAddModal}><UserAddOutlined />&nbsp;&nbsp;Add contacts</div>
            </div>
            <div className='contactPage-contactList'>
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={contacts}
                    renderItem={(item) => (
                        <List.Item
                            actions={[<span
                                className='contactsPage-btn contactsPage-deleteBtn'
                                key="list-loadmore-edit"
                            >
                                <Popconfirm
                                    title="Delete the contact"
                                    description="Are you sure to delete this contact?"
                                    onConfirm={() => confirmDelete(item)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger type="text">
                                        delete
                                    </Button>
                                </Popconfirm>
                            </span>, <span
                                className='contactsPage-btn contactsPage-reportBtn'
                                key="list-loadmore-more"
                            >
                                <Button type="text" onClick={() => {
                                    setReportUserID(item._id)
                                    setIsReportModalOpen(true)
                                }}>Report</Button>
                            </span>]}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar size={60} src={item.avator} />}
                                    title={<span className='contactsPage-btn contactsPage-name' style={{ fontSize: 22 }} >{item.name}</span>}
                                    description={item.personalStatus ? item.personalStatus : ''}
                                    onClick={() => showDrawer(item)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <div onClick={() => handleMessage(item._id)} className='contactsPage-btn contactsPage-chatBtn'>Chat&nbsp;<MessageFilled /></div>
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </div>
            <Modal title="Add Contact" okText={'Add'} open={isaddContactModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='AddContactContent'>
                    <div className='addMethod'>
                        Methods:&nbsp;&nbsp; <Select
                            defaultValue="email"
                            style={{ width: 120 }}
                            onChange={handleOptionsChange}
                            options={[
                                { value: 'email', label: 'Email' },
                                { value: 'userId', label: 'User ID' },
                                { value: 'name', label: 'User Name' },
                            ]}
                        />
                    </div>
                    <div className='addInfo'>
                        Value:&nbsp;&nbsp;<Input maxLength={600} onChange={(e) => setAddInfo(e.target.value)} />
                    </div>
                </div>
            </Modal>
            <Drawer width={640} placement="right" onClose={onClose} open={open}>
                <div className='profileCard'>
                    <div className='Card-Avatar'>
                        <Avatar size={160} icon={<UserOutlined />} src={userProfileDrawer?.avator ? userProfileDrawer.avator : ''} />
                    </div>
                    <div className='Card-UserInfo'>
                        <div className='Card-Username'><h1>{userProfileDrawer?.name}</h1></div>
                        {userProfileDrawer?.personalStatus && <div className='Card-UserStatus'>"{userProfileDrawer?.personalStatus}"</div>}
                        {userProfileDrawer?.age && <div className='Card-UserAge'>{userProfileDrawer?.age} years old</div>}
                        <div className='Card-UserAppId'>Medal ID: {userProfileDrawer?._id}</div>
                        <div className='Card-Edit'>
                        </div>
                    </div>
                </div >
                <div className='tabs'>
                    <Segmented options={['My medal', 'My Blogs', 'Liked Blogs', 'Favorite Blogs', 'My Tutorials', 'My Competitions']} />
                </div>
                <div className='divider'>

                    <Divider style={{ width: "90%" }} />
                </div>
            </Drawer>
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
            </Modal>
        </div>
    )
}