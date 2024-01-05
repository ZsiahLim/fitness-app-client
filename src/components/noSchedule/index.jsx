import './index.less'
import { useIntl } from 'react-intl';
import useUserTheme from '../../hooks/useUserTheme';

export default function NoSchedule() {
    const theme = useUserTheme()
    const { formatMessage } = useIntl()
    const lightPromotionPlanClassname = theme === 'light' ? 'promotionDay-light' : ""
    return (
        <>
            <div className='NoSchedueBox' >
                <div className='NoSchedule'>
                    <div className='programName'>{formatMessage({ id: 'noSchedule' })}{formatMessage({ id: 'app.skd.noSkdPt2' })}</div>
                </div>
                <div className='schedule-promotion'>
                    {formatMessage({id: 'app.skd.restDayWarn'})}
                </div>
                <div className='promotionPlan'>
                    <div className={`promotionDay ${lightPromotionPlanClassname}`}>
                        <div className='promotionDay-Title'>{formatMessage({id: 'app.skd.planTemplate.day1'})}</div>
                        <div className='promotionDay-content'>{formatMessage({id: 'app.skd.planTemplate.day1.workout'})}</div>
                    </div>
                    <div className={`promotionDay ${lightPromotionPlanClassname}`}>
                        <div className='promotionDay-Title'>{formatMessage({id: 'app.skd.planTemplate.day2'})}</div>
                        <div className='promotionDay-content'>{formatMessage({id: 'app.skd.planTemplate.day2.workout'})}</div>
                    </div>
                    <div className={`promotionDay ${lightPromotionPlanClassname}`}>
                        <div className='promotionDay-Title'>{formatMessage({id: 'app.skd.planTemplate.day3'})}</div>
                        <div className='promotionDay-content'>{formatMessage({id: 'app.skd.planTemplate.day3.workout'})}</div>
                    </div>
                    <div className={`promotionDay ${lightPromotionPlanClassname}`}>
                        <div className='promotionDay-Title'>{formatMessage({id: 'app.skd.planTemplate.day4'})}</div>
                        <div className='promotionDay-content'>{formatMessage({id: 'app.skd.planTemplate.day4.workout'})}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
