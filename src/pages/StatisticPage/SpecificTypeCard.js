import { DownOutlined, EditOutlined, RightOutlined } from '@ant-design/icons'
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
import { InputNumber, Modal, Tooltip, message } from 'antd'
import { useDispatch } from 'react-redux'
import { updatecalorietarget, updatedistancetarget, updatedurationtarget, updatesteptarget } from '../../api/user.api'
import { loginSuccess } from '../../redux/userSlice'
import { STATISTICITEMS } from './statisticItems'
import { FormattedMessage } from 'react-intl'
import { useIntl } from 'react-intl'

const SpecificTypeCard = ({ type, title, ExerciseStatisItems, currentValue, targetValue, unit, recordDate, valueArr, dateArr }) => {
    const intl = useIntl()
    const theme = useUserTheme()
    const dispatch = useDispatch()
    const THEME = APPTHEME[theme]
    const [collapsed, setCollapsed] = useState(true)
    const [goal, setGoal] = useState()
    const [goalModalVisible, setGoalModalVisible] = useState(false)
    const handleSetGoal = async () => {
        if (goal) {
            let data;
            switch (type) {
                case STATISTICITEMS.duration:
                    data = {
                        durationTarget: parseInt(goal) * 60
                    }
                    await updatedurationtarget(data).then(res => {
                        if (res.status !== false) {
                            dispatch(loginSuccess(res))
                            setGoalModalVisible(false)
                        } else {
                            message.error(intl.formatMessage({ id: 'error.errorMsg' }))
                        }
                    })
                    break;
                case STATISTICITEMS.step:
                    data = {
                        stepTarget: parseInt(goal)
                    }
                    await updatesteptarget(data).then(res => {
                        if (res.status !== false) {
                            dispatch(loginSuccess(res))
                            setGoalModalVisible(false)
                        } else {
                            message.error(intl.formatMessage({ id: 'error.errorMsg' }))
                        }
                    })
                    break;
                case STATISTICITEMS.distance:
                    data = {
                        distanceTarget: parseFloat(goal) * 1000
                    }
                    await updatedistancetarget(data).then(res => {
                        if (res.status !== false) {
                            dispatch(loginSuccess(res))
                            setGoalModalVisible(false)
                        } else {
                            message.error(intl.formatMessage({ id: 'error.errorMsg' }))
                        }
                    })
                    break;
                case STATISTICITEMS.calorie:
                    data = {
                        calorieTarget: parseInt(goal)
                    }
                    await updatecalorietarget(data).then(res => {
                        if (res.status !== false) {
                            dispatch(loginSuccess(res))
                            setGoalModalVisible(false)
                        } else {
                            message.error(intl.formatMessage({ id: 'error.errorMsg' }))
                        }
                    })
                    break;
                default:
                    message.error(intl.formatMessage({ id: 'error.errorMsg' }))
                    return
            }
        } else {
            message.error(intl.formatMessage({ id: 'error.invalidInput' }))
        }
    }
    return (
        <div style={{ marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', marginBottom: SIZE.NormalMargin, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    {ExerciseStatisItems}
                    <div style={{ fontSize: 14, color: COLORS.commentText }}>{recordDate ? `${intl.formatMessage({ id: 'app.stats.updateSince' })}${formatTimeToChinese(recordDate)}` : intl.formatMessage({ id: 'app.stats.noData' })}</div>
                </div>
                <div
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='buttonHover' style={{ fontSize: 14, display: 'flex', alignItems: 'center', color: COLORS.commentText }}>{intl.formatMessage({ id: 'app.stats.expand' })}</div>
                        <RightOutlined style={{ color: COLORS.commentText }} />
                    </div> :
                        <div className='buttonHover' style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ fontSize: 14, display: 'flex', alignItems: 'center', color: COLORS.commentText }}>{intl.formatMessage({ id: 'app.stats.fold' })}</div>
                            <DownOutlined style={{ color: COLORS.commentText }} />
                        </div>}
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                    <div style={{ fontSize: SIZE.ExtraLargerTitle, fontWeight: 'bold', color: THEME.fontColor }}>{currentValue ? currentValue : "0"}</div>
                    <div style={{ fontWeight: 'bold', color: THEME.fontColor }}>{unit} </div>
                </div>
                <Tooltip placement="top" title={intl.formatMessage({ id: 'app.stats.title.target' }) + title} arrow={false}>
                    <div onClick={() => setGoalModalVisible(true)} className='buttonHover' style={{ color: COLORS.commentText, fontWeight: 'bold', fontSize: 14 }}>/ {targetValue ? targetValue : "--"}{unit}
                        <EditOutlined style={{ fontSize: 12 }} />
                    </div>
                </Tooltip>
            </div>
            <PurePercentage currentValue={currentValue} targetValue={targetValue} />
            {!collapsed && <div style={{ padding: "0 auto" }}>
                <div style={{ height: 20, }}></div>
                <ReactEcharts option={SimpleBarChartOption(dateArr, valueArr, title, null, type === STATISTICITEMS.distance ? targetValue * 1000 : targetValue, THEME.contentColor)} theme={'light'} />
            </div>}
            <Modal open={goalModalVisible} footer={null} title={intl.formatMessage({ id: 'app.stats.title.target' }) + title}
                onOk={() => setGoalModalVisible(false)}
                onCancel={() => setGoalModalVisible(false)}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: SIZE.NormalMargin }}>
                        <div style={{ width: 150 }}>{intl.formatMessage({ id: 'app.stats.title.target' })}{title}({unit})</div>
                        <div style={{}}><InputNumber style={{ width: 200 }} defaultValue={targetValue} min={0} max={40000} step={1} onChange={setGoal} /></div>
                    </div>
                    {((targetValue !== goal) && goal) ? <div
                        className='buttonHover'
                        onClick={handleSetGoal}
                        style={{ fontSize: 14, color: COLORS.white, userSelect: 'none', fontWeight: 'bold', borderRadius: 14, backgroundColor: COLORS.primary, padding: "6px 20px" }}>
                        {intl.formatMessage({ id: 'app.stats.title.update' })}
                    </div> : <div
                        className='buttonHover'
                        style={{ fontSize: 14, color: COLORS.white, userSelect: 'none', fontWeight: 'bold', borderRadius: 14, backgroundColor: COLORS.commentText, padding: "6px 20px" }}>
                        {intl.formatMessage({ id: 'app.stats.title.update' })}
                    </div>}
                </div>
            </Modal>
        </div >)
}

export default SpecificTypeCard