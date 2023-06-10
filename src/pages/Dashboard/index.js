import './index.less';
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
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

function Dashboard() {
    const router = createBrowserRouter([
        {
            path: '/dashboard',
            element: <Main />
        },
        {
            path: '/dashboard/chat',
            element: <ChatPage />
        }
    ])

    const { currentUser } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [currenttheme, setCurrenttheme] = useState()
    const [currentUserName, setCurrentUserName] = useState()
    useEffect(() => {
        !currentUser && navigate('/')
        console.log(currentUser);
        currentUser && setCurrenttheme(currentUser.preferedTheme)
        currentUser && setCurrentUserName(currentUser.name)
    }, [])
    const [page, setPage] = useState('home')
    const [today, setToday] = useState(dayjs('2023-05-21'));
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const lightAppClassname = currenttheme === 'light' ? 'App-light' : ''
    const lightDashboardClassname = currenttheme === 'light' ? 'dashboard-light' : ''
    const contendBoxRightDashboardClassname = currenttheme === 'light' ? 'contendBox-right-light' : ''


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
                        <div className={`dashboard ${lightDashboardClassname}`}>
                            <Sidebar theme={currenttheme} setPage={setPage} setCurrenttheme={setCurrenttheme} />
                            {page === 'home' && <Main theme={currenttheme} name={currentUserName} />}
                            {page === 'chat' && <ChatPage theme={currenttheme}></ChatPage>}
                            {page === 'calender' && <PlanPage theme={currenttheme} />}
                            {page === 'tutorial' && <TutorialPage theme={currenttheme} />}
                            {page === 'blog' && <BlogPage theme={currenttheme} />}
                            {page === 'competition' && <CompetitionPage theme={currenttheme} />}
                            {page === 'setting' && <SettingPage theme={currenttheme} />}
                        </div>
                    </div>
                </ThemeProvider>
            </LocalizationProvider>
        </ConfigProvider>
    );
}

export default Dashboard;
