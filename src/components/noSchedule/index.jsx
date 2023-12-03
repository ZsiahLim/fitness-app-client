import './index.less'
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

export default function NoSchedule() {
    const { currentTheme } = useSelector(state => state.user)
    const { formatMessage } = useIntl()
    const navigateTo = useNavigate();
    const { pathname } = useLocation()
    const lightPromotionPlanClassname = currentTheme === 'light' ? 'promotionDay-light' : ""
    return (
        <>
            <div className='NoSchedueBox' >
                <div className='NoSchedule'>
                    <div className='programName'>{formatMessage({ id: 'noSchedule' })} bellow recommanded tutorial for you</div>
                </div>
                <div className='schedule-promotion'>
                    Add some rest day in to your schedule and training progressively can gradually improve workout effectiveness.
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

            </div>
            {pathname.includes('home') && <div key={1} className='AddSchedule' onClick={() => navigateTo('/calender')}>
                <div className="AddSchedule-btn">
                    {formatMessage({ id: 'goplanpage' })}
                </div>
            </div>}

        </>
    )
}
