import './index.less';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Sidebar from './Components/sidebar';
import ChatBox from './chatBox';
import { useParams } from 'react-router-dom';
import ContactPage from './contactPage';
import FavoritesPage from './favoritesPage';

function ChatPage() {
    let { theme } = useParams()
    const [selectPage, setSelectPage] = useState('chat');
    const [today, setToday] = useState(dayjs('2023-05-21'));
    const chatChatBoxClassname = theme === 'light' ? 'chat-chatBox-light' : ''
    return (
        <div className='chat-contentBox'>
            <div className='chat-sidebar'>
                <Sidebar theme={theme} changeSelectPage={setSelectPage} />
            </div>
            <div className={`chat-chatBox ${chatChatBoxClassname}`}>
                {selectPage === 'chat' && <ChatBox />}
                {selectPage === 'contact' && <ContactPage setSelectPage={setSelectPage} />}
                {selectPage === 'favorites' && <FavoritesPage />}
            </div>
        </div>
    );
}

export default ChatPage;
