import './index.less';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Sidebar from './sidebar';
import ChatBox from './chatBox';

function ChatPage(props) {
    const { theme, name } = props
    const [today, setToday] = useState(dayjs('2023-05-21'));
    const contendBoxRightDashboardClassname = theme === 'light' ? 'contendBox-right-light' : ''
    return (
        <div className='chat-contentBox'>
            <div className='chat-sidebar'>
                <Sidebar />
            </div>
            <div className={`chat-chatBox ${contendBoxRightDashboardClassname}`}>
                <ChatBox />
            </div>
        </div>
    );
}

export default ChatPage;
