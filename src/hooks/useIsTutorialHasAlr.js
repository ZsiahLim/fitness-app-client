// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { checkTwoDaysIsEqual } from '../utils/checkIsToday';

// // 这是一个自定义Hook
// function useIsTutorialHasAlr(tutorialID) {
//     const { sessions } = useSelector(state => state.session)
//     const { userSelectDay } = useSelector(state => state.calendar)
//     const [isTutorialHasAlr, setIsTutorialHasAlr] = useState(false)

//     const checkIsTodayHasAlr = () => {
//         const TodaysTutorial = sessions.filter(item => {
//             return checkTwoDaysIsEqual(new Date(userSelectDay), new Date(item.date))
//         })
//         const alrHave = TodaysTutorial.some(item => item.tutorial._id == tutorialID)
//         return alrHave
//     }
//     useEffect(() => {
//         let hasAlr = checkIsTodayHasAlr()
//         setIsTutorialHasAlr(hasAlr)
//     }, [userSelectDay, sessions]);


//     // 返回状态和设置方法
//     return isTutorialHasAlr;
// }

// export default useIsTutorialHasAlr;
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { checkTwoDaysIsEqual } from '../utils/checkIsToday';

function useIsTutorialHasAlr(tutorialID) {
    const { sessions } = useSelector(state => state.session)
    const { userSelectDay } = useSelector(state => state.calendar)

    const isTutorialHasAlr = useMemo(() => {
        return sessions.some(session =>
            checkTwoDaysIsEqual(new Date(userSelectDay), new Date(session.date)) && session?.tutorial && session.tutorial._id === tutorialID
        );
    }, [userSelectDay, sessions, tutorialID]);

    return isTutorialHasAlr;
}

export default useIsTutorialHasAlr;
