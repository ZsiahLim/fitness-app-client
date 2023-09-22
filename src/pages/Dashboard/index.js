
import { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar'
import { ConfigProvider, theme } from 'antd';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import './index.less';
import { ThemeProvider, createTheme } from '@mui/material';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';


function Dashboard() {
    const { currentUser, currentTheme } = useSelector((state) => state.user)
    const darkTheme = createTheme({ palette: { mode: 'dark', }, });
    const navigateTo = useNavigate()
    const lightAppClassname = currentTheme === 'light' ? 'App-light' : ''
    const lightDashboardClassname = currentTheme === 'light' ? 'myDashboard-light' : ''
    // const { pathname } = useLocation()
    useEffect(() => {
        !currentUser && navigateTo('/login')
    }, [])
    // useEffect(() => {
    //     pathname === '/' && navigateTo('/home')
    // }, [pathname])

    return (
        <ConfigProvider locale={zhCN} theme={currentTheme === 'dark' ? { algorithm: theme.darkAlgorithm, } : { algorithm: theme.defaultAlgorithm, }}>
            <ThemeProvider theme={currentTheme === 'dark' && darkTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className={`App ${lightAppClassname}`}>
                        <div className={`myDashboard ${lightDashboardClassname}`}>
                            <Sidebar />
                            <Outlet />
                        </div>
                    </div>
                </LocalizationProvider>
            </ThemeProvider>
        </ConfigProvider>
    );
}

export default Dashboard;
