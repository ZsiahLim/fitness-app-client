import './index.less';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Sidebar from './sidebar';
import ChatBox from './chatBox';

function ChatPage(props) {
    const { theme, name } = props
    const [today, setToday] = useState(dayjs('2023-05-21'));
    const chatChatBoxClassname = theme === 'light' ? 'chat-chatBox-light' : ''
    return (
        <div className='chat-contentBox'>
            <div className='chat-sidebar'>
                <Sidebar theme={theme} />
            </div>
            <div className={`chat-chatBox ${chatChatBoxClassname}`}>
                <ChatBox />
            </div>
        </div>
    );
}

export default ChatPage;
