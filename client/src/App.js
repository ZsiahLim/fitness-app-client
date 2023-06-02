import './App.less';
import Sidebar from './components/sidebar'
import SayHello from './components/sayHello'
import { useEffect, useState } from 'react';
import Contacts from './components/contacts'
import Statistic from './components/statistic'
import CompetitionCard from './components/competitionCard'
import { ConfigProvider, theme } from 'antd';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Trend from './components/trend'
import Login from './pages/Login';



function App() {
  const [currenttheme, setCurrenttheme] = useState('dark')
  const [page, setPage] = useState('home')
  const [today, setToday] = useState(dayjs('2023-05-21'));
  const [userInfo, setUserInfo] = useState({
    name: 'leon666',
    preferTheme: 'dark',
    avator: ''
  })
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  useEffect(() => {
    console.log('page', page);
  }, [page])
  useEffect(() => {

  }, [])
  const lightAppClassname = currenttheme === 'light' ? 'App-light' : ''
  const lightDashboardClassname = currenttheme === 'light' ? 'dashboard-light' : ''
  const contendBoxRightDashboardClassname = currenttheme === 'light' ? 'contendBox-right-light' : ''


  return (
    // <ConfigProvider
    //   theme={currenttheme === 'dark' ? {
    //     algorithm: theme.darkAlgorithm,
    //   } : {
    //     algorithm: theme.defaultAlgorithm,
    //   }}
    // >
    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <ThemeProvider theme={currenttheme === 'dark' && darkTheme}>
    //       <div className={`App ${lightAppClassname}`}>
    //         <div className={`dashboard ${lightDashboardClassname}`}>
    //           <Sidebar theme={currenttheme} setPage={setPage} setCurrenttheme={setCurrenttheme} />
    //           {page === 'home' && <div className='contentBox'>
    //             <div className='contendBox-left'>
    //               <SayHello theme={currenttheme} userName={userInfo.name} />
    //               <div className='contendBox-left-subTop'>
    //                 <Contacts theme={currenttheme} />
    //                 <Statistic theme={currenttheme} />
    //               </div>
    //               <div className='contendBox-left-subBottom'>
    //                 <CompetitionCard theme={currenttheme} />
    //                 <Trend theme={currenttheme} />
    //               </div>
    //             </div>
    //             <div className={`contendBox-right ${contendBoxRightDashboardClassname}`}>
    //               <DateCalendar value={today} onChange={(newValue) => setToday(newValue)} />
    //             </div>
    //           </div>}
    //         </div>
    //       </div>
    //     </ThemeProvider>
    //   </LocalizationProvider>
    // </ConfigProvider>
    <Login>
    </Login>
  );
}

export default App;
