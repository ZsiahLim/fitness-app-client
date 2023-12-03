import React, { useEffect, useState } from 'react'
import COLORS from '../constants/COLORS'
import SIZE from '../constants/SIZE'
import useUserTheme from '../hooks/useUserTheme'
import APPTHEME from '../constants/COLORS/APPTHEME'

export default function Percentage({ currentValue, targetValue }) {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [lineBackcolor, setLineBackcolor] = useState(COLORS.gray)
    const [percentage, setPercentage] = useState()
    useEffect(() => {
        const percen = currentValue / (targetValue)
        console.log("percen", percen);
        setPercentage(percen.toPrecision(2))
        if (percen > 0.6) {
            setLineBackcolor(COLORS.green)
        }
    }, [currentValue, targetValue])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: currentTheme.backgroundColor, padding: 10, borderRadius: 10, margin: " 10px 0" }}>
            <div style={{ color: currentTheme.fontColor, }}>任务完成比例</div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 16, fontWeight: 'bold', color: currentTheme.fontColor }}>{percentage * 100}%</div>
                <div style={{ fontSize: 12, color: currentTheme.fontColor }}>剩余({targetValue - currentValue}/{targetValue})</div>
            </div>
            <div style={{ height: '10px', width: '100%', backgroundColor: COLORS.white, borderRadius: '5px' }}>
                <div style={{
                    backgroundColor: lineBackcolor,
                    height: '100%',
                    borderRadius: '5px',
                    transition: '0.5s',
                    width: `${percentage * 100}%`
                }}></div>
            </div>
        </div >
    )
}
