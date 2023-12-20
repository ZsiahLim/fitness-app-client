import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkTwoDaysIsEqual } from '../utils/checkIsToday';
import { getsessions } from '../api/session.api';

// 这是一个自定义Hook
function useCompletedTutorials(selectDay) {
    const { sessions } = useSelector(state => state.session)
    const [completedtutorials, setCompletedTutorials] = useState([])
    const [currentSessions, setCurrentSessions] = useState(sessions)

    const getData = async () => {
        await getsessions().then(res => {
            if (res && res?.status !== false) {
                setCurrentSessions(res)
            }
        })
    }
    useEffect(() => {
        getData()
    }, [sessions])
    useEffect(() => {
        let tutorials = [];
        selectDay ? currentSessions.map(session => {
            if (checkTwoDaysIsEqual(new Date(session.date), selectDay)) {
                if (session.completed === true) {
                    console.log("session.tutorial", session.tutorial);
                    if (session.tutorial) {
                        console.log("daozhele", session.otherTypeTutorial);
                        tutorials.push({ ...session.tutorial, sessionID: session._id, session })
                    } else {
                        console.log("other", session.otherTypeTutorial);
                        tutorials.push({ ...session.otherTypeTutorial, sessionID: session._id, session })
                    }
                }
            }
        }) : currentSessions.map(session => {
            if (checkTwoDaysIsEqual(new Date(session.date), new Date())) {
                if (session.completed === true) {
                    console.log("session.tutorial", session.tutorial);
                    if (session.tutorial) {
                        console.log("daozhele");
                        tutorials.push({ ...session.tutorial, sessionID: session._id, session })
                    } else {
                        console.log("other", session);
                        tutorials.push({ ...session.otherTypeTutorial, sessionID: session._id, session })
                    }
                }
            }
        })

        setCompletedTutorials(tutorials)
    }, [selectDay, sessions, currentSessions]);


    // 返回状态和设置方法
    return completedtutorials;
}

export default useCompletedTutorials;
