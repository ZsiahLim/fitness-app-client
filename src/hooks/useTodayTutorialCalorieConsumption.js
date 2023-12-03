import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkTwoDaysIsEqual } from '../utils/checkIsToday';

// 这是一个自定义Hook
function useTodayTutorialCalorieConsumption(selectDay) {
    const { sessions } = useSelector(state => state.session)
    const [calorie, setCalorie] = useState(0.0)

    useEffect(() => {
        let sum = 0;
        sessions.forEach(session => {
            if (checkTwoDaysIsEqual(new Date(session.date), selectDay ? selectDay : new Date())) {
                if (session.completed === true) {
                    sum += session?.calorieConsumption ? parseFloat(session.calorieConsumption) : 0
                }
            }
        })
        setCalorie(sum)
    }, [selectDay, sessions]);

    // 返回状态和设置方法
    return calorie;
}

export default useTodayTutorialCalorieConsumption;
