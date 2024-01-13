import { useState, useEffect, useMemo } from 'react';
import { formatTimeForCharts } from '../utils/formatTime';
import { startOfWeek, startOfMonth, startOfYear, format } from 'date-fns';
import { getrecordsbyuserid } from '../api/record.api';
import { message } from 'antd';
import { useIntl } from 'react-intl';

function useRecordsByUserId(userId) {
    const [userRecords, setUserRecords] = useState([])
    const { formatMessage } = useIntl()
    const fetchRecords = async () => {
        try {
            const res = await getrecordsbyuserid(userId);
            if (res && res.status !== false) {
                setUserRecords(res)
            } else {
                message.error(formatMessage({ id: 'error.errorHappens' }))
            }
        } catch (err) {
            message.error(formatMessage({ id: 'error.errorHappens' }))
        }
    };

    useEffect(() => {
        fetchRecords();
    }, [userId]);

    const {
        dateArr,
        durationArr,
        stepArr,
        distanceArr,
        calorieArr,
        tutorialCalorieArr,
        maxValues,
        sums,
        weeklyData,
        monthlyData,
        yearlyData
    } = useMemo(() => {
        let maxSteps = 0, maxDuration = 0, maxCalorie = 0, maxDistance = 0;
        let maxStepsDate, maxDurationDate, maxCalorieDate, maxDistanceDate;
        let durationSum = 0, stepSum = 0, distanceSum = 0, calorieSum = 0, tutorialCalorieSum = 0;
        const groupedByWeek = userRecords.reduce((acc, record) => {
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
        const groupedByMonth = userRecords.reduce((acc, record) => {
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
        const groupedByYear = userRecords.reduce((acc, record) => {
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
        userRecords.forEach(record => {
            // Update max values
            if (record.steps > maxSteps) { maxSteps = record.steps; maxStepsDate = record.date; }
            if (record.duration > maxDuration) { maxDuration = record.duration; maxDurationDate = record.date; }
            if (record.calorieConsumption > maxCalorie) { maxCalorie = record.calorieConsumption; maxCalorieDate = record.date; }
            if (record.distance > maxDistance) { maxDistance = record.distance; maxDistanceDate = record.date; }

            // Summation
            durationSum += record.duration;
            stepSum += record.steps;
            distanceSum += record.distance;
            calorieSum += record.calorieConsumption;
            tutorialCalorieSum += record.tutorialCalorieConsumption || 0;
        });
        return {
            dateArr: userRecords.map(item => formatTimeForCharts(item.date)),
            durationArr: userRecords.map(item => item.duration),
            stepArr: userRecords.map(item => item.steps),
            distanceArr: userRecords.map(item => item.distance),
            calorieArr: userRecords.map(item => item.calorieConsumption),
            tutorialCalorieArr: userRecords.map(item => item.tutorialCalorieConsumption || 0),
            maxValues: { maxSteps, maxDuration, maxCalorie, maxDistance, maxStepsDate, maxDurationDate, maxCalorieDate, maxDistanceDate },
            sums: { durationSum, stepSum, distanceSum, calorieSum, tutorialCalorieSum },
            weeklyData: Object.entries(groupedByWeek).map(([date, data]) => ({ week: format(new Date(date), 'yyyy-MM-dd'), ...data, })),
            monthlyData: Object.entries(groupedByMonth).map(([date, data]) => ({ month: format(new Date(date), 'yyyy-MM'), ...data })),
            yearlyData: Object.entries(groupedByYear).map(([date, data]) => ({ year: format(new Date(date), 'yyyy'), ...data }))
        };
    }, [userRecords]);

    return {
        records: userRecords,
        dateArr,
        durationArr,
        stepArr,
        distanceArr,
        calorieArr,
        tutorialCalorieArr,
        ...maxValues,
        ...sums,
        weeklyData,
        monthlyData,
        yearlyData
    };
}

export default useRecordsByUserId;
