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
    const dispatch = useDispatch()
    const [isaddContactModalOpen, setIsaddContactOpen] = useState(false);
    const [addMethod, setAddMethod] = useState('email');
    const [addInfo, setAddInfo] = useState('');
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
    const handleOptionsChange = (value) => {
        setAddMethod(value)
    };
    return (

        <>
            <div className="chat-contentBox-leftBar">
                <div className="chat-contentBox-leftBar-header">
                    <div className="chat-contentBox-leftBar-header-title">Contacts</div>
                    {/* <UserAddOutlined style={{ fontSize: 18 }} onClick={() => setIsaddContactOpen(true)} /> */}
                </div>
                <div className="chat-contentBox-leftBar-mainContent">
                    <ContactsList />
                </div>
                <div className="chat-contentBox-leftBar-footNavigationBar">
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