import Card from './card'
import './index.less'
import { useIntl } from 'react-intl';
import useRecord from '../../../../hooks/useRecord';
import { isEmptyObj, secToSpecificMin } from '../../../../utils/funcs';
import { useEffect, useState } from 'react';
import useUserTarget from '../../../../hooks/useUserTarget';
import { formatTimeToChinese } from '../../../../utils/formatTime';
import useUserTheme from '../../../../hooks/useUserTheme';
import APPTHEME from '../../../../constants/COLORS/APPTHEME';
export default function Index() {//need to update
    const currentTheme = useUserTheme()
    const THEME = APPTHEME[currentTheme]
    const { formatMessage } = useIntl()
    const { latestRecord, todayRecord } = useRecord()
    const [recordDate, setRecordDate] = useState()
    const [stepNum, setStepNum] = useState(null)
    const [calorieNum, setCalorieNum] = useState(null)
    const [distanceNum, setDistanceNum] = useState(null)
    const [durationNum, setDurationNum] = useState(null)
    const { stepTarget, calorieTarget, distanceTarget, durationTarget } = useUserTarget()

    useEffect(() => {
        if (isEmptyObj(todayRecord)) {
            if (!isEmptyObj(latestRecord)) {
                setCalorieNum(latestRecord.calorieConsumption)
                setStepNum(latestRecord.steps)
                setDurationNum(latestRecord.duration)
                setDistanceNum(latestRecord.distance)
                setRecordDate(formatTimeToChinese(latestRecord.updatedAt))
            }
        } else {
            setCalorieNum(todayRecord.calorieConsumption)
            setStepNum(todayRecord.steps)
            setDurationNum(todayRecord.duration)
            setDistanceNum(todayRecord.distance)
            setRecordDate(formatTimeToChinese(todayRecord.updatedAt))
        }
    }, [todayRecord, latestRecord])

    const cardsInfo = {
        steps: {
            title: `${formatMessage({ id: 'steps' })}`,
            number: stepNum ? stepNum : '0',
            unit: '步',
            percentage: (stepNum && stepTarget) ? ((stepNum / stepTarget) * 100).toFixed(0) : '--',
            recordAt: recordDate ? recordDate : '--'
        },
        colorie: {
            title: `${formatMessage({ id: 'colorie' })}`,
            number: calorieNum ? calorieNum.toFixed(0) : '0',
            unit: 'kcal',
            percentage: calorieNum && calorieTarget ? ((calorieNum / calorieTarget) * 100).toFixed(0) : '--',
            recordAt: recordDate ? recordDate : '--'
        },
        distance: {
            title: `${formatMessage({ id: 'distance' })}`,
            number: distanceNum ? distanceNum : '0',
            unit: 'm',
            percentage: (distanceNum && distanceTarget) ? ((distanceNum / distanceTarget) * 100).toFixed(0) : '--',
            recordAt: recordDate ? recordDate : '--'
        },
        duration: {
            title: 'Duration',
            number: durationNum ? secToSpecificMin(durationNum) : "0",
            unit: 'min',
            percentage: durationNum && durationTarget ? ((durationNum / durationTarget) * 100).toFixed(0) : '--',
            recordAt: recordDate ? recordDate : '--'
        },
    }
    const { steps, colorie, distance, duration } = cardsInfo
    return (
        <div className={`statistic`}>
            <div key={'steps'} className={`myCards`} style={{ width: '49%', height: '48%', backgroundColor: THEME.contentColor }}><Card cardInfo={steps} /></div>
            <div key={'colorie'} className={`myCards`} style={{ width: '49%', height: '48%', backgroundColor: THEME.contentColor }}><Card cardInfo={colorie} /></div>
            <div key={'distance'} className={`myCards`} style={{ width: '49%', height: '48%', backgroundColor: THEME.contentColor }}><Card cardInfo={distance} /></div>
            <div key={'days'} className={`myCards`} style={{ width: '49%', height: '48%', backgroundColor: THEME.contentColor }}><Card cardInfo={duration} /></div>
        </div>
    )
}
