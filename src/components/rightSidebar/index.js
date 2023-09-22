import React, { useEffect, useState } from 'react'
import { CalendarFilled, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Button, Divider, Modal } from 'antd';
import dayjs from 'dayjs';
import './index.less'
import muscle from '../../Pic/muscle.jpeg'
import pushup from '../../Pic/pushup.jpeg'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const options = { day: 'numeric', month: 'long', year: 'numeric' };

export default function RightSidebar() {
    const { currentTheme } = useSelector(state => state.user)
    const navigateTo = useNavigate();
    const [today, setToday] = useState(dayjs(new Date()));
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
    useEffect(() => {
        console.log(today);
    }, [today])
    const lightEvaluateClassname = currentTheme === 'light' ? 'Evaluate-light' : ''
    const lightPromotionPlanClassname = currentTheme === 'light' ? 'promotionDay-light' : ""
    return (
        <div className='RightSidebarBox'>
            <div className='rightSidebar-date'>
                <div className='rightSidebar-today'>
                    <span>{new Date(today).toLocaleDateString('en', options)}</span> <CalendarFilled onClick={showModal} style={{ fontSize: 20 }} />
                </div>
            </div>
            <Divider />
            <div className='rightSidebar-Schedule'>
                <div className='NoSchedueBox'>
                    <div className='NoSchedule'>
                        <div className='border'></div>
                        <div>
                            No schedule, try to join
                            <div className='programName'>Full-Body Fat Burning Program</div>
                        </div>
                    </div>
                    <div className='schedule-promotion'>
                        Following a schedule and training progressively can gradually improve workout effectiveness.
                    </div>
                    <div className='promotionPlan'>
                        <div className={`promotionDay ${lightPromotionPlanClassname}`}>
                            <div className='promotionDay-Title'>Day 1</div>
                            <div className='promotionDay-content'>Warm-up</div>
                        </div>
                        <div className={`promotionDay ${lightPromotionPlanClassname}`}>
                            <div className='promotionDay-Title'>Day 2</div>
                            <div className='promotionDay-content'>Energize</div>
                        </div>
                        <div className={`promotionDay ${lightPromotionPlanClassname}`}>
                            <div className='promotionDay-Title'>Day 3</div>
                            <div className='promotionDay-content'>Functional Fitness</div>
                        </div>
                        <div className={`promotionDay ${lightPromotionPlanClassname}`}>
                            <div className='promotionDay-Title'>Day 4</div>
                            <div className='promotionDay-content'>Rest</div>
                        </div>
                    </div>
                    <div className={`Evaluate ${lightEvaluateClassname}`}>
                        <div className='personalizedWords'>
                            Evaluating your fitness level to personalize workout plans
                        </div>
                        <div className='personalizedBtn'>
                            <RightOutlined />
                        </div>
                    </div>
                </div>
                <Divider />
                <div className='AddScheduleBtn' onClick={() => navigateTo('/calender')}>Go to schedule plan page</div>
                <Divider />
                <div className='RecommandForUser'>
                    <div className='RecommandForUser-title'>Recommand for you</div>
                    <div className='RecommandForUser-content'>
                        <div className='RecommandForUser-Item'>
                            <div className='RecommandForUser-Item-img'>
                                <img src={muscle} style={{ width: "100%" }} />
                            </div>
                            <div className='RecommandForUser-Item-desc'>
                                <div className='RecommandForUser-Item-title'>Lose Weight</div>
                                <div className='RecommandForUser-Item-content'>Reduce beer belly and visceral fat</div>
                            </div>
                        </div>
                        <div className='RecommandForUser-Item'>
                            <div className='RecommandForUser-Item-img'>
                                <img src={pushup} style={{ width: "100%" }} />
                            </div>
                            <div className='RecommandForUser-Item-desc'>
                                <div className='RecommandForUser-Item-title'>Push-up training</div>
                                <div className='RecommandForUser-Item-content'>Enhance precise force perception <br></br> unlock movement patterns</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Select Date" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <DateCalendar value={today} onChange={(newValue) => setToday(newValue)} />
            </Modal>
        </div>
    )
}
