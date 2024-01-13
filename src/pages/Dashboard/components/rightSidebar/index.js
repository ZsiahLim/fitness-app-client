import React, { useState } from 'react'
import { CalendarFilled } from '@ant-design/icons';
import { Calendar, Divider, Modal } from 'antd';
import dayjs from 'dayjs';
import './index.less'
import { useDispatch, useSelector } from 'react-redux';
import TodayTodo from '../../../planPage/Components/TodayTodo';
import { formatTimeToChinese } from '../../../../utils/formatTime';
import RecommandTutorials from '../../../../components/RecommandTutorials';
import MyExerciseCard from '../../../settingPage/components/MyExerciseCard';
import NavigateToPlanPage from './components/NavigateToPlanPage';
import { setUserSelectDay } from '../../../../redux/CalendarSlice';
import { isAfterToday } from '../../../../utils/funcs';

const options = { day: 'numeric', month: 'long', year: 'numeric' };

export default function RightSidebar() {
    const dispatch = useDispatch()
    const { userSelectDay } = useSelector(state => state.calendar)
    const { currentUser: { preferedLanguage } } = useSelector(state => state.user)
    const [selectDay, setSelectDay] = useState(isAfterToday(userSelectDay) ? new Date(userSelectDay) : new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        dispatch(setUserSelectDay(date.toISOString()))
        setSelectDay(date)
    };
    return (
        <div className='RightSidebarBox'>
            <div className='rightSidebar-date'>
                <div className='rightSidebar-today'>
                    <div>{selectDay && new Date(selectDay).toLocaleDateString(preferedLanguage === "en_US" ? "en" : 'zh', options)}</div>
                    <CalendarFilled onClick={showModal} style={{ fontSize: 20 }} />
                </div>
            </div>
            <div className='rightSidebar-Schedule'>
                <TodayTodo selectDay={selectDay} />
                <Divider />
                <MyExerciseCard />
                <RecommandTutorials />
                <NavigateToPlanPage />
            </div>
            <Modal title={`${formatTimeToChinese(selectDay)}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Calendar fullscreen={false} onSelect={onSelect} defaultValue={dayjs(selectDay)} />
                </div>
            </Modal>
        </div>
    )
}
