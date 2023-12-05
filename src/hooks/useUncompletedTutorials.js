import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkTwoDaysIsEqual } from '../utils/checkIsToday';
import { getsessions } from '../api/session.api';


// 这是一个自定义Hook
function useUncompletedTutorials(selectDay) {
    const { sessions } = useSelector(state => state.session)
    const [unCompletedtutorials, setUnCompletedTutorials] = useState([])
    const [currentSessions, setCurrentSessions] = useState(sessions)

    const getData = async () => {
        await getsessions().then(res => {
            if (res.status !== false) {
                setCurrentSessions(res)
            }
        })
    }
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        let tutorials = []
        selectDay ?
            currentSessions.map(session => {
                if (checkTwoDaysIsEqual(new Date(session.date), selectDay)) {
                    if (session.completed === false) {
                        tutorials.push({ ...session.tutorial, sessionID: session._id, session })
                    }
                }
            }) : currentSessions.map(session => {
                if (checkTwoDaysIsEqual(new Date(session.date), new Date())) {
                    if (session.completed === false) {
                        tutorials.push({ ...session.tutorial, sessionID: session._id, session })
                    }
                }
            })
        setUnCompletedTutorials(tutorials)
    }, [selectDay, currentSessions]);

    // 返回状态和设置方法
    return unCompletedtutorials;
}

export default useUncompletedTutorials