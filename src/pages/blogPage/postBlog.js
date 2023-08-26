import { Button, DatePicker, Form, Input, Select, message, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import './blogsBox.less'
import { storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
const { TextArea } = Input;

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const options = [{ value: 'fit', label: 'fit' }, { value: 'eat', label: 'eat' }, { value: 'daily life', label: 'daily life' }];

export default function PostBlog() {
    const formRef = React.useRef(null);
    let { theme } = useParams()
    const { currentUser } = useSelector((state) => state.user)
    const { _id, name, personalStatus, age, preferedTheme, preferedLanguage, gender } = currentUser
    const [blogImg, setBlogImg] = useState()
    const [fileList, setFileList] = useState([])
    const [imagesUrls, setImagesUrls] = useState([])
    // const uploadImage = ({ fileList: newFileList }) => {
    //     console.log("newFileList", newFileList);
    //     let newArr = []
    //     fileList.forEach((item, index) => {
    //     })
    //     setFileList(newFileList);
    // };
    const removeImage = (e) => {
        console.log("e", e);
        let newArr = []
        fileList.forEach((item, index) => {
            e.uid !== item.uid && newArr.push(item)
        })
        setFileList(newArr);
    };
    useEffect(() => {
        console.log("imagesList", fileList);
        let newImageUrls = []
        fileList.forEach((item, index) => {
            if (item.url) {
                newImageUrls.push(item.url)
            }
        })
        console.log("newImageUrls", newImageUrls);
        setImagesUrls(newImageUrls)
    }, [fileList])
    const onAvatarDrop = ({ file }) => {
        console.log("file: ", file);
        setBlogImg(file)
        submitToFireBase(file)
    }
    const postBlog = async (blog) => {
        await axios.post(`http://localhost:3001/api/blogs`, blog ? {
            imgUrl: imagesUrls,
            ...blog
        } : blog, { withCredentials: true }).then((res) => {
            if (res.statusText === 'OK') {
                message.success('Post blog successfully!')
                onReset()
            } else {
                message.error('Failed to post your blog')
            }
        })
    }
    const setNewFileList = (newFileList) => {
        console.log('diaoyongle');
        setFileList(newFileList)
    }
    const submitToFireBase = (file) => {
        if (file) {
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
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        console.log("fileList", fileList);
                        let newFileList = fileList
                        newFileList.push({ ...file, url: downloadURL })
                        console.log("newFileList", newFileList);
                        setNewFileList(newFileList)
                    });
                }
            );
        } else {
            message.err('Some error happens')
        }
    }

    const onFinish = async (Blog) => postBlog(Blog)
    const onReset = () => {
        formRef.current?.resetFields();
        setFileList([])
        setImagesUrls([])
    };
    const lightpostBox = theme === 'light' ? 'postBox-light' : ''


    return (
        <div className='postBlog'>
            <div className={`postBox ${lightpostBox}`}>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ width: '100%' }}
                    onFinish={onFinish}
                    ref={formRef}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label="Content"
                        rules={[{ required: true }]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>
                    <Form.Item
                        name="tags"
                        label="Tags"
                        rules={[{ required: true }]}
                    >
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Tags Mode"
                            options={options}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Picture"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true }]}
                    >
                        <Upload
                            customRequest={onAvatarDrop}
                            listType="picture-card"
                            fileList={fileList}
                            onRemove={removeImage}
                            maxCount={6}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}                                >
                                    Upload
                                </div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ offset: 6, span: 14 }}
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

