import React, { useEffect, useState } from 'react'
import { Calendar } from 'antd';
import './index.less'
import { useDispatch, useSelector } from 'react-redux';
import { setUserSelectDay } from '../../redux/CalendarSlice';
import { checkIsToday } from '../../utils/checkIsToday';
import RecommandTutorials from '../../components/RecommandTutorials';
import useUncompletedTutorials from '../../hooks/useUncompletedTutorials';
import useCompletedTutorials from '../../hooks/useCompletedTutorials';
import TodayTodo from './Components/TodayTodo';
import { Modal } from 'antd';
import { CalendarFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import { formatTimeToChinese } from '../../utils/formatTime';
const options = { day: 'numeric', month: 'long', year: 'numeric' };

export default function PlanPage() {
    const dispatch = useDispatch()
    const { currentTheme, currentUser: { preferedLanguage } } = useSelector(state => state.user)
    const lightPlanPageClassname = currentTheme === 'light' ? 'planPage-light' : ''
    const [selectDay, setSelectday] = useState(new Date());
    const [isToday, setIsToday] = useState(true)
    const yetDoneTutorial = useUncompletedTutorials(selectDay)
    const doneTutorial = useCompletedTutorials(selectDay)
    const [noTutorial, setNoTutorial] = useState(yetDoneTutorial.length === 0 && doneTutorial.length === 0)

    const [isModalOpen, setIsModalOpen] = useState(false)
    useEffect(() => {
        setSelectday(new Date())
    }, [])

    useEffect(() => {
        if (selectDay) {
            const whetherToday = checkIsToday(selectDay)
            setIsToday(whetherToday)
            dispatch(setUserSelectDay(selectDay.toISOString()))
        }
    }, [selectDay])
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onSelect = (newValue) => {
        const date = new Date(newValue);
        setSelectday(date)
    };
    return (
        <div className={`planPage ${lightPlanPageClassname}`}>
            <div className='planPage-left' style={{ flexBasis: "360px", height: '100%', padding: '10px', }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: "0 10px" }}>
                    <h2>{selectDay && new Date(selectDay).toLocaleDateString(preferedLanguage === "en_US" ? "en" : 'zh', options)}</h2>
                    <CalendarFilled onClick={showModal} style={{ fontSize: 20 }} />
                </div>
                <TodayTodo selectDay={selectDay} />
            </div>
            <div style={{ flex: 1, height: '100%', overflow: 'auto', padding: '10px' }}>
                <RecommandTutorials />
            </div>
            <Modal title={`Select date: ${formatTimeToChinese(selectDay)}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div></div>
                    <Calendar fullscreen={false} onSelect={onSelect} defaultValue={dayjs(selectDay)} />
                </div>
            </Modal>
        </div>
    )
}
