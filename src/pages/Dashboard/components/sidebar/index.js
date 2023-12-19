import React, { useState, useRef, useEffect } from 'react'
import { VideoCameraTwoTone, HomeTwoTone, MessageTwoTone, CalendarTwoTone, IdcardTwoTone, SoundTwoTone, UserOutlined, FileTextTwoTone } from '@ant-design/icons';
import { Avatar, Popover, Switch, Button, message, Popconfirm } from 'antd';
import './index.less'
import { useSelector } from 'react-redux'
import { logout, setTheme } from '../../../../redux/userSlice';
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import noGenderPath from '../../../../Pic/noGender.jpg'
import { useIntl } from 'react-intl';
import useUserTheme from '../../../../hooks/useUserTheme';
import APPTHEME from '../../../../constants/COLORS/APPTHEME';
import ICON from '../../../../Pic/targetIcon.png'

export default function Sidebar() {
    const currentTheme = useUserTheme()
    const THEME = APPTHEME[currentTheme]
    const { currentUser } = useSelector((state) => state.user)
    const { formatMessage } = useIntl()
    const dispatch = useDispatch()
    const avator = () => currentUser.avator ? currentUser.avator : noGenderPath
    const [clicked, setClicked] = useState(false);
    const [navShrink, setNavShrink] = useState()
    const navigateTo = useNavigate()
    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
    const navRef = useRef(null);
    const handleResize = () => { navRef.current && setNavShrink(navRef.current.offsetWidth < 90) }
    const handleClickChange = (open) => {
        setClicked(open);
    };
    const Logout = () => {
        dispatch(logout())
        message.success('Logout successfully!');
        navigateTo('/login')
    }
    const lightnavigation = currentTheme === 'light' ? 'navigation-light' : ''
    const location = useLocation()
    const [selecetedNavItem, setSelectedNavItem] = useState(location.pathname.split('/')[1])
    useEffect(() => {
        console.log(location.pathname.split('/')[1]);
        setSelectedNavItem(location.pathname.split('/')[1])
    }, [location])
    const navObjs = [
        { value: 'home', icon: () => <HomeTwoTone className={navShrink ? 'navigationCenteredItem' : 'navigationItem'} twoToneColor={selecetedNavItem === 'home' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} /> },
        { value: 'chat', icon: () => <MessageTwoTone className={navShrink ? 'navigationCenteredItem' : 'navigationItem'} twoToneColor={selecetedNavItem === 'chat' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} /> },
        { value: 'calender', icon: () => <CalendarTwoTone className={navShrink ? 'navigationCenteredItem' : 'navigationItem'} twoToneColor={selecetedNavItem === 'calender' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} /> },
        { value: 'tutorial', icon: () => <VideoCameraTwoTone className={navShrink ? 'navigationCenteredItem' : 'navigationItem'} twoToneColor={selecetedNavItem === 'tutorial' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} /> },
        { value: 'blog', icon: () => <SoundTwoTone className={navShrink ? 'navigationCenteredItem' : 'navigationItem'} twoToneColor={selecetedNavItem === 'blog' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} /> },
        { value: 'statistics', icon: () => <FileTextTwoTone className={navShrink ? 'navigationCenteredItem' : 'navigationItem'} twoToneColor={selecetedNavItem === 'statistics' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} /> },
        { value: 'profile', icon: () => <IdcardTwoTone className={navShrink ? 'navigationCenteredItem' : 'navigationItem'} twoToneColor={selecetedNavItem === 'profile' ? '#4e8df5' : "#3d3d3d"} style={{ fontSize: 18 }} /> },
    ]
    const navigationItem = (value, Icon) => {
        return <div key={value} className={`navigation ${lightnavigation}`} ref={navRef} onClick={() => navigateTo(`/${value}`)}>
            <Icon />
        </div>
    }
    return (
        <div className={`sidebar`} style={{ backgroundColor: THEME.contentColor }}>
            <div className='content'>
                <div className='logo' style={{ cursor: 'pointer' }} onClick={() => navigateTo('/')}>
                    <div className='logoPic' style={{ marginBottom: 10, width: 40, height: 40 }}>
                        <img style={{ maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'cover' }} src={ICON} />
                    </div>
                    Target
                </div>
                <div className='navigationBar'>
                    {navObjs.map(nav => navigationItem(nav.value, nav.icon))}
                </div >
                <div className='avator'>
                    <Popover
                        content={
                            <div>
                                {formatMessage({ id: 'app.dashboard.lightmode' })} &nbsp;
                                {currentTheme === 'light' ? <Switch defaultChecked onChange={(checked) => dispatch(setTheme(checked ? 'light' : 'dark'))}></Switch>
                                    : <Switch onChange={(checked) => dispatch(setTheme(checked ? 'light' : 'dark'))}></Switch>}
                                <br />
                                <Popconfirm
                                    title="Attention"
                                    description="Are you sure to logout?"
                                    onConfirm={Logout}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button style={{ marginTop: 5 }} size='small' type="primary" danger>
                                        {formatMessage({ id: 'app.dashboard.logout' })}
                                    </Button>
                                </Popconfirm>
                            </div>
                        }
                        placement="rightBottom"
                        title={formatMessage({ id: 'app.dashboard.quickset' })}
                        trigger="click"
                        open={clicked}
                        onOpenChange={handleClickChange}
                    >
                        <Avatar
                            src={avator()}
                            size={{
                                xs: 36,
                                sm: 36,
                                md: 36,
                                lg: 50,
                                xl: 54,
                                xxl: 70,
                            }}
                            icon={<UserOutlined />}
                        />
                    </Popover>
                </div>
            </div >
        </div >
    )
}
