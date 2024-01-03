import { Button, Form, Input, Select, message, Upload, Radio } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { storage } from '../../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from 'react-redux'
import CardTitle from '../../../components/CardTitle'
import { postblog } from '../../../api/user.api';
import { useIntl } from 'react-intl';

const { TextArea } = Input;
const normFile = (e) => { return Array.isArray(e) ? e : e?.fileList }
const options = (formatMessage) => [{ value: 'fit', label: formatMessage({id: 'app.blog.label.tag.fit'}) }, { value: 'eat', label: formatMessage({id: 'app.blog.label.tag.eat'}) }, { value: 'daily life', label: formatMessage({id: 'app.blog.label.tag.dailyLife'}) }];
export default function PostBlog({ updateData, setUploadBlogOpen }) {
    const intl = useIntl()
    const formRef = React.useRef(null)
    const { currentTheme } = useSelector((state) => state.user)
    const [uploading, setUploading] = useState(false)
    const [blogType, setBlogType] = useState('text')
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
            console.log("file", file);
            const isImage = file.type?.startsWith('image')
            if (isImage) {
                const isSupportedImageType = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type);
                if (!isSupportedImageType) {
                    message.error(intl.formatMessage({id: 'error.blog.wrongFormat'}));
                    return false; // 阻止上传
                } else {
                    // 其他图片处理逻辑...
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
                                message.error(intl.formatMessage({id: 'error.blog.noSupportImg'}))
                                console.log("error", error)
                                reject(error);
                            };
                        };
                        reader.readAsDataURL(file);
                    });
                }
            } else {
                message.error(intl.formatMessage({id: 'error.blog.wrongFile'}))
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
                message.error(intl.formatMessage({id: 'error.blog.wrongFile.video'}))
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
                    message.err(intl.formatMessage({id: 'error.errorHappens'}))
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
                        console.log("downloadURL", downloadURL);
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
            message.err(intl.formatMessage({id: 'error.errorHappens'}))
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
                    message.err(intl.formatMessage({id: 'error.errorHappens'}))
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
            message.err(intl.formatMessage({id: 'error.errorHappens'}))
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
            } else if (blogType === 'text') {
                handledItems = { ...items }
            } else {
                message.error(intl.formatMessage({id: 'error.systemError'}))
                return
            }
        }
        try {
            console.log("handledItems", handledItems);
            await postblog(handledItems)
            message.success(intl.formatMessage({id: 'app.blog.msg.postBlog'}))
            clear()
            updateData()
            setUploadBlogOpen(false)
        } catch (error) {
            console.log(error);
            message.error(intl.formatMessage({id: 'error.default'}))
        }
    }
    const onFinishFailed = (errorInfo) => { message.error(intl.formatMessage({id: 'error.failedTo'}), errorInfo) }
    const clear = () => {
        formRef.current?.resetFields()
        setBlogType('text')
        setBlogImgs([])
        setBlogVideo([])
    };
    const lightpostBox = currentTheme === 'light' ? 'postBox-light' : ''
    return (
        <div className='postBlog'>
            <CardTitle title={intl.formatMessage({id: 'app.blog.title.post'})} />
            <div className={`postBox ${lightpostBox}`}>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ width: '100%' }} onFinish={onFinish} ref={formRef} onFinishFailed={onFinishFailed}>
                    <Form.Item name="title" label={intl.formatMessage({id: 'app.blog.label.title'})} rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="content" label={intl.formatMessage({id: 'app.blog.label.content'})} rules={[{ required: true }]}><TextArea rows={3} /></Form.Item>
                    <Form.Item name="tags" label={intl.formatMessage({id: 'app.blog.label.tag'})} rules={[{ required: true }]}><Select mode="tags" style={{ width: '100%' }} placeholder={intl.formatMessage({id: 'app.blog.label.tag.tagMode'})} options={options(intl.formatMessage)} /></Form.Item>
                    <Form.Item name="blogType" label={intl.formatMessage({id: 'app.blog.label.type'})} rules={[{ required: true }]}>
                        <Radio.Group optionType="button" defaultValue={'text'} onChange={({ target: { value } }) => setBlogType(value)}><Radio value="text"> {intl.formatMessage({id: 'app.blog.label.type.text'})} </Radio><Radio value="picture"> {intl.formatMessage({id: 'app.blog.label.type.pic'})} </Radio><Radio value="video"> {intl.formatMessage({id: 'app.blog.label.type.video'})} </Radio></Radio.Group>
                    </Form.Item>
                    {blogType === 'picture' && <Form.Item label={intl.formatMessage({id: 'app.blog.label.pic'})} valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload name="image" listType="picture" customRequest={submitImageToFirebase} maxCount={9} {...propsImage}>
                            <Button icon={<UploadOutlined />}>{intl.formatMessage({id: 'btn.clickToUploadPic'})}</Button>
                        </Upload>
                    </Form.Item>}
                    {blogType === 'video' && <Form.Item label={intl.formatMessage({id: 'app.blog.label.vid'})} valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload name="video" customRequest={submitVideoToFirebase} maxCount={1} {...propsVideo}>
                            <Button icon={<UploadOutlined />}>{intl.formatMessage({id: 'btn.clickToUploadVid'})}</Button>
                        </Upload>
                    </Form.Item>}
                    <Form.Item wrapperCol={{ offset: 6, span: 14 }}><Button type="primary" htmlType="submit" disabled={uploading ? true : false}>{intl.formatMessage({id: 'btn.post'})}</Button></Form.Item>
                </Form>
            </div>
        </div >
    )
}

