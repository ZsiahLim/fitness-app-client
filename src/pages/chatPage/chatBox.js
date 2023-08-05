import React, { useEffect, useRef, useState } from 'react'
import Message from './Components/message';
import axios from 'axios';
import {
    EllipsisOutlined,
} from '@ant-design/icons';
import { Button, message, Popover } from 'antd';
import Conversation from './Components/conversation';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Header from './Components/header';
import { io } from 'socket.io-client'
export default function ChatBox() {
    const searchInput = useRef(null)
    const { currentUser } = useSelector((state) => state.user)
    const { theme } = useParams()
    const scrollerRef = useRef(null)
    const lightchatContact = theme === 'light' ? 'chat-contact-light' : ''
    const [conversation, setConversation] = useState([])
    const [currentConversation, setCurrentConversation] = useState()
    const [currentConversationMessages, setCurrentConversationMessages] = useState([])
    const [textSend, setTextSend] = useState()
    const [arrivalMessage, setArrivalMessage] = useState()

    const socket = useRef(null)
    const handleArrivalMessage = (mes) => {
        const newMessage = {
            sender: mes.senderId,
            text: mes.text,
            createdAt: Date.now()
        }
        setArrivalMessage(newMessage)
        console.log('message reiceived', newMessage);
    }
    useEffect(() => {
        socket.current = io("ws://localhost:3001")
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

    const handleDeleteConversation = async (con) => {
        try {
            await axios.delete(`http://localhost:3001/api/conversations/${con._id}`)
            message.success('conversation has been deleted')
            setConversation(conversation.filter(e => e._id !== con._id))
        } catch (error) {
            console.log(error);
            message.error('error')
        }
    }

    const sendMessage = async () => {
        try {
            if (textSend) {
                const receiverId = currentConversation.members.find(member => member !== currentUser._id)
                console.log('receiverId', receiverId);
                socket.current.emit('sendMessage', { senderId: currentUser._id, receiverId, text: textSend })
                await axios.post(`http://localhost:3001/api/messages`, {
                    conversationId: currentConversation._id,
                    text: textSend
                }, { withCredentials: true })
                if (searchInput.current) searchInput.current.value = ''
                message.success('send successfully')
                setTextSend('')
            } else {
                message.error('cannot send empty message')
            }

        } catch (error) {
            message.error('Failed to send your messages')
        }
    }
    const handleEnter = (event) => {
        event.keyCode === 13 && sendMessage()
    }
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/conversations', { withCredentials: true })
                setConversation(res.data)
                console.log('conversations', res.data);
            } catch (error) {
                message.error('Failed to get your conversation')
            }
        }
        getConversations()
    }, [])
    useEffect(() => {
        if (currentConversation) {
            const getMessages = async () => {
                try {
                    const res = await axios.get(`http://localhost:3001/api/messages/${currentConversation._id}`, { withCredentials: true })
                    setCurrentConversationMessages(res.data)
                } catch (error) {
                    message.error('Failed to get your messages')
                }
            }
            getMessages()
        }
        console.log("currentConversation", currentConversation);
    }, [currentConversation, textSend])

    useEffect(() => {
        console.log("currentConversation", currentConversation, "arrivalMessage", arrivalMessage);
        if (
            arrivalMessage &&
            currentConversation &&
            currentConversation.members.includes(arrivalMessage.sender)
        ) {
            setCurrentConversationMessages((prev) => [...prev, arrivalMessage])
        }
    }, [setArrivalMessage, arrivalMessage])

    useEffect(() => {
        console.log("arrivalMessage", arrivalMessage);
    }, [setArrivalMessage])

    useEffect(() => {
        scrollerRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [currentConversationMessages])
    return (
        <>
            <div className={`chat-contact ${lightchatContact}`}>
                <div className='chat-contact-header'>
                    <Header />
                </div>
                <div className='conversations'>
                    {conversation.map((conversation) => <div key={conversation._id} onClick={() => setCurrentConversation(conversation)}> <Conversation selected={currentConversation?._id === conversation._id} conversation={conversation} currentUserId={currentUser._id} /></div>)}
                </div>
            </div>
            <div className='RightContent'>
                <div className='chatInfo'>
                    {currentConversation && (<><div className='ChatUserName'>{ }</div>
                        <div className='chat-icons'><Popover content={<div><Button onClick={() => handleDeleteConversation(currentConversation)}>delete</Button></div>} trigger="click">
                            <EllipsisOutlined />
                        </Popover></div></>)}
                </div>
                <div className='chat-messages'>
                    {(currentConversation && currentConversationMessages) ?
                        (currentConversationMessages.map((message) => <div key={message._id} ref={scrollerRef}>
                            <Message sender={message.sender} key={message._id} createdAt={message.createdAt} text={message.text} owner={message.sender === currentUser._id} />
                        </div>)) :
                        (<></>)}
                </div>
                <div className='chat-sendInput'>
                    {currentConversation && <><input ref={searchInput} type='text' placeholder='Type something...' onKeyDown={(e) => handleEnter(e)} onChange={({ target: { value } }) => setTextSend(value)} />
                        <div className='chat-sendPart'>
                            {/* <input type="file"></input> */}
                            <Button onClick={sendMessage}>Send</Button>
                        </div></>}
                </div >
            </div>

        </>
    )
}
