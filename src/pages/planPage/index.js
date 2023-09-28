import './index.less'
import React, { useEffect, useState } from 'react'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './index.less'
import { useSelector } from 'react-redux';
import NoSchedule from '../../components/noSchedule';
const options = { day: 'numeric', month: 'long', year: 'numeric' };

export default function PlanPage() {
    const { currentTheme } = useSelector(state => state.user)
    const lightPlanPageClassname = currentTheme === 'light' ? 'planPage-light' : ''
    const [today, setToday] = useState();
    useEffect(() => {
        setToday(new Date())
    }, [])
    return (
        <div className={`planPage ${lightPlanPageClassname}`}>
            <div className='rightSidebar-date'>
                <div className='rightSidebar-today'>
                    <span><h2>{today && new Date(today).toLocaleDateString('en', options)}</h2></span>
                </div>
                <div className='planpage-calendar'>
                    <DateCalendar value={today} onChange={(newValue) => setToday(newValue)} />
                </div>
            </div>
            <div className='planpage-schedule'>
                <NoSchedule />
            </div>

        </div>
    )
}
