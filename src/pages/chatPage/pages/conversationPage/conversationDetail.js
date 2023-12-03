import { EllipsisOutlined, FileImageOutlined, LeftOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from 'react'
import Message from '../../Components/message';
import { Button, Dropdown, Input, Modal, Progress, Upload, message } from 'antd';
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { deleteconversation, getcurrentconversationmessages, getspecificconversation, getuser, sendmessage } from '../../../../api/user.api';
import { useLocation, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../../firebase";
const { TextArea } = Input;
const { confirm } = Modal;

export default function ConversationDetail() {
    const navigateTo = useNavigate()
    const location = useLocation()
    const searchInput = useRef(null)
    const { currentUser } = useSelector((state) => state.user)
    const scrollerRef = useRef(null)
    const [currentConversationMessages, setCurrentConversationMessages] = useState([])
    const [textSend, setTextSend] = useState()
    const [arrivalMessage, setArrivalMessage] = useState()

    const socket = useRef(null)
    const handleArrivalMessage = (mes) => {
        const newMessage = {
            sender: mes.senderId,
            msgValue: mes.text,
            msgType: 'text',
            createdAt: Date.now()
        }
        setArrivalMessage(newMessage)
    }
    useEffect(() => {
        socket.current = io("ws://medal.onrender.com")
        socket.current.emit("addUser", currentUser._id)
        socket.current.on("getUsers", users => {
            console.log("users", users);
        })
        socket.current.on("welcome", (data) => {
            console.log("welcome", data);
        })
        socket.current.on("getMessage", (mes) => {
            handleArrivalMessage(mes)
        })
    }, [])

    const handleDeleteConversation = async () => {
        await deleteconversation(location.pathname.split('/')[4]).then(res => {
            navigateTo('/chat/conversations')
        }).catch(() => {
            message.error('error')
        })
    }
    const sendMessage = async (type, value, width, height) => {
        const conversationID = location.pathname.split('/')[4]
        try {
            if (value) {
                socket.current.emit('sendMessage', { msgType: type, senderId: currentUser._id, receiverId: contact._id, msgValue: value, msgHeight: height ? height : null, msgWidth: width ? width : null })
                await sendmessage({ msgType: type, conversationId: conversationID, receiver: contact._id, msgValue: value, msgHeight: height ? height : null, msgWidth: width ? width : null })
                message.success('send successfully')
                destroyAll()
                setTextSend('')
            } else {
                message.error('cannot send empty message')
            }
        } catch (error) {
            message.error('Failed to send your messages')
        }
    }
    const handleEnter = (event) => {
        event.keyCode === 13 && sendMessage('text', textSend)
    }

    const [contact, setContact] = useState()
    useEffect(() => {
        if (location.pathname.split('/')[3] === "specific" && location.pathname.split('/')[4]) {
            const conversationID = location.pathname.split('/')[4]
            const getContactInfo = async () => {
                const conversation = await getspecificconversation(conversationID)
                const contactIndex = conversation.members.indexOf(currentUser._id) === 1 ? 0 : 1
                const contactID = conversation.members[contactIndex]
                const contact = await getuser(contactID)
                setContact(contact)
            }
            getContactInfo()
            const getMessages = async () => {
                try {
                    const res = await getcurrentconversationmessages(conversationID)
                    setCurrentConversationMessages(res)
                } catch (error) {
                    message.error('Failed to get your messages')
                }
            }
            getMessages()
        }

    }, [location])

    useEffect(() => {
        if (arrivalMessage) {
            setCurrentConversationMessages((prev) => [...prev, arrivalMessage])
        }
    }, [setArrivalMessage, arrivalMessage])

    useEffect(() => {
        scrollerRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [currentConversationMessages])

    const deleteBtn = [
        {
            key: '4',
            danger: true,
            label: (
                <div onClick={() =>
                    handleDeleteConversation()
                }>
                    Delete
                </div>
            ),
        },
    ];
    const [msgImg, setMsgImg] = useState([])
    const [msgVideo, setMsgVideo] = useState([])
    const propsImage = {
        onRemove: (file) => {
            const index = msgImg.indexOf(file);
            const newFileList = msgImg.slice();
            newFileList.splice(index, 1);
            setMsgImg(newFileList);
        },
        beforeUpload: async (file) => {
            const isImage = file.type?.startsWith('image')
            if (isImage) {
                await new Promise((resolve, reject) => {
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
                            // return { ...file, name: file.name, imgHeight: height, imgWidth: width }
                            msgImg.push({ ...file, name: file.name, imgHeight: height, imgWidth: width })
                            setMsgImg(msgImg)
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
        fileList: msgImg,
    };
    const submitImageToFirebase = ({ file }) => {
        showConfirm()
        setUploading(true)
        if (file) {
            const storageRef = ref(storage, `Message-${parseInt((new Date().getTime() / 1000).toString())}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress)
                console.log('file', file);
                const handledBlogImgs = msgImg.map(item => {
                    if (item.uid === file.uid) {
                        return { ...item, status: 'uploading', percent: progress }
                    }
                    return item
                })
                setMsgImg(handledBlogImgs)
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
                    setMsgImg([])
                    setUploading(false)
                    destroyAll()
                },
                () => {
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const handledBlogImgs = msgImg.map(item => {
                            if (item.uid === file.uid) {
                                return { ...item, status: 'done', url: downloadURL, thumbUrl: downloadURL, name: file.name }
                            }
                            return item
                        })
                        console.log('handledBlogImgs', handledBlogImgs);
                        setMsgImg([])
                        sendMessage('image', downloadURL, handledBlogImgs[0].imgWidth, handledBlogImgs[0].imgHeight)
                    });
                    setUploading(false)
                }
            );
        } else {
            message.err('Some error happens')
            setMsgImg([])
            setUploading(false)
            destroyAll()
        }
    }

    const propsVideo = {
        onRemove: (file) => {
            const index = msgVideo.indexOf(file);
            const newFileList = msgVideo.slice();
            newFileList.splice(index, 1);
            setMsgVideo(newFileList);
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
                        // setVideoSize({ height, width })
                        // 根据需要进行其他操作，例如验证宽度和高度是否符合要求
                        msgVideo.push({ ...file, name: file.name, videoHeight: height, videoWidth: width })
                        setMsgVideo(msgVideo)
                        console.log("blogVideo start", msgVideo);
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
        fileList: msgVideo,
    };
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)

    const submitVideoToFirebase = ({ file }) => {
        setUploading(true)
        if (file) {
            const storageRef = ref(storage, `Message-${parseInt((new Date().getTime() / 1000).toString())}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    console.log("msgVideo", msgVideo);
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setMsgVideo([{ ...msgVideo[0], status: 'uploading', percent: progress }])
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
                    setMsgVideo([{ ...msgVideo[0], status: 'error' }])
                    setUploading(false)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('over:', msgVideo);
                        setMsgVideo([{ ...msgVideo[0], status: 'done', url: downloadURL, thumbUrl: downloadURL, name: file.name }])
                        sendMessage('video', downloadURL, msgVideo[0].videoWidth, msgVideo[0].videoHeight)
                    });
                    setUploading(false)
                }
            );
        } else {
            message.err('Some error happens')
            setMsgVideo([{ ...msgVideo[0], status: 'error' }])
            setUploading(false)
        }
    }
    const showConfirm = () => {
        confirm({
            title: 'Sending',
            content: <Progress percent={progress} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />,
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const destroyAll = () => {
        Modal.destroyAll();
    };
    const moreBtn = [
        {
            key: 'helos',
            label: <Upload customRequest={submitImageToFirebase} maxCount={1} {...propsImage}>Picture</Upload>,
            icon: <FileImageOutlined />,
        },
        {
            key: 'video',
            label: <Upload customRequest={submitVideoToFirebase} maxCount={1} {...propsVideo}>Video</Upload>,
            icon: <FileImageOutlined />
        }
    ];
    const getMessages = async () => {
        try {
            const conversationID = location.pathname.split('/')[4]
            const res = await getcurrentconversationmessages(conversationID)
            setCurrentConversationMessages(res)
        } catch (error) {
            message.error('Failed to get your messages')
        }
    }
    useEffect(() => {
        getMessages()
        console.log('zhelime');
    }, [textSend])

    return (
        <>
            <div className="chat-contentBox-rightBar-header">
                <div className="chat-contentBox-rightBar-header-left"><LeftOutlined style={{ fontSize: 24, marginRight: 10 }} onClick={() => navigateTo('/chat/conversations')} /><div onClick={() => navigateTo(`/chat/contacts/detail/${contact._id}`)}>{contact?.name}</div></div>
                <Dropdown key={'lei'} menu={{ items: deleteBtn }}>
                    <EllipsisOutlined style={{ fontSize: 24, cursor: "pointer" }} />
                </Dropdown>
            </div>
            <div className="chat-contentBox-rightBar-mainContent">
                {(currentConversationMessages) ?
                    (currentConversationMessages.map((message) => <div className="chat-contentBox-rightBar-mainContent-messageRow" key={message._id} ref={scrollerRef}>
                        <Message message={message} sender={message.sender} key={message._id} createdAt={message.createdAt} msgValue={message.msgValue} msgType={message.msgType} owner={message.sender === currentUser._id} contact={contact} />
                    </div>)) :
                    (<></>)}
            </div>
            <div className="chat-contentBox-rightBar-footer">
                <>
                    <div className="chat-contentBox-rightBar-footer-moreBtn">
                        <Dropdown
                            key={20}
                            menu={{ items: moreBtn }}
                            trigger={['click']}

                        >
                            <PlusCircleOutlined />
                        </Dropdown>
                    </div>
                    <TextArea value={textSend} bordered={false} ref={searchInput} autoSize={{ minRows: 1, maxRows: 6, }} allowClear placeholder='Type something...' onKeyDown={(e) => handleEnter(e)} onChange={({ target: { value } }) => setTextSend(value)} />
                    <div className='chat-sendPart'>
                        <Button onClick={() => sendMessage('text', textSend)}>Send</Button>
                    </div>
                </>
            </div>
        </>
    )
}

