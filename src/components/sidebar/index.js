import React, { useState, useRef, useEffect } from 'react'
import {
    VideoCameraTwoTone,
    HomeTwoTone,
    MessageTwoTone,
    CalendarTwoTone,
    SettingTwoTone,
    AntDesignOutlined,
    SoundTwoTone
} from '@ant-design/icons';
import { Avatar, Popover, Switch } from 'antd';
import WORDS from '../../constant/words'
import Emoji from 'react-emojis';
import './index.less'
export default function Index(props) {
    const { theme, setPage, setCurrenttheme } = props
    const [clicked, setClicked] = useState(false);
    const [selectPage, setSelectPage] = useState('home');
    const navRef = useRef(null);
    const [navShrink, setNavShrink] = useState()
    useEffect(() => {
        console.log("props", props);
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
    useEffect(() => {
        setPage(selectPage)
    }, [selectPage])
    const handleResize = () => {
        if (navRef.current) {
            console.log(window.innerWidth);
            setNavShrink(navRef.current.offsetWidth < 90);
        }
    }
    const handleClickChange = (open) => {
        setClicked(open);
    };
    const hide = () => {
        setClicked(false);
    };
    const lightsidebar = theme === 'light' ? 'sidebar-light' : ''
    const lightnavigation = theme === 'light' ? 'navigation-light' : ''
    return (
        <div className={`sidebar ${lightsidebar}`}>
            <div className='content'>
                <div className='logo'>
                    <div className='logoPic' style={{ marginBottom: 10 }}>
                        <Emoji emoji="sports-medal" size={30}></Emoji>
                    </div>
                    {WORDS.logoName}
                </div>
                <div className='navigationBar'>
                    <div className={`navigation ${lightnavigation}`} ref={navRef} onClick={() => setSelectPage('home')}>
                        <HomeTwoTone className={navShrink ? 'navigationCenteredItem' : 'navigationItem'} twoToneColor={selectPage === 'home' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} />
                        {!navShrink && <span className='navigationName navigationItem' style={selectPage === 'home' ? { fontWeight: 500, color: "#4e8df5" } : {}}>Home</span>}
                    </div>
                    <div className={`navigation ${lightnavigation}`} onClick={() => setSelectPage('chat')}>
                        <MessageTwoTone className={navShrink ? 'navigationCenteredItem' : 'navigationItem'} twoToneColor={selectPage === 'chat' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} />
                        {!navShrink && <span className='navigationName navigationItem' style={selectPage === 'chat' ? { fontWeight: 500, color: "#4e8df5" } : {}}>Chat</span>}
                    </div>
                    <div className={`navigation ${lightnavigation}`} onClick={() => setSelectPage('calender')}>
                        <CalendarTwoTone className={navShrink ? 'navigationCenteredItem' : 'navigationItem'} twoToneColor={selectPage === 'calender' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} />
                        {!navShrink && <span className='navigationName navigationItem' style={selectPage === 'calender' ? { fontWeight: 500, color: "#4e8df5" } : {}}>Plan</span>}
                    </div>
                    <div className={`navigation ${lightnavigation}`} onClick={() => setSelectPage('tutorial')}>
                        <VideoCameraTwoTone className={navShrink ? 'navigationCenteredItem' : 'navigationItem'} twoToneColor={selectPage === 'tutorial' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} />
                        {!navShrink && <span className='navigationName navigationItem' style={selectPage === 'tutorial' ? { fontWeight: 500, color: "#4e8df5" } : {}}>Tutorial</span>}
                    </div >
                    <div className={`navigation ${lightnavigation}`} onClick={() => setSelectPage('blog')}>
                        <SoundTwoTone className={navShrink ? 'navigationCenteredItem' : 'navigationItem'} twoToneColor={selectPage === 'blog' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} />
                        {!navShrink && <span className='navigationName navigationItem' style={selectPage === 'blog' ? { fontWeight: 500, color: "#4e8df5" } : {}}>Blog</span>}
                    </div >
                    <div className={`navigation ${lightnavigation}`} onClick={() => setSelectPage('setting')}>
                        <SettingTwoTone className={navShrink ? 'navigationCenteredItem' : 'navigationItem'} twoToneColor={selectPage === 'setting' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} />
                        {!navShrink && <span className='navigationName navigationItem' style={selectPage === 'setting' ? { fontWeight: 500, color: "#4e8df5" } : {}}>Setting</span>}
                    </div >
                </div >
                <div className='avator'>
                    <Popover
                        content={
                            <div>
                                Light mode <Switch onChange={(checked) => setCurrenttheme(checked ? 'light' : 'dark')}></Switch>
                                <br /><a onClick={hide}>Close</a>
                            </div>
                        }
                        placement="rightBottom"
                        title="Quick Setting"
                        trigger="click"
                        open={clicked}
                        onOpenChange={handleClickChange}
                        style={{}}
                    >
                        <Avatar
                            size={{
                                xs: 28,
                                sm: 28,
                                md: 36,
                                lg: 50,
                                xl: 54,
                                xxl: 70,
                            }}
                            icon={<AntDesignOutlined />}
                        />
                    </Popover>
                </div>
            </div >
        </div >
    )
}
