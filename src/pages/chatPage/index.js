import './index.less';
import { useEffect, useState } from 'react';
import Sidebar from './Components/sidebar';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function ChatPage() {
    const { currentTheme } = useSelector((state) => state.user)
    const [selectPage, setSelectPage] = useState('chat');
    const chatChatBoxClassname = currentTheme === 'light' ? 'chat-chatBox-light' : ''
    // const { pathname } = useLocation()
    // const navigateTo = useNavigate()
    // useEffect(() => {
    //     console.log("pathname", pathname);
    //     pathname === '/chat' && navigateTo('conversations')
    // }, [pathname])
    return (
        <div className='chat-contentBox'>
            <div className='chat-sidebar'>
                <Sidebar changeSelectPage={setSelectPage} />
            </div>
            <div className={`chat-chatBox ${chatChatBoxClassname}`}>
                <Outlet />
                {/* {selectPage === 'chat' && <ChatBox />}
                {selectPage === 'contact' && <ContactPage setSelectPage={setSelectPage} />}
                {selectPage === 'favorites' && <FavoritesPage />} */}
            </div>
        </div>
    );
}

export default ChatPage;
