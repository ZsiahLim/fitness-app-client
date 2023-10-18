import { Avatar, Button, Modal, DatePicker, Form, Input, InputNumber, Radio, Select, message, Upload } from 'antd'
import { UserOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import './index.less'
import { storage } from '../../../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { loginSuccess } from '../../../../redux/userSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { updateuserinfo } from '../../../../api/user.api';
import dayjs from 'dayjs';
const { TextArea } = Input;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

export default function ProfileCard() {
    const { currentUser } = useSelector((state) => state.user)
    const { _id, name, personalStatus, age, preferedTheme, preferedLanguage, gender, avator, birthday, hpNum } = currentUser
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const dispatch = useDispatch()
    const showEditModal = () => { setIsEditModalOpen(true); };
    const handleEditOk = () => { setIsEditModalOpen(false); };
    const handleCancel = () => { setIsEditModalOpen(false); };
    const [updatedAvator, setUpdatedAvator] = useState([{ uid: 0, name: 'Avator', status: 'done', url: avator, thumbUrl: avator }])
    const propsImage = {
        onRemove: (file) => {
            const index = updatedAvator.indexOf(file);
            const newFileList = updatedAvator.slice();
            newFileList.splice(index, 1);
            setUpdatedAvator(newFileList);
        },
        beforeUpload: (file) => {
            const isImage = file.type?.startsWith('image')
            if (isImage) {
                updatedAvator.push({ ...file, name: file.name })
                setUpdatedAvator(updatedAvator)
            } else {
                message.error('u only can upload picture here')
                return false
            }
        },
        fileList: updatedAvator,
    };
    const submitImageToFirebase = ({ file }) => {
        if (file) {
            const storageRef = ref(storage, `${name}-avator-${parseInt((new Date().getTime() / 1000).toString())}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                const handledBlogImgs = updatedAvator.map(item => {
                    if (item.uid === file.uid) {
                        return { ...file, status: 'uploading', percent: progress }
                    }
                    return item
                })
                setUpdatedAvator(handledBlogImgs)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running', progress);
                        break;
                }
            },
                (error) => {
                    message.err('Some error happens')
                    updatedAvator.map(item => {
                        if (item.uid === file.uid) {
                            return { ...file, status: 'error' }
                        }
                        return item
                    })
                    setUpdatedAvator(updatedAvator)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const handledBlogImgs = updatedAvator.map(item => {
                            if (item.uid === file.uid) {
                                return { ...file, status: 'done', url: downloadURL, thumbUrl: downloadURL, name: file.name }
                            }
                            return item
                        })
                        setUpdatedAvator(handledBlogImgs)
                    });
                }
            );
        } else {
            message.err('Some error happens')
            updatedAvator.map(item => {
                if (item.uid === file.uid) {
                    return item = { ...file, status: 'error' }
                }
                return item
            })
            setUpdatedAvator(updatedAvator)
        }
    }
    const onFinish = async (items) => {
        let handledItems = { ...items, avator: updatedAvator[0].url }
        let updateInfo = Object.keys(handledItems)
            .filter((key) => handledItems[key] != null)
            .reduce((a, key) => ({ ...a, [key]: handledItems[key] }), {});
        try {
            await updateuserinfo(currentUser._id, updateInfo)
                .then((updatedUser) => {
                    dispatch(loginSuccess(updatedUser))
                    handleEditOk()
                    message.success('updated successfully')
                })
        } catch (error) {
            console.log(error);
            message.error('error')
        }
    }
    const onFinishFailed = (errorInfo) => { message.error('Failed:', errorInfo) }
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
            <Modal title="Update your profile" open={isEditModalOpen} onOk={handleEditOk} onCancel={handleCancel} okText="Update" cancelText="Cancel" footer={null} width={600}>
                <Form labelCol={{ span: 6, }} wrapperCol={{ span: 14, }} layout="horizontal" style={{ width: 600 }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                            <Select.Option value="en_US">English</Select.Option>
                            <Select.Option value="zh_CN">中文</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="hpNum" label="Phone number">
                        <Input defaultValue={hpNum} />
                    </Form.Item>
                    <Form.Item name="birthday" label="Birthday">
                        {birthday ? <DatePicker defaultValue={dayjs(birthday, 'YYYY-MM-DD')} /> : <DatePicker />}
                    </Form.Item>
                    <Form.Item label="Avator" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload name="image" listType="picture" customRequest={submitImageToFirebase} maxCount={1} {...propsImage}>
                            <Button icon={<UploadOutlined />}>upload your avator</Button>
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
