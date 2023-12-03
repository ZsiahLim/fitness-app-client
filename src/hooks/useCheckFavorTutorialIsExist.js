import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// 这是一个自定义Hook
function useCheckFavorTutorialIsExist(tutorialID) {
    const { currentUser } = useSelector(state => state.user)
    const [favorTutorials, setFavorTutorials] = useState(currentUser?.favoriteTutorials)
    const [isExist, setIsExist] = useState(false)
    useEffect(() => {
        if (favorTutorials.length === 0 || !favorTutorials) {
            // console.log(favorTutorials);
            setIsExist(false)
        } else {
            const isexist = favorTutorials.some(tutorialId => tutorialId === tutorialID)
            setIsExist(isexist)
        }
    }, [currentUser]);
    // 返回状态和设置方法
    return isExist;
}

export default useCheckFavorTutorialIsExist;
