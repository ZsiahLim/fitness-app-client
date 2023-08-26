
import { useEffect, useState } from 'react';

import Sidebar from '../../components/sidebar'
import { ConfigProvider, theme } from 'antd';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux'
import Main from './dashboard'
import ChatPage from '../chatPage';
import { useNavigate } from 'react-router-dom'
import SettingPage from '../settingPage';
import PlanPage from '../planPage';
import CompetitionPage from '../competitionPage';
import BlogPage from '../blogPage';
import TutorialPage from '../tutorialPage'
import { Navigate, RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import './index.less';


function Dashboard() {
    const { currentUser } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [currenttheme, setCurrenttheme] = useState()
    const [currentUserName, setCurrentUserName] = useState()
    const [page, setPage] = useState('home')
    const [today, setToday] = useState(dayjs('2023-05-21'));
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const lightAppClassname = currenttheme === 'light' ? 'App-light' : ''
    const lightDashboardClassname = currenttheme === 'light' ? 'myDashboard-light' : ''
    const contendBoxRightDashboardClassname = currenttheme === 'light' ? 'contendBox-right-light' : ''
    useEffect(() => {
        !currentUser && navigate('/')
        currentUser && navigate(`/dashboard/home/${currentUser.preferedTheme}/${currentUser.name}`)
        currentUser && setCurrenttheme(currentUser.preferedTheme)
        currentUser && setCurrentUserName(currentUser.name)
    }, [])
    useEffect(() => {
        if (currenttheme) {
            page === 'home' ? navigate(`/dashboard/${page}/${currenttheme}/${currentUser.name}`)
                : navigate(`/dashboard/${page}/${currenttheme}`)
        } else {
            page === 'home' ? navigate(`/dashboard/${page}/${currentUser.preferedTheme}/${currentUser.name}`)
                : navigate(`/dashboard/${page}/${currentUser.preferedTheme}`)
        }
    }, [page, currenttheme])


    return (
        <ConfigProvider
            theme={currenttheme === 'dark' ? {
                algorithm: theme.darkAlgorithm,
            } : {
                algorithm: theme.defaultAlgorithm,
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={currenttheme === 'dark' && darkTheme}>
                    <div className={`App ${lightAppClassname}`}>
                        <div className={`myDashboard ${lightDashboardClassname}`}>
                            <Sidebar theme={currenttheme} setPage={setPage} setCurrenttheme={setCurrenttheme} />
                            {/* {page === 'home' && <Main theme={currenttheme} name={currentUserName} />}
                            {page === 'chat' && <ChatPage theme={currenttheme}></ChatPage>}
                            {page === 'calender' && <PlanPage theme={currenttheme} />}
                            {page === 'tutorial' && <TutorialPage theme={currenttheme} />}
                            {page === 'blog' && <BlogPage theme={currenttheme} />}
                            {page === 'competition' && <CompetitionPage theme={currenttheme} />}
                            {page === 'setting' && <SettingPage theme={currenttheme} />} */}
                            <Outlet />
                        </div>
                    </div>
                </ThemeProvider>
            </LocalizationProvider>
        </ConfigProvider>
    );
}

export default Dashboard;
