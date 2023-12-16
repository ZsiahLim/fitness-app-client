import { CalendarTwoTone, DeleteOutlined, DownOutlined, EditOutlined, FileAddOutlined, InfoCircleOutlined, RightOutlined } from '@ant-design/icons'
import COLORS from '../../constants/COLORS'
import APPTHEME from '../../constants/COLORS/APPTHEME'
import SIZE from '../../constants/SIZE'
import useUserTheme from '../../hooks/useUserTheme'
import './index.less'
import PurePercentage from '../../components/PurePercentage'
import { useState } from 'react'
import { formatTimeToChinese } from '../../utils/formatTime'
import ReactEcharts from "echarts-for-react";
import SimpleBarChartOption from '../../utils/SimpleBarChartOption'


const SpecificTypeCard = ({ title, titleColor, icon, currentValue, targetValue, unit, recordDate, valueArr, dateArr }) => {
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const [collapsed, setCollapsed] = useState(false)
    return (
        <div style={{ marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', marginBottom: SIZE.NormalMargin, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    {/* icon */}
                    <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: 26, height: 26, backgroundColor: titleColor, borderRadius: 9 }}>
                        {icon}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 'bold', color: titleColor }}>{title}</div>
                    <div style={{ fontSize: 14, color: COLORS.commentText }}>更新于{formatTimeToChinese(recordDate)}</div>
                </div>
                <div
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ fontSize: 14, display: 'flex', alignItems: 'center', color: COLORS.commentText }}>展开</div>
                        <RightOutlined style={{ color: COLORS.commentText }} />
                    </div> :
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ fontSize: 14, display: 'flex', alignItems: 'center', color: COLORS.commentText }}>折叠</div>
                            <DownOutlined style={{ color: COLORS.commentText }} />
                        </div>}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                    <div style={{ fontSize: SIZE.ExtraLargerTitle, fontWeight: 'bold', color: THEME.fontColor }}>{currentValue}</div>
                    <div style={{ fontWeight: 'bold', color: THEME.fontColor }}>{unit} </div>
                </div>
                <div style={{ color: COLORS.commentText, fontWeight: 'bold' }}>/ {targetValue ? targetValue : "--"}{unit}</div>
            </div>
            <PurePercentage currentValue={currentValue} targetValue={targetValue} />
            {!collapsed && <div style={{ padding: "0 auto" }}>
                <div style={{ height: 20, }}></div>
                <ReactEcharts option={SimpleBarChartOption(dateArr, valueArr, title, null, targetValue)} theme={'light'} />
            </div>}
        </div >)
}

export default SpecificTypeCard