import { Button, Form, Input, Select, message, Upload, Radio } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { storage } from '../../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from 'react-redux'
import CardTitle from '../../../components/CardTitle'
import { postblog } from '../../../api/user.api';
const { TextArea } = Input;
const normFile = (e) => { return Array.isArray(e) ? e : e?.fileList }
const options = [{ value: 'fit', label: 'fit' }, { value: 'eat', label: 'eat' }, { value: 'daily life', label: 'daily life' }];
export default function PostBlog({ updateData, setUploadBlogOpen }) {
    const formRef = React.useRef(null)
    const { currentTheme } = useSelector((state) => state.user)
    const [uploading, setUploading] = useState(false)
    const [blogType, setBlogType] = useState()
    const [blogImgs, setBlogImgs] = useState([])
    const [blogVideo, setBlogVideo] = useState([])
    const [videoSize, setVideoSize] = useState([])
    const propsImage = {
        onRemove: (file) => {
            const index = blogImgs.indexOf(file);
            const newFileList = blogImgs.slice();
            newFileList.splice(index, 1);
            setBlogImgs(newFileList);
        },
        beforeUpload: (file) => {
            const isImage = file.type?.startsWith('image')
            if (isImage) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const image = new Image();
                        image.src = e.target.result;
                        image.onload = () => {
                            const width = image.width;
                            const height = image.height;
                            // 在这里可以获取到文件的宽度和高度
                            console.log(`宽度: ${width}, 高度: ${height}`);
                            // 根据需要进行其他操作，例如验证宽度和高度是否符合要求
                            blogImgs.push({ ...file, name: file.name, imgHeight: height, imgWidth: width })
                            setBlogImgs(blogImgs)
                            resolve();
                        };
                        image.onerror = (error) => {
                            reject(error);
                        };
                    };
                    reader.readAsDataURL(file);
                });
            } else {
                message.error('u only can upload picture here')
                return false
            }

        },
        fileList: blogImgs,
    };
    const propsVideo = {
        onRemove: (file) => {
            const index = blogVideo.indexOf(file);
            const newFileList = blogVideo.slice();
            newFileList.splice(index, 1);
            setBlogVideo(newFileList);
        },
        beforeUpload: (file) => {
            const isVideo = file.type?.startsWith('video')
            if (isVideo) {
                console.log("file daozhele", file);
                return new Promise((resolve, reject) => {
                    const video = document.createElement('video');
                    video.preload = 'metadata';
                    video.onloadedmetadata = () => {
                        const width = video.videoWidth;
                        const height = video.videoHeight;
                        // 在这里可以获取到视频的宽度和高度
                        console.log(`视频宽度: ${width}, 视频高度: ${height}`);
                        setVideoSize({ height, width })
                        // 根据需要进行其他操作，例如验证宽度和高度是否符合要求
                        setBlogVideo([{ ...file, name: file.name, videoHeight: height, videoWidth: width }])
                        console.log("blogVideo start", { ...file, name: file.name, videoHeight: height, videoWidth: width });
                        resolve();
                    };
                    video.onerror = (error) => {
                        reject(error);
                    };
                    video.src = URL.createObjectURL(file);
                })
            } else {
                message.error('u only can upload video here')
                return false
            }
        },
        fileList: blogVideo,
    };
    const submitImageToFirebase = ({ file }) => {
        setUploading(true)
        if (file) {
            const storageRef = ref(storage, `blog-Images-${parseInt((new Date().getTime() / 1000).toString())}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("first", blogImgs);
                const handledBlogImgs = blogImgs.map(item => {
                    if (item.uid === file.uid) {
                        return { ...item, status: 'uploading', percent: progress }
                    }
                    return item
                })
                console.log("handledBlogImgs", handledBlogImgs);
                setBlogImgs(handledBlogImgs)
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
                    blogImgs.map(item => {
                        if (item.uid === file.uid) {
                            return { ...item, status: 'error' }
                        }
                        return item
                    })
                    setBlogImgs(blogImgs)
                    setUploading(false)
                },
                () => {
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const handledBlogImgs = blogImgs.map(item => {
                            if (item.uid === file.uid) {
                                return { ...item, status: 'done', url: downloadURL, thumbUrl: downloadURL, name: file.name }
                            }
                            return item
                        })
                        console.log('handledBlogImgs', handledBlogImgs);
                        setBlogImgs(handledBlogImgs)
                    });
                    setUploading(false)
                }
            );
        } else {
            message.err('Some error happens')
            blogImgs.map(item => {
                if (item.uid === file.uid) {
                    return item = { ...item, status: 'error' }
                }
                return item
            })
            setBlogImgs(blogImgs)
            setUploading(false)
        }
    }
    const submitVideoToFirebase = ({ file }) => {
        setUploading(true)
        if (file) {
            const storageRef = ref(storage, `Tutorial-Video-${parseInt((new Date().getTime() / 1000).toString())}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setBlogVideo([{ ...blogVideo[0], status: 'uploading', percent: progress }])
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
                    message.err('Some error happens')
                    setBlogVideo([{ ...blogVideo[0], status: 'error' }])
                    setUploading(false)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('over:', blogVideo);
                        setBlogVideo([{ ...blogVideo[0], status: 'done', url: downloadURL, thumbUrl: downloadURL, name: file.name }])
                    });
                    setUploading(false)
                }
            );
        } else {
            message.err('Some error happens')
            setBlogVideo([{ ...blogVideo[0], status: 'error' }])
            setUploading(false)
        }
    }
    const onFinish = async (items) => {
        let handledItems
        if (blogType) {
            console.log(blogType);
            if (blogType === 'picture') {
                const imgUrl = blogImgs.map(item => item.url)
                handledItems = { ...items, imgUrl, width: blogImgs[0].imgWidth, height: blogImgs[0].imgHeight }
            } else if (blogType === 'video') {
                console.log("videoSize", videoSize);
                const videoUrl = blogVideo[0].url
                const { height, width } = videoSize
                handledItems = { ...items, videoUrl, height, width }
            } else {
                message.error('system error')
                return
            }
        }
        try {
            console.log("handledItems", handledItems);
            await postblog(handledItems)
            message.success('post blog successfully')
            clear()
            updateData()
            setUploadBlogOpen(false)
        } catch (error) {
            console.log(error);
            message.error('error')
        }
    }
    const onFinishFailed = (errorInfo) => { message.error('Failed:', errorInfo) }
    const clear = () => {
        formRef.current?.resetFields()
        setBlogImgs([])
        setBlogVideo([])
    };
    const lightpostBox = currentTheme === 'light' ? 'postBox-light' : ''
    return (
        <div className='postBlog'>
            <CardTitle title={'Post your blog'} />
            <div className={`postBox ${lightpostBox}`}>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ width: '100%' }} onFinish={onFinish} ref={formRef} onFinishFailed={onFinishFailed}>
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="content" label="Content" rules={[{ required: true }]}><TextArea rows={3} /></Form.Item>
                    <Form.Item name="tags" label="Tags" rules={[{ required: true }]}><Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode" options={options} /></Form.Item>
                    <Form.Item name="blogType" label="Type" rules={[{ required: true }]}>
                        <Radio.Group optionType="button" defaultValue={'text'} onChange={({ target: { value } }) => setBlogType(value)}><Radio value="text"> Text </Radio><Radio value="picture"> Picture </Radio><Radio value="video"> Video </Radio></Radio.Group>
                    </Form.Item>
                    {blogType === 'picture' && <Form.Item label="Picture" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload name="image" listType="picture" customRequest={submitImageToFirebase} maxCount={9} {...propsImage}>
                            <Button icon={<UploadOutlined />}>Click to upload(max: 9)</Button>
                        </Upload>
                    </Form.Item>}
                    {blogType === 'video' && <Form.Item label="Video" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload name="video" customRequest={submitVideoToFirebase} maxCount={1} {...propsVideo}>
                            <Button icon={<UploadOutlined />}>Click to upload(max: 1)</Button>
                        </Upload>
                    </Form.Item>}
                    <Form.Item wrapperCol={{ offset: 6, span: 14 }}><Button type="primary" htmlType="submit" disabled={uploading ? true : false}>Submit</Button></Form.Item>
                </Form>
            </div>
        </div >
    )
}

