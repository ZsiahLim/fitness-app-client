import { useState, useEffect } from 'react';
import { formatTimeForCharts } from '../utils/formatTime';
import { useDispatch, useSelector } from 'react-redux';
import { secConvertToMin, secToSpecificMin } from '../utils/funcs';
import {
    startOfWeek,
    startOfMonth,
    startOfYear,
    eachDayOfInterval,
    eachWeekOfInterval,
    eachMonthOfInterval,
    eachYearOfInterval,
    format,
} from 'date-fns';
import { getrecords } from '../api/record.api';
import { setRecords } from '../redux/RecordSlice';
import { message } from 'antd';

// 这是一个自定义Hook
function useRecords() {
    const dispatch = useDispatch()
    const [records, setAllRecords] = useState([])
    const getRecords = async () => {
        await getrecords().then(res => {
            if (res && res?.status !== false) {
                setAllRecords(res)
                dispatch(setRecords(res))
            }
        }).catch(err => {
            console.log(err, 'err');
            message.error("出现异常请重试")
        })
    }

    useEffect(() => {
        getRecords()
    }, [])

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

    const [weeklyData, setWeeklyData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [yearlyData, setYearlyData] = useState([]);

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
            setDurationSum(sumDuration)
            setCalorieSum(sumCalorie)
            setTutorialCalorieSum(sumTutorialCalorie)

            const groupedByWeek = records.reduce((acc, record) => {
                const weekStart = startOfWeek(new Date(record.date)).toISOString();
                if (!acc[weekStart]) {
                    acc[weekStart] = { steps: 0, duration: 0, distance: 0, calories: 0, count: 0 };
                }
                acc[weekStart].steps += record.steps;
                acc[weekStart].duration += record.duration;
                acc[weekStart].distance += record.distance;
                acc[weekStart].calories += record.calorieConsumption;
                acc[weekStart].count += 1;
                return acc;
            }, {});

            // Group by Month
            const groupedByMonth = records.reduce((acc, record) => {
                const monthStart = startOfMonth(new Date(record.date)).toISOString();
                if (!acc[monthStart]) {
                    acc[monthStart] = { steps: 0, duration: 0, distance: 0, calories: 0, count: 0 };
                }
                acc[monthStart].steps += record.steps;
                acc[monthStart].duration += record.duration;
                acc[monthStart].distance += record.distance;
                acc[monthStart].calories += record.calorieConsumption;
                acc[monthStart].count += 1;
                return acc;
            }, {});

            // Group by Year
            const groupedByYear = records.reduce((acc, record) => {
                const yearStart = startOfYear(new Date(record.date)).toISOString();
                if (!acc[yearStart]) {
                    acc[yearStart] = { steps: 0, duration: 0, distance: 0, calories: 0, count: 0 };
                }
                acc[yearStart].steps += record.steps;
                acc[yearStart].duration += record.duration;
                acc[yearStart].distance += record.distance;
                acc[yearStart].calories += record.calorieConsumption;
                acc[yearStart].count += 1;
                return acc;
            }, {});

            // Convert the grouped data to arrays for charting
            setWeeklyData(Object.entries(groupedByWeek).map(([date, data]) => ({
                week: format(new Date(date), 'yyyy-MM-dd'),
                ...data,
            })));

            setMonthlyData(Object.entries(groupedByMonth).map(([date, data]) => ({
                month: format(new Date(date), 'yyyy-MM'),
                ...data,
            })));

            setYearlyData(Object.entries(groupedByYear).map(([date, data]) => ({
                year: format(new Date(date), 'yyyy'),
                ...data,
            })));

        }
    }, [records]);

    // 返回状态和设置方法
    return {
        durationSum, durationArr,
        calorieSum, calorieArr,
        tutorialCalorieSum, tutorialCalorieArr,
        dateArr,
        stepArr,
        distanceArr,
        maxSteps, maxStepsDate,
        maxDuration, maxDurationDate,
        maxCalorie, maxCalorieDate,
        maxDistance, maxDistanceDate,

        weeklyData, monthlyData, yearlyData
    };
}

export default useRecords;
