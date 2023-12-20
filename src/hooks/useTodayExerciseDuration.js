import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkTwoDaysIsEqual } from '../utils/checkIsToday';

// 这是一个自定义Hook
function useTodayExerciseDuration(selectDay) {
    const { sessions } = useSelector(state => state.session)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        let sum = 0;
        selectDay ? sessions.map(session => {
            console.log("sesssssss", session);
            if (checkTwoDaysIsEqual(new Date(session.date), selectDay)) {
                console.log("sesssssss", session);
                if (session.completed === true && session.exerciseDuration) {
                    console.log("session.exerciseDuration", session.exerciseDuration);
                    sum += parseInt(session.exerciseDuration)
                }
            }
        }) : sessions.map(session => {
            console.log("sesssssss", session);
            if (checkTwoDaysIsEqual(new Date(session.date), new Date())) {
                console.log("sesssssss", session);
                if (session.completed === true && session.exerciseDuration) {
                    console.log("session.exerciseDuration", session.exerciseDuration);
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
