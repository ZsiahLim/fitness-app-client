import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import muscle from '../../Pic/muscle.jpeg'
import pushup from '../../Pic/pushup.jpeg'
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

export default function NoSchedule() {
    const { currentTheme } = useSelector(state => state.user)
    const { formatMessage } = useIntl()
    const navigateTo = useNavigate();
    const { pathname } = useLocation()
    const lightEvaluateClassname = currentTheme === 'light' ? 'Evaluate-light' : ''
    const lightPromotionPlanClassname = currentTheme === 'light' ? 'promotionDay-light' : ""
    return (
        <>
            <div className='NoSchedueBox'>
                <div className='NoSchedule'>
                    <div className='border'></div>
                    <div>
                        {formatMessage({ id: 'noSchedule' })}
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
                <div className={`Evaluate ${lightEvaluateClassname}`} onClick={() => navigateTo('/evaluate')}>
                    <div className='personalizedWords'>
                        {formatMessage({ id: 'evaluateLevel' })}
                    </div>
                    <div className='personalizedBtn'>
                        <RightOutlined />
                    </div>
                </div>
            </div>
            <Divider />
            {pathname.includes('home') ? <div
                key={1}
                className='AddScheduleBtn'
                onClick={() => navigateTo('/calender')}
            >
                {formatMessage({ id: 'goplanpage' })}
            </div>
                : <div
                    key={2}
                    className='AddScheduleBtn'
                ><PlusOutlined />
                    &nbsp;&nbsp;Add schedule
                </div>}
            <Divider />
            <div className='RecommandForUser'>
                <div className='RecommandForUser-title'>{formatMessage({ id: 'recommandForU' })}</div>
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
        </>
    )
}
