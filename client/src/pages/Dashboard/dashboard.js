import './index.less';
import { useEffect, useState } from 'react';

import SayHello from '../../components/sayHello'
import Contacts from '../../components/contacts'
import Statistic from '../../components/statistic'
import CompetitionCard from '../../components/competitionCard'
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Trend from '../../components/trend'

function Main(props) {
    const { theme, name } = props
    const [today, setToday] = useState(dayjs('2023-05-21'));
    const contendBoxRightDashboardClassname = theme === 'light' ? 'contendBox-right-light' : ''
    return (
        <div className='contentBox'>
            <div className='contendBox-left'>
                <SayHello theme={theme} userName={name} />
                <div className='contendBox-left-subTop'>
                    <Contacts theme={theme} />
                    <Statistic theme={theme} />
                </div>
                <div className='contendBox-left-subBottom'>
                    <CompetitionCard theme={theme} />
                    <Trend theme={theme} />
                </div>
            </div>
            <div className={`contendBox-right ${contendBoxRightDashboardClassname}`}>
                <DateCalendar value={today} onChange={(newValue) => setToday(newValue)} />
            </div>
        </div>
    );
}

export default Main;
