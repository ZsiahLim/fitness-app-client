import React, { useEffect, useState } from 'react'
import { Calendar } from 'antd';
import './index.less'
import { useDispatch, useSelector } from 'react-redux';
import { setUserSelectDay } from '../../redux/CalendarSlice';
import RecommandTutorials from '../../components/RecommandTutorials';
import TodayTodo from './Components/TodayTodo';
import { Modal } from 'antd';
import { CalendarFilled, RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { formatTimeToChinese } from '../../utils/formatTime';
import MyExerciseCard from '../settingPage/components/MyExerciseCard';
import SIZE from '../../constants/SIZE';
import useUserTheme from '../../hooks/useUserTheme';
import APPTHEME from '../../constants/COLORS/APPTHEME';
import { useNavigate } from 'react-router-dom';
const options = { day: 'numeric', month: 'long', year: 'numeric' };

export default function PlanPage() {
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const currentTheme = useUserTheme()
    const THEME = APPTHEME[currentTheme]
    const { currentUser: { preferedLanguage } } = useSelector(state => state.user)
    const lightPlanPageClassname = currentTheme === 'light' ? 'planPage-light' : ''
    const [selectDay, setSelectday] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false)
    useEffect(() => {
        setSelectday(new Date())
    }, [])

    useEffect(() => {
        if (selectDay) {
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
            <div style={{ flex: 1, display: 'flex', }}>
                <div className='planPage-left' style={{ flexBasis: "360px", height: '100%', padding: '10px', }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: "0 10px" }}>
                        <h2>{selectDay && new Date(selectDay).toLocaleDateString(preferedLanguage === "en_US" ? "en" : 'zh', options)}</h2>
                        <CalendarFilled onClick={showModal} style={{ fontSize: 20 }} />
                    </div>
                    <TodayTodo selectDay={selectDay} />
                    <Modal title={`Select date: ${formatTimeToChinese(selectDay)}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Calendar fullscreen={false} onSelect={onSelect} defaultValue={dayjs(selectDay)} />
                        </div>
                    </Modal>
                </div>
                <div style={{ flex: 1, overflow: 'auto', padding: '10px' }}>
                    <MyExerciseCard />
                    <RecommandTutorials />
                    <div onClick={() => navigateTo('/tutorial')} className='buttonHover' style={{ padding: SIZE.NormalMargin, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: THEME.backgroundColor, borderRadius: SIZE.CardBorderRadius, fontWeight: 'bold' }}>
                        <div>Go to Tutorial Library to find more</div>
                        <RightOutlined />
                    </div>
                </div>
            </div>
        </div>
    )
}
