import React from 'react'
import useUserTheme from '../../hooks/useUserTheme'
import APPTHEME from '../../constants/COLORS/APPTHEME'
import { useNavigate } from 'react-router-dom'
import useRecordsAnalysis from '../../hooks/useRecordsAnalysis'
import { message } from 'antd'
import SIZE from '../../constants/SIZE'
import { CalendarFilled, RightOutlined } from '@ant-design/icons'
import COLORS from '../../constants/COLORS'
import { secToSpecificMin } from '../../utils/funcs'

const CALORIE_TYPE = {
    tutorial: "Tutorial Calorie Consumption",
    total: "Calorie Consumption"
}

function UserRecordSum({ records }) {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const navigateTo = useNavigate()
    const { durationSum, calorieSum, tutorialCalorieSum } = useRecordsAnalysis(records)
    const handleShowDetail = (title, value) => {
        message.info(`${title}: ${value}`)
    }
    return (
        <div style={{ marginBottom: SIZE.NormalMargin, backgroundColor: currentTheme.backgroundColor, borderRadius: 12, padding: "10px 14px" }}>
            {/* title */}
            <div style={{ display: 'flex', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <CalendarFilled style={{ color: COLORS.green }} />
                    <div style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.green }}>运动记录</div>
                </div>
                <div onClick={() => {
                    // navigate('TodaysExercises')s
                }} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {/* {ICON.right(18, COLORS.gray)} */}
                    <RightOutlined style={{ color: COLORS.gray }} />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ color: COLORS.commentText, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>总运动时长</div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                        {durationSum ? <div style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>{secToSpecificMin(durationSum)}</div> :
                            <div style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>0</div>}
                        <div style={{ color: currentTheme.fontColor, fontSize: 14, fontWeight: 'bold' }}>分钟</div>
                    </div>
                </div>
                <div style={{ width: 10 }}></div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: COLORS.commentText, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>总运动消耗</div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                        <div
                            onClick={() => { handleShowDetail(CALORIE_TYPE.total, calorieSum ? calorieSum : 0) }}
                        >
                            {calorieSum ? <div style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>{calorieSum}</div> :
                                <div style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>0</div>}
                        </div>
                        <div>+</div>
                        <div onClick={() => { handleShowDetail(CALORIE_TYPE.tutorial, tutorialCalorieSum ? tutorialCalorieSum : 0) }}>
                            {tutorialCalorieSum ? <div style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>{tutorialCalorieSum}</div> :
                                <div style={{ color: currentTheme.fontColor, fontSize: 26, fontWeight: 'bold' }}>0</div>}
                        </div>
                        <div style={{ color: currentTheme.fontColor, fontSize: 14, fontWeight: 'bold' }}>千卡</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserRecordSum