import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

// 这是一个自定义Hook
function useUserTheme() {
    const { currentTheme } = useSelector(state => state.user)
    const [THEME, setTHEME] = useState('light')

    const theme = useMemo(() => THEME, [THEME])
    useEffect(() => {
        currentTheme && setTHEME(currentTheme)
    }, [currentTheme]);

    // 返回状态和设置方法
    return theme;
}

export default useUserTheme;
