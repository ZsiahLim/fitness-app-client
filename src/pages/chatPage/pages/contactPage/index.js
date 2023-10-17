import { Avatar, Button, List, Skeleton, message, Modal, Select, Input, Popconfirm, Drawer, Segmented, Divider, Form, Badge } from 'antd';
import { UserOutlined, MessageFilled, MessageTwoTone, ContactsTwoTone, StarTwoTone, LeftOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { UserAddOutlined } from '@ant-design/icons'
import { loginStart, loginSuccess } from '../../../../redux/userSlice'
import { useDispatch } from 'react-redux'
import { addcontact, createconversation, createreport, removecontact } from '../../../../api/user.api';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import ContactsList from '../../Components/ContactsList';
import FootNavigationBar from '../../Components/footNavigationBar';
const { TextArea } = Input;

export default function ContactPage() {
    // const { currentUser, currentTheme } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    // const contactsId = currentUser.contactsUsers
    // const [contacts, setContacts] = useState(useLoaderData())
    // const lightcontactsPageClassname = currentTheme === 'light' ? "contactsPage-light" : ''
    const [isaddContactModalOpen, setIsaddContactOpen] = useState(false);
    const [addMethod, setAddMethod] = useState('email');
    const [addInfo, setAddInfo] = useState('');
    // const showAddModal = () => {
    //     setIsaddContactOpen(true);
    // };
    // const confirmDelete = async (user) => {
    //     dispatch(loginStart())
    //     const updatedUser = await removecontact(user._id)
    //     message.success('this contact has been already deleted')
    //     dispatch(loginSuccess(updatedUser))
    //     setContacts(contacts.filter((e) => e._id !== user._id))
    // };
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
        try {
            const updatedUser = await addcontact(reqBody)
            if (updatedUser.status === false) {
                message.error('can not add the contact')
            } else {
                message.success('Add contact successfully!')
                setIsaddContactOpen(false)
                dispatch(loginSuccess(updatedUser))
            }
        } catch (error) {
            message.error('can not add the contact')
            console.log(error);
        }
    };
    const handleCancel = () => {
        setIsaddContactOpen(false);
    };
    // const handleMessage = async (contactID) => {
    //     try {
    //         const res = await createconversation({ receiverId: contactID })
    //         setSelectPage('chat')
    //         message.success('create conversation successfully')
    //     } catch (error) {
    //         message.error('failed to create conversation')
    //     }
    // }
    const handleOptionsChange = (value) => {
        setAddMethod(value)
    };
    // const [userProfileDrawer, setUserProfileDrawer] = useState()
    // const [open, setOpen] = useState(false);
    // const showDrawer = (item) => {
    //     setOpen(true);
    //     setUserProfileDrawer(item)
    // };
    // const onClose = () => {
    //     setOpen(false);
    // };
    // const [reportReason, setReportReason] = useState();
    // const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    // const [reportUserID, setReportUserID] = useState()
    // const handleSubmitReportCancel = () => {
    //     setIsReportModalOpen(false)
    // }
    // const handleSubmitReport = async () => {
    //     reportReason ? await createreport({ type: 'user', targetID: reportUserID, content: reportReason }).then(() => {
    //         message.success('We received your report, we will inform you the results later')
    //         setIsReportModalOpen(false)
    //     }).catch(err => {
    //         console.log(err);
    //         message.error('error happens, failed to report')
    //     }) : message.warning('please write the reason of the report')
    // }
    const { currentTheme } = useSelector((state) => state.user)
    const page = useLocation()
    const navigateTo = useNavigate()
    const [selectPage, setSelectPage] = useState(page.pathname.split('/')[2]);
    useEffect(() => {

    }, [])
    const lightnavigation = currentTheme === 'light' ? 'navigation-light' : ''
    return (

        // <div className={`contactsPage ${lightcontactsPageClassname}`}>
        //     <div className='contactPage-header'>
        //         <div className='contactPage-addBtn' onClick={showAddModal}><UserAddOutlined />&nbsp;&nbsp;Add contacts</div>
        //     </div>
        //     <div className='contactPage-contactList'>
        //         <List
        //             className="demo-loadmore-list"
        //             itemLayout="horizontal"
        //             dataSource={contacts}
        //             renderItem={(item) => (
        //                 <List.Item
        //                     actions={[<span
        //                         className='contactsPage-btn contactsPage-deleteBtn'
        //                         key="list-loadmore-edit"
        //                     >
        //                         <Popconfirm
        //                             title="Delete the contact"
        //                             description="Are you sure to delete this contact?"
        //                             onConfirm={() => confirmDelete(item)}
        //                             okText="Yes"
        //                             cancelText="No"
        //                         >
        //                             <Button danger type="text">
        //                                 delete
        //                             </Button>
        //                         </Popconfirm>
        //                     </span>, <span
        //                         className='contactsPage-btn contactsPage-reportBtn'
        //                         key="list-loadmore-more"
        //                     >
        //                         <Button type="text" onClick={() => {
        //                             setReportUserID(item._id)
        //                             setIsReportModalOpen(true)
        //                         }}>Report</Button>
        //                     </span>]}
        //                 >
        //                     <Skeleton avatar title={false} loading={item.loading} active>
        //                         <List.Item.Meta
        //                             avatar={<Avatar size={60} src={item.avator} />}
        //                             title={<span className='contactsPage-btn contactsPage-name' style={{ fontSize: 22 }} >{item.name}</span>}
        //                             description={item.personalStatus ? item.personalStatus : ''}
        //                             onClick={() => showDrawer(item)}
        //                             style={{ cursor: 'pointer' }}
        //                         />
        //                         <div onClick={() => handleMessage(item._id)} className='contactsPage-btn contactsPage-chatBtn'>Chat&nbsp;<MessageFilled /></div>
        //                     </Skeleton>
        //                 </List.Item>
        //             )}
        //         />
        //     </div>
        // <Modal title="Add Contact" okText={'Add'} open={isaddContactModalOpen} onOk={handleOk} onCancel={handleCancel}>
        //     <div className='AddContactContent'>
        //         <div className='addMethod'>
        //             Methods:&nbsp;&nbsp; <Select
        //                 defaultValue="email"
        //                 style={{ width: 120 }}
        //                 onChange={handleOptionsChange}
        //                 options={[
        //                     { value: 'email', label: 'Email' },
        //                     { value: 'userId', label: 'User ID' },
        //                     { value: 'name', label: 'User Name' },
        //                 ]}
        //             />
        //         </div>
        //         <div className='addInfo'>
        //             Value:&nbsp;&nbsp;<Input maxLength={600} onChange={(e) => setAddInfo(e.target.value)} />
        //         </div>
        //     </div>
        // </Modal>
        //     <Drawer width={640} placement="right" onClose={onClose} open={open}>
        //         <div className='profileCard'>
        //             <div className='Card-Avatar'>
        //                 <Avatar size={160} icon={<UserOutlined />} src={userProfileDrawer?.avator ? userProfileDrawer.avator : ''} />
        //             </div>
        //             <div className='Card-UserInfo'>
        //                 <div className='Card-Username'><h1>{userProfileDrawer?.name}</h1></div>
        //                 {userProfileDrawer?.personalStatus && <div className='Card-UserStatus'>"{userProfileDrawer?.personalStatus}"</div>}
        //                 {userProfileDrawer?.age && <div className='Card-UserAge'>{userProfileDrawer?.age} years old</div>}
        //                 <div className='Card-UserAppId'>Medal ID: {userProfileDrawer?._id}</div>
        //                 <div className='Card-Edit'>
        //                 </div>
        //             </div>
        //         </div >
        //         <div className='tabs'>
        //             <Segmented options={['My medal', 'My Blogs', 'Liked Blogs', 'Favorite Blogs', 'My Tutorials', 'My Competitions']} />
        //         </div>
        //         <div className='divider'>
        //             <Divider style={{ width: "90%" }} />
        //         </div>
        //     </Drawer>
        //     <Modal title="Report" open={isReportModalOpen} onOk={handleSubmitReport} onCancel={handleSubmitReportCancel}>
        //         <Form
        //             labelCol={{ span: 7 }}
        //             wrapperCol={{ span: 14 }}
        //             layout="horizontal"
        //             style={{ maxWidth: 600 }}
        //         >
        //             <Form.Item label="Report Reason">
        //                 <TextArea placeholder={'please write more detail for us to deal with your report'} onChange={({ target: { value } }) => { setReportReason(value) }} rows={4} />
        //             </Form.Item>
        //         </Form>
        //     </Modal>
        // </div>
        <>
            <div className="chat-contentBox-leftBar">
                <div className="chat-contentBox-leftBar-header">
                    <div className="chat-contentBox-leftBar-header-title">Contacts</div>
                    <UserAddOutlined style={{ fontSize: 18 }} onClick={() => setIsaddContactOpen(true)} />
                </div>
                <div className="chat-contentBox-leftBar-mainContent">
                    <ContactsList />
                </div>
                <div className="chat-contentBox-leftBar-footNavigationBar">
                    {/* <div className={`navigation ${lightnavigation}`}
                        style={{
                            backgroundColor: selectPage === 'conversations' ? `${currentTheme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => navigateTo('/chat/conversations')}
                    >
                        <Badge size="small" count={1}>
                            <MessageTwoTone
                                className='navigationCenteredItem'
                                twoToneColor={selectPage === 'conversations' ? '#4e8df5' : "#3d3d3d"}
                                style={{ fontSize: 26 }}
                            />
                        </Badge>
                    </div>
                    <div className={`navigation ${lightnavigation}`}
                        style={{
                            backgroundColor: selectPage === 'contacts' ? `${currentTheme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => navigateTo('/chat/contacts')}
                    >
                        <ContactsTwoTone
                            className='navigationCenteredItem'
                            twoToneColor={selectPage === 'contacts' ? '#4e8df5' : "#3d3d3d"}
                            style={{ fontSize: 26 }}
                        />
                    </div>
                    <div className={`navigation ${lightnavigation}`}
                        style={{
                            backgroundColor: selectPage === 'favorites' ? `${currentTheme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => navigateTo('/chat/favorites')}
                    >
                        <StarTwoTone
                            className='navigationCenteredItem'
                            twoToneColor={selectPage === 'favorites' ? '#4e8df5' : "#3d3d3d"}
                            style={{ fontSize: 26 }}
                        />
                    </div> */}
                    <FootNavigationBar />
                </div>
            </div>
            <div className="chat-contentBox-rightBar">
                <Outlet />
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
        </>
    )
}