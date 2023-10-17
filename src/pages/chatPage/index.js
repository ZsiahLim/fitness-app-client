import './index.less';
import { useState } from 'react';
import Sidebar from './Components/sidebar';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ContactsTwoTone, MessageTwoTone, StarTwoTone } from '@ant-design/icons';
import { Badge } from 'antd';
import Conversation from './Components/ConversationsList/conversation';
import Conversations from './Components/ConversationsList';
import ContactsList from './Components/ContactsList';

function ChatPage() {
    const { currentTheme } = useSelector((state) => state.user)
    const [selectPage, setSelectPage] = useState('chat');
    const lightContentBoxClassname = currentTheme === 'light' ? 'chat-contentBox-light' : ''
    return (
        <div className={`chat-contentBox ${lightContentBoxClassname}`}>
            {/* <div className='chat-sidebar'>
                <Sidebar changeSelectPage={setSelectPage} />
            </div> */}
            {/* <div className={`chat-chatBox ${chatChatBoxClassname}`}>
                {/* <Outlet />         </div> */}

            {/* <div className={`chat-contact ${lightchatContact}`}>
                <div className='chat-contact-header'>
                    <Header />
                </div>
                <div className='conversations'>
                    {conversation.map((conversation) => <div key={conversation._id} onClick={() => setCurrentConversation(conversation)}> <Conversation selected={currentConversation?._id === conversation._id} conversation={conversation} currentUserId={currentUser._id} /></div>)}
                </div>
            </div >
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
                            <Button onClick={sendMessage}>Send</Button>
                        </div></>}
                </div >
            </div> */}
            {/* <div className="chat-contentBox-leftBar">
                <div className="chat-contentBox-leftBar-header">
                    Chats
                </div>
                <div className="chat-contentBox-leftBar-mainContent">
                    {selectPage === 'conversations' && <Conversations />}
                    {selectPage === 'contacts' && <ContactsList />}
                </div>
                <div className="chat-contentBox-leftBar-footNavigationBar">
                    <div className={`navigation ${lightnavigation}`}
                        style={{
                            backgroundColor: selectPage === 'conversations' ? `${currentTheme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => setSelectPage('conversations')}
                    >
                        <Badge size="small" count={1}>
                            <MessageTwoTone
                                className='navigationCenteredItem'
                                twoToneColor={selectPage === 'conversations' ? '#4e8df5' : "#3d3d3d"}
                                style={{ fontSize: 18 }}
                            />
                        </Badge>
                    </div>
                    <div className={`navigation ${lightnavigation}`}
                        style={{
                            backgroundColor: selectPage === 'contacts' ? `${currentTheme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => setSelectPage('contacts')}
                    >
                        <ContactsTwoTone
                            className='navigationCenteredItem'
                            twoToneColor={selectPage === 'contacts' ? '#4e8df5' : "#3d3d3d"}
                            style={{ fontSize: 18 }}
                        />
                    </div>
                    <div className={`navigation ${lightnavigation}`}
                        style={{
                            backgroundColor: selectPage === 'favorites' ? `${currentTheme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => setSelectPage('favorites')}
                    >
                        <StarTwoTone
                            className='navigationCenteredItem'
                            twoToneColor={selectPage === 'favorites' ? '#4e8df5' : "#3d3d3d"}
                            style={{ fontSize: 18 }}
                        />
                    </div>
                </div>
            </div>
            <div className="chat-contentBox-rightBar">

            </div> */}
            <Outlet />
        </div >
    );
}

export default ChatPage;
