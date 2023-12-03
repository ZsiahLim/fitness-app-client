import Card from './card'
import './index.less'
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import useRecord from '../../../../hooks/useRecord';
import { isEmptyObj, secToSpecificMin } from '../../../../utils/funcs';
import { useEffect, useState } from 'react';
import useUserTarget from '../../../../hooks/useUserTarget';
import { formatTimeToChinese } from '../../../../utils/formatTime';
export default function Index() {//need to update
    const { currentTheme } = useSelector(state => state.user)
    const { formatMessage } = useIntl()
    const statisticDashboardClassname = currentTheme === 'light' ? 'statistic-light' : ''
    const { latestRecord, todayRecord } = useRecord()
    const [recordDate, setRecordDate] = useState()
    const [stepNum, setStepNum] = useState(null)
    const [calorieNum, setCalorieNum] = useState(null)
    const [distanceNum, setDistanceNum] = useState(null)
    const [durationNum, setDurationNum] = useState(null)

    const { weightTarget, stepTarget, calorieTarget, distanceTarget, durationTarget } = useUserTarget()

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
            number: stepNum ? stepNum : '--',
            unit: '步',
            percentage: (stepNum && stepTarget) ? ((stepNum / stepTarget).toPrecision(2) * 100) : '--',
            recordAt: recordDate ? recordDate : '--'
        },
        colorie: {
            title: `${formatMessage({ id: 'colorie' })}`,
            number: calorieNum ? calorieNum : '--',
            unit: 'kcal',
            percentage: calorieNum && calorieTarget ? ((calorieNum / calorieTarget).toPrecision(2) * 100) : '--',
            recordAt: recordDate ? recordDate : '--'
        },
        distance: {
            title: `${formatMessage({ id: 'distance' })}`,
            number: distanceNum ? distanceNum : '--',
            unit: 'm',
            percentage: distanceNum && distanceTarget ? ((distanceNum / distanceTarget).toPrecision(2) * 100) : '--',
            recordAt: recordDate ? recordDate : '--'
        },
        days: {
            title: 'Duration',
            number: durationNum ? secToSpecificMin(durationNum) : "--",
            unit: 'min',
            percentage: durationNum && durationTarget ? ((durationNum / durationTarget).toPrecision(2) * 100) : '--',
            recordAt: recordDate ? recordDate : '--'
        },
    }
    const { steps, colorie, distance, days } = cardsInfo
    const cardslight = currentTheme === 'light' ? 'myCards-light' : ''
    return (
        <div className={`statistic ${statisticDashboardClassname} `}>
            <div key={'steps'} className={`myCards ${cardslight} `} style={{ width: '49%', height: '48%' }}><Card cardInfo={steps} /></div>
            <div key={'colorie'} className={`myCards ${cardslight} `} style={{ width: '49%', height: '48%' }}><Card cardInfo={colorie} /></div>
            <div key={'distance'} className={`myCards ${cardslight} `} style={{ width: '49%', height: '48%' }}><Card cardInfo={distance} /></div>
            <div key={'days'} className={`myCards ${cardslight} `} style={{ width: '49%', height: '48%' }}><Card cardInfo={days} /></div>
        </div>
    )
}
