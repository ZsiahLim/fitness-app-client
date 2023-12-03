import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkTwoDaysIsEqual } from '../utils/checkIsToday';

// 这是一个自定义Hook
function useTodayExerciseDuration(selectDay) {
    const { sessions } = useSelector(state => state.session)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        let tutorials = [];
        let sum = 0;
        selectDay ? sessions.map(session => {
            if (checkTwoDaysIsEqual(new Date(session.date), selectDay)) {
                if (session.completed === true) {
                    sum += parseInt(session.exerciseDuration)
                }
            }
        }) : sessions.map(session => {
            if (checkTwoDaysIsEqual(new Date(session.date), new Date())) {
                if (session.completed === true) {
                    sum += parseInt(session.exerciseDuration)
                }
            }
        })

        setDuration(sum)
    }, [selectDay, sessions]);

    // 返回状态和设置方法

    return duration;
}

export default useTodayExerciseDuration;
