import {
    Avatar, Button, Cascader, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch, message, Upload,
} from 'antd'

import {
    UserOutlined, PlusOutlined, EditOutlined
} from '@ant-design/icons';
import React, { useState } from 'react'
import './blogsBox.less'
import { auth, storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const options = [{
    value: 'fit',
    label: 'fit',
}, {
    value: 'eat',
    label: 'eat',
}, {
    value: 'daily life',
    label: 'daily life',
}];
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
export default function PostBlog() {
    const formRef = React.useRef(null);
    let { theme } = useParams()
    const { currentUser } = useSelector((state) => state.user)
    const { _id, name, personalStatus, age, preferedTheme, preferedLanguage, gender } = currentUser
    const [blogImg, setBlogImg] = useState()
    const onAvatarDrop = ({ file }) => {
        setBlogImg(file)
    }
    const submitToFireBase = (info) => {
        if (blogImg) {
            const file = blogImg
            const storageRef = ref(storage, `${currentUser.name}-blog-${parseInt((new Date().getTime() / 1000).toString())}`);//need to do
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
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        await axios.post(`http://localhost:3001/api/blogs`, {
                            imgUrl: [downloadURL],
                            ...info
                        }, { withCredentials: true }).then((res) => {
                            if (res.statusText === 'OK') {
                                message.success('Post blog successfully!')
                                onReset()
                            } else {
                                message.error('Failed to post your blog')
                            }
                        })
                    });
                }
            );
        } else {
            message.err('Some error happens')
        }
    }
    const onFinish = async (Blog) => {
        if (blogImg) {
            submitToFireBase(Blog)
        } else {
            await axios.post(`http://localhost:3001/api/blogs/`, Blog,
                { withCredentials: true })
                .then((res) => {
                    if (res.statusText === 'OK') {
                        message.success('Post blog successfully!')
                        onReset()
                    } else {
                        message.error('Failed to post your blog')
                    }
                })
        }
    };
    const onReset = () => {
        formRef.current?.resetFields();
    };
    const lightpostBox = theme === 'light' ? 'postBox-light' : ''

    return (
        <div className='postBlog'>
            <div className={`postBox ${lightpostBox}`}>
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    style={{
                        width: '100%',
                    }}
                    onFinish={onFinish}
                    ref={formRef}
                >
                    {/* <Form.Item name="scope" label="Scope">
                    <Radio.Group >
                        <Radio value="Public"> Public </Radio>
                        <Radio value="Private"> Private </Radio>
                    </Radio.Group>
                </Form.Item> */}
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label="Content"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>
                    <Form.Item
                        name="tags"
                        label="Tags"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            mode="tags"
                            style={{
                                width: '100%',
                            }}
                            placeholder="Tags Mode"
                            onChange={handleChange}
                            options={options}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Picture"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Upload
                            customRequest={onAvatarDrop}
                            listType="picture-card"
                            maxCount={3}
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
                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 14,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div >
    )
}

