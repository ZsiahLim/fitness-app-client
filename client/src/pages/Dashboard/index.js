import './index.less';
import { useEffect, useState } from 'react';

import Sidebar from '../../components/sidebar'
import SayHello from '../../components/sayHello'
import Contacts from '../../components/contacts'
import Statistic from '../../components/statistic'
import CompetitionCard from '../../components/competitionCard'
import { ConfigProvider, theme } from 'antd';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Trend from '../../components/trend'
import { useSelector } from 'react-redux'
import Main from './dashboard'
import ChatPage from '../chatPage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Dashboard() {
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
                            {page === 'chat' && <ChatPage></ChatPage>}
                            {page === 'calender' && <div>hello word</div>}
                            {page === 'tutorial' && <div>hello word</div>}
                            {page === 'blog' && <div>hello word</div>}
                            {page === 'competition' && <div>hello word</div>}
                            {page === 'setting' && <div>hello word</div>}
                        </div>
                    </div>
                </ThemeProvider>
            </LocalizationProvider>
        </ConfigProvider>
    );
}

export default Dashboard;
