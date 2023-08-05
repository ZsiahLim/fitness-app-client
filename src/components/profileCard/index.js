import {
    Avatar, Button, Modal, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, message, Upload,
} from 'antd'

import {
    UserOutlined, PlusOutlined, EditOutlined
} from '@ant-design/icons';
import React, { useState } from 'react'
import './index.less'
import { auth, storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios';

import { useSelector } from 'react-redux'

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

export default function ProfileCard() {
    const { currentUser } = useSelector((state) => state.user)
    const { _id, name, personalStatus, age, preferedTheme, preferedLanguage, gender } = currentUser
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [updateAvatar, setUpdateAvatar] = useState()
    const dispatch = useDispatch()
    const showEditModal = () => {
        setIsEditModalOpen(true);
    };
    const handleEditOk = () => {
        setIsEditModalOpen(false);
    };
    const handleCancel = () => {
        setIsEditModalOpen(false);
    };
    const onAvatarDrop = ({ file }) => {
        setUpdateAvatar(file)
    }
    const submitToFireBase = (info) => {
        if (updateAvatar) {
            const file = updateAvatar
            const storageRef = ref(storage, `${currentUser.name}-avatar`);//need to do

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        dispatch(loginStart())
                        await axios.put(`http://localhost:3001/api/users/${currentUser._id}`, {
                            avator: downloadURL,
                            ...info
                        }, { withCredentials: true }).then((res) => {
                            dispatch(loginSuccess(res.data))
                            handleEditOk()
                        })
                    });
                }
            );
        } else {
            message.err('Some error happens')
        }
    }
    const onFinish = async (Info) => {
        let newObj = Object.keys(Info)
            .filter((key) => Info[key] != null)
            .reduce((a, key) => ({ ...a, [key]: Info[key] }), {});
        console.log(newObj);
        if (updateAvatar) {
            submitToFireBase(newObj)
        } else {
            dispatch(loginStart())
            await axios.put(`http://localhost:3001/api/users/${currentUser._id}`, newObj,
                { withCredentials: true })
                .then((res) => {
                    dispatch(loginSuccess(res.data))
                    handleEditOk()
                })
        }
    };

    return (
        <div className='profileCard'>
            <div className='Card-Avatar'>
                <Avatar size={160} icon={<UserOutlined />} src={currentUser?.avator ? currentUser.avator : ''} />
            </div>
            <div className='Card-UserInfo'>
                <div className='Card-Username'><h1>{name}</h1></div>
                {personalStatus && <div className='Card-UserStatus'>"{personalStatus}"</div>}
                {age && <div className='Card-UserAge'>{age} years old</div>}
                <div className='Card-UserAppId'>Medal ID: {_id}</div>
                <div className='Card-Edit'>
                    <Button onClick={showEditModal}><EditOutlined />&nbsp;&nbsp;Edit Profile</Button>
                </div>
            </div>
            <Modal
                title="Update your profile"
                open={isEditModalOpen}
                onOk={handleEditOk}
                onCancel={handleCancel}
                okText="Update"
                cancelText="Cancel"
                footer={null}
            >
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    style={{
                        maxWidth: 600,
                        width: 600,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item name="gender" label="Gender">
                        <Radio.Group defaultValue={gender}>
                            <Radio value="Male"> Male </Radio>
                            <Radio value="Female"> Female </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="name" label="User Name">
                        <Input defaultValue={name} />
                    </Form.Item>
                    <Form.Item name="age" label="Age" >
                        <InputNumber defaultValue={age} />
                    </Form.Item>
                    <Form.Item name="personalStatus" label="Personal Status">
                        <TextArea defaultValue={personalStatus} rows={2} />
                    </Form.Item>
                    <Form.Item name="preferedTheme" label="Pefered Theme">
                        <Select defaultValue={preferedTheme}>
                            <Select.Option value="dark">dark</Select.Option>
                            <Select.Option value="light">light</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="preferedLanguage" label="Language">
                        <Select defaultValue={preferedLanguage}>
                            <Select.Option value="English">English</Select.Option>
                            <Select.Option value="Chinese">中文</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="hpNum" label="Phone number">
                        <Input />
                    </Form.Item>
                    <Form.Item name="birthday" label="Birthday">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Avator" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload
                            customRequest={onAvatarDrop}
                            listType="picture-circle"
                            maxCount={1}
                        >
                            <div>
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Button style={{ marginLeft: 400 }} type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form>
            </Modal>
        </div >
    )
}
