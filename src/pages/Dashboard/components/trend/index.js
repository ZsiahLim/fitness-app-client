import React, { useEffect, useState } from 'react'
import ReactEcharts from "echarts-for-react";
import './index.less'
import { Empty, Segmented } from 'antd';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import useRecords from '../../../../hooks/useRecords';
import { BarchartsOptions } from '../../../../utils/BarchartsOptions';
import COLORS from '../../../../constants/COLORS';
import useUserTheme from '../../../../hooks/useUserTheme';
import APPTHEME from '../../../../constants/COLORS/APPTHEME';
import Trend from '../../../../Pic/trend.png'
const DATE = {
    week: "week",
    month: "month",
    year: "year",
}

const ExerciseTrend = () => {
    const { currentTheme } = useSelector(state => state.user)
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const trendDashboardClassname = currentTheme === 'light' ? 'trend-light' : ''
    const trendTitleClassname = currentTheme === 'light' ? 'cardTitle-light' : ''
    const { formatMessage } = useIntl()

    const { weeklyData, monthlyData, yearlyData } = useRecords()
    const [weekDataChatsOption, setWeekDataChatsOption] = useState()
    const [monthDataChatsOption, setMonthDataChatsOption] = useState()
    const [yearDataChatsOption, setYearDataChatsOption] = useState()
    const [selectDateType, setSelectDateType] = useState(DATE.week)
    useEffect(() => {
        const dateArr = weeklyData.map((item) => item.week)
        const durationArr = weeklyData.map((item) => item.duration)
        const calorieArr = weeklyData.map((item) => item.calories)
        const stepArr = weeklyData.map((item) => item.steps)
        const distanceArr = weeklyData.map((item) => item.distance)
        setWeekDataChatsOption(BarchartsOptions(dateArr, durationArr, '时长', calorieArr, '卡路里', stepArr, '步数', distanceArr, '距离'))
    }, [weeklyData])
    useEffect(() => {
        const dateArr = monthlyData.map((item) => item.month)
        const durationArr = monthlyData.map((item) => item.duration)
        const calorieArr = monthlyData.map((item) => item.calories)
        const stepArr = monthlyData.map((item) => item.steps)
        const distanceArr = monthlyData.map((item) => item.distance)
        setMonthDataChatsOption(BarchartsOptions(dateArr, durationArr, '时长', calorieArr, '卡路里', stepArr, '步数', distanceArr, '距离'))
    }, [monthlyData])
    useEffect(() => {
        const dateArr = yearlyData.map((item) => item.year)
        const durationArr = weeklyData.map((item) => item.duration)
        const calorieArr = weeklyData.map((item) => item.calories)
        const stepArr = weeklyData.map((item) => item.steps)
        const distanceArr = weeklyData.map((item) => item.distance)
        setYearDataChatsOption(BarchartsOptions(dateArr, durationArr, '时长', calorieArr, '卡路里', stepArr, '步数', distanceArr, '距离'))
    }, [yearlyData])
    const typeOptions = {
        week: { value: 'week', label: formatMessage({ id: 'Weekly' }) },
        month: { value: 'month', label: formatMessage({ id: 'Monthly' }) },
        year: { value: 'year', label: formatMessage({ id: 'Yearly' }) },
    }
    return (
        <div className={`trend ${trendDashboardClassname}`} style={{ padding: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className={`cardTitle ${trendTitleClassname}`}>
                    <img src={Trend} style={{ height: 24, width: 24 }} />
                    <div>{formatMessage({ id: 'worktrend' })}</div>
                </div>
                <Segmented defaultValue={typeOptions.week.value} onChange={(type) => setSelectDateType(type)} options={[typeOptions.week, typeOptions.month, typeOptions.year]} />
            </div>

            {(weeklyData.length === 0 && monthlyData.length === 0 && yearlyData.length === 0) ? <div
                style={{
                    height: 200,
                    borderRadius: 16,
                    backgroundColor: THEME.backgroundColor,
                    display: 'flex',
                    margin: '10px 10px',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Empty description={false} />
                <div style={{ fontSize: 14, color: COLORS.commentText }}>使用iphone来记录你的步数日常训练吧</div>
            </div>
                : <div style={{ position: 'relative', margin: '20px auto' }}>
                    {(selectDateType == DATE.week && weekDataChatsOption) && <ReactEcharts option={weekDataChatsOption} theme={'light'} />}
                    {(selectDateType == DATE.month && monthDataChatsOption) && <ReactEcharts option={monthDataChatsOption} theme={'light'} />}
                    {(selectDateType == DATE.year && yearDataChatsOption) && <ReactEcharts option={yearDataChatsOption} theme={'light'} />}
                </div>
            }
        </div>
    )
}

export default ExerciseTrend
