import './index.less';
import { useState } from 'react';
import Sidebar from './Components/sidebar';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function ChatPage() {
    const { currentTheme } = useSelector((state) => state.user)
    const [selectPage, setSelectPage] = useState('chat');
    const chatChatBoxClassname = currentTheme === 'light' ? 'chat-chatBox-light' : ''

    return (
        <div className='chat-contentBox'>
            <div className='chat-sidebar'>
                <Sidebar changeSelectPage={setSelectPage} />
            </div>
            <div className={`chat-chatBox ${chatChatBoxClassname}`}>
                <Outlet />
            </div>
        </div>
    );
}

export default ChatPage;
