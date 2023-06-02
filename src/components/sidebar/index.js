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
import { Avatar, Popover, Switch, Button, message, Popconfirm } from 'antd';
import WORDS from '../../constant/words'
import Emoji from 'react-emojis';
import './index.less'
import { useSelector } from 'react-redux'
import { logout } from '../../redux/userSlice';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import noGenderPath from '../../Pic/noGender.jpg'
import maleAvatorPath from '../../Pic/maleAvator.jpg'
import femaleAvatorPath from '../../Pic/femaleAvator.jpg'
export default function Index(props) {
    const { currentUser } = useSelector((state) => state.user)
    const avator = () => {
        if (currentUser.avator) {
            return currentUser.avator
        } else if (currentUser.gender) {
            return currentUser.gender === 'man' ? maleAvatorPath : femaleAvatorPath
        } else {
            return noGenderPath
        }
    }
    const dispatch = useDispatch()
    const { theme, setPage, setCurrenttheme } = props
    const [clicked, setClicked] = useState(false);
    const [selectPage, setSelectPage] = useState('home');
    const navRef = useRef(null);
    const [navShrink, setNavShrink] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
    useEffect(() => {
        setPage(selectPage)
    }, [selectPage])
    const handleResize = () => {
        if (navRef.current) {
            setNavShrink(navRef.current.offsetWidth < 90);
        }
    }
    const handleClickChange = (open) => {
        setClicked(open);
    };
    const Logout = () => {
        dispatch(logout())
        message.success('Logout successfully!');
        navigate('/')
    }
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
                                Light mode &nbsp;
                                {theme === 'light' ? <Switch defaultChecked onChange={(checked) => setCurrenttheme(checked ? 'light' : 'dark')}></Switch>
                                    : <Switch onChange={(checked) => setCurrenttheme(checked ? 'light' : 'dark')}></Switch>}
                                <br />
                                <Popconfirm
                                    title="Attention"
                                    description="Are you sure to logout?"
                                    onConfirm={Logout}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button style={{ marginTop: 5 }} size='small' type="primary" danger>
                                        Logout
                                    </Button>
                                </Popconfirm>
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
                            src={currentUser.avator}
                            size={{
                                xs: 28,
                                sm: 28,
                                md: 36,
                                lg: 50,
                                xl: 54,
                                xxl: 70,
                            }}
                            icon={<img src={avator()}></img>}
                        />
                    </Popover>
                </div>
            </div >
        </div >
    )
}
