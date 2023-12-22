import { useState, useEffect, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { formatTimeToChinese } from '../utils/formatTime';
import { isAfterToday } from '../utils/funcs';

// 这是一个自定义Hook
function useCheckUserStatus() {
    const { currentUser } = useSelector(state => state.user, shallowEqual)
    const [muteDate, setMuteDate] = useState(null)
    const [isBlocked, setIsBlocked] = useState(false)

    const isMuted = useMemo(() => {
        console.log('muteee', isAfterToday(muteDate));
        if (!muteDate) return false;  // 如果没有muteDate，则用户未被禁言
        return isAfterToday(muteDate)
    }, [muteDate])

    useEffect(() => {
        console.log('useCheckUserStatus', currentUser.muteDate, "isMu", isMuted);
        currentUser?.muteDate && setMuteDate(currentUser?.muteDate)
        currentUser?.status === 'block' && setIsBlocked(true)
    }, [currentUser]);

    // 返回状态和设置方法
    return { isMuted, muteDate: muteDate ? formatTimeToChinese(muteDate) : null, isBlocked };
}

export default useCheckUserStatus;