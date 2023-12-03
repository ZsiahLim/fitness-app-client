import './index.less';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function ChatPage() {
    const { currentTheme } = useSelector((state) => state.user)
    const lightContentBoxClassname = currentTheme === 'light' ? 'chat-contentBox-light' : ''
    return (
        <div className={`chat-contentBox ${lightContentBoxClassname}`}>
            <Outlet />
        </div >
    );
}

export default ChatPage;
