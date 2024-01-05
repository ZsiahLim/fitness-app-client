import React, { useEffect, useState } from 'react'
import COLORS from '../constants/COLORS'
import { useIntl } from 'react-intl'

export default function Percentage({ currentValue, targetValue }) {
    const intl = useIntl()
    const [lineBackcolor, setLineBackcolor] = useState(COLORS.gray)
    const [percentage, setPercentage] = useState()
    useEffect(() => {
        const percen = currentValue / (targetValue)
        setPercentage(percen.toPrecision(2))
        if (percen > 0.6) {
            setLineBackcolor(COLORS.green)
        }
    }, [currentValue, targetValue])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(to right, rgb(134, 162, 242), rgb(100, 134, 240))', padding: 10, borderRadius: 10, margin: " 10px 0" }}>
            <div style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{intl.formatMessage({ id: 'app.skd.completionPercentage' })}</div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.white }}>{percentage * 100}%</div>
                <div style={{ fontSize: 12, color: COLORS.white }}>{intl.formatMessage({ id: 'app.skd.left' })}({targetValue - currentValue}/{targetValue})</div>
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
