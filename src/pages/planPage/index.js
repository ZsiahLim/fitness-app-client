import './index.less'
import React, { useEffect, useState } from 'react'
import { CalendarFilled, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Button, Divider, Modal } from 'antd';
import dayjs from 'dayjs';
import './index.less'
import muscle from '../../Pic/muscle.jpeg'
import pushup from '../../Pic/pushup.jpeg'
import { useSelector } from 'react-redux';
const options = { day: 'numeric', month: 'long', year: 'numeric' };

export default function PlanPage() {
    const { currentTheme } = useSelector(state => state.user)
    const lightPlanPageClassname = currentTheme === 'light' ? 'planPage-light' : ''
    const [today, setToday] = useState();
    useEffect(() => {
        setToday(new Date())
    }, [])
    const lightEvaluateClassname = currentTheme === 'light' ? 'Evaluate-light' : ''
    const lightPromotionPlanClassname = currentTheme === 'light' ? 'promotionDay-light' : ""
    const lightRecommandForUserItemClassname = currentTheme === 'light' ? 'RecommandForUser-Item-light' : ""
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
                </div>
                <Divider />
                <div className='AddScheduleBtn'><PlusOutlined />&nbsp;&nbsp;Add schedule</div>
                <Divider />
                <div className='RecommandForUser'>
                    <div className='RecommandForUser-title'><h2>Recommand for you</h2></div>
                    <div className='RecommandForUser-content'>
                        <div className={`RecommandForUser-Item ${lightRecommandForUserItemClassname}`}>
                            <div className='RecommandForUser-Item-img'>
                                <img src={muscle} style={{ width: "100%" }} />
                            </div>
                            <div className='RecommandForUser-Item-desc'>
                                <div className='RecommandForUser-Item-title'><h3>Lose Weight</h3></div>
                                <div className='RecommandForUser-Item-content'>Reduce beer belly and visceral fat</div>
                            </div>
                        </div>
                        <div className={`RecommandForUser-Item ${lightRecommandForUserItemClassname}`}>
                            <div className='RecommandForUser-Item-img'>
                                <img src={pushup} className='img' />
                            </div>
                            <div className='RecommandForUser-Item-desc'>
                                <div className='RecommandForUser-Item-title'><h3>Push-up training</h3></div>
                                <div className='RecommandForUser-Item-content'>Enhance precise force perception & unlock movement patterns</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
