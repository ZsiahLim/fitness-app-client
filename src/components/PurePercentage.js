import React, { useEffect, useState } from 'react'
import COLORS from '../constants/COLORS'
import SIZE from '../constants/SIZE'
import useUserTheme from '../hooks/useUserTheme'
import APPTHEME from '../constants/COLORS/APPTHEME'

export default function PurePercentage({ currentValue, targetValue }) {
    console.log(currentValue, targetValue);
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [lineBackcolor, setLineBackcolor] = useState(COLORS.gray)
    const [percentage, setPercentage] = useState(0)
    useEffect(() => {
        let percen = (parseFloat(currentValue) / parseFloat(targetValue))
        console.log(percen);
        if (percen > 0.6) {
            setLineBackcolor(COLORS.green)
        }
        if (percen > 1) {
            percen = 1
        }
        console.log(currentValue, targetValue, "per", percen);
        setPercentage(percen)
    }, [currentValue, targetValue])
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: SIZE.NormalMargin, justifyContent: 'center', borderRadius: 10 }}>
            <div style={{ height: '10px', width: '100%', backgroundColor: COLORS.backgroundGray, borderRadius: '5px' }}>
                <div style={{
                    backgroundColor: lineBackcolor,
                    height: '100%',
                    borderRadius: '5px',
                    transition: '0.5s',
                    width: `${percentage * 100}%`
                }}></div>
            </div>
            <div style={{ display: 'flex', width: 40, alignItems: 'baseline', justifyContent: 'end' }}>
                {!isNaN(percentage) ? <>
                    <div style={{ fontSize: 18, fontWeight: 'bold', }}>
                        {(percentage * 100).toFixed(0)}
                    </div>
                    <div style={{ fontSize: 12 }}>%</div>
                </> : <></>}
            </div>
        </div >
    )
}
