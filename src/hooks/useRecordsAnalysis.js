import { useState, useEffect } from 'react';
import { formatTimeForCharts } from '../utils/formatTime';
import { useSelector } from 'react-redux';
import { secConvertToMin, secToSpecificMin } from '../utils/funcs';
// 这是一个自定义Hook
function useRecordsAnalysis(records) {
    const [dateArr, setDateArr] = useState([])
    const [durationArr, setDurationArr] = useState([])
    const [stepArr, setStepArr] = useState([])
    const [distanceArr, setDistanceArr] = useState([])
    const [calorieArr, setCalorieArr] = useState([])
    const [tutorialCalorieArr, setTutorialCalorieArr] = useState([])
    const [maxSteps, setMaxSteps] = useState(0);
    const [maxStepsDate, setMaxStepsDate] = useState(null);
    const [maxDuration, setMaxDuration] = useState(0);
    const [maxDurationDate, setMaxDurationDate] = useState(null);
    const [maxCalorie, setMaxCalorie] = useState(0);
    const [maxCalorieDate, setMaxCalorieDate] = useState(null);
    const [maxDistance, setMaxDistance] = useState(0);
    const [maxDistanceDate, setMaxDistanceDate] = useState(null);
    const [durationSum, setDurationSum] = useState(0)
    const [calorieSum, setCalorieSum] = useState(0.0)
    const [tutorialCalorieSum, setTutorialCalorieSum] = useState(0.0)

    useEffect(() => {
        if (records && records.length > 0) {
            let maxdurationInfo = records.reduce((max, record) => (record.duration > max.duration) ? { duration: record.duration, date: record.date } : max, { duration: 0, date: null });
            let maxcalorieConsumptionInfo = records.reduce((max, record) => (record.calorieConsumption > max.calorieConsumption) ? { calorieConsumption: record.calorieConsumption, date: record.date } : max, { calorieConsumption: 0, date: null });
            let maxstepsInfo = records.reduce((max, record) => (record.steps > max.steps) ? { steps: record.steps, date: record.date } : max, { steps: 0, date: null });
            let maxdistanceInfo = records.reduce((max, record) => (record.distance > max.distance) ? { distance: record.distance, date: record.date } : max, { distance: 0, date: null });
            maxdurationInfo.date && setMaxDurationDate(maxdurationInfo.date)
            maxcalorieConsumptionInfo.date && setMaxCalorieDate(maxcalorieConsumptionInfo.date)
            maxstepsInfo.date && setMaxStepsDate(maxstepsInfo.date)
            maxdistanceInfo.date && setMaxDistanceDate(maxdistanceInfo.date)
            let sumDuration = 0;
            let sumCalorie = 0;
            let sumTutorialCalorie = 0;
            setMaxSteps(maxstepsInfo.steps);
            setMaxDistance(maxdistanceInfo.distance);
            setMaxDuration(maxdurationInfo.duration);
            setMaxCalorie(maxcalorieConsumptionInfo.calorieConsumption);
            setDateArr(records.map(item => formatTimeForCharts(item.date)));
            setDurationArr(records.map(item => {
                sumDuration += parseInt(item.duration)
                return secConvertToMin(item.duration)
            }));
            setCalorieArr(records.map(item => {
                sumCalorie += parseFloat(item.calorieConsumption)
                return item.calorieConsumption
            }));
            setStepArr(records.map(item => item.steps));
            setDistanceArr(records.map(item => item.distance));
            setTutorialCalorieArr(records.map(item => {
                sumTutorialCalorie += parseFloat(item.tutorialCalorieConsumption)
                return item.tutorialCalorieConsumption || 0
            }));
            console.log("sumDuration", sumDuration);
            setDurationSum(sumDuration)
            setCalorieSum(sumCalorie)
            setTutorialCalorieSum(sumTutorialCalorie)
        }
    }, [records]);

    // 返回状态和设置方法
    return {
        durationSum,
        calorieSum,
        tutorialCalorieSum,
        dateArr,
        durationArr,
        stepArr, distanceArr, calorieArr, tutorialCalorieArr, maxSteps, maxDuration, maxCalorie, maxDistance, maxStepsDate, maxDurationDate, maxCalorieDate, maxDistanceDate,
    };
}

export default useRecordsAnalysis;
