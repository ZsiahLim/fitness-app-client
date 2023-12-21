import { CalendarTwoTone, DeleteOutlined, DownOutlined, EditOutlined, FileAddOutlined, InfoCircleOutlined, RightOutlined } from '@ant-design/icons'
import COLORS from '../../constants/COLORS'
import APPTHEME from '../../constants/COLORS/APPTHEME'
import SIZE from '../../constants/SIZE'
import useUserTheme from '../../hooks/useUserTheme'
import './index.less'
import { useDispatch, useSelector } from 'react-redux'
import useMeasurement from '../../hooks/useMeasurement'
import { useEffect, useState } from 'react'
import { formatTimeForChartSoloItem, formatTimeToChinese, formatTimeToChineseDetail } from '../../utils/formatTime'
import useUserTarget from '../../hooks/useUserTarget'
import { BMISort } from '../../utils/BMICalculate'
import { InputNumber, Modal, message } from 'antd'
import ReactEcharts from "echarts-for-react";
import SimpleLineChartOption from '../../utils/SimpleLineChartOption'
import useMeasurements from '../../hooks/useMeasurements'
import { deletemeasurement } from '../../api/measurement'
import { loginSuccess } from '../../redux/userSlice'
import { setLatestMeasurement, setMeasurements } from '../../redux/MeasurementSlice'
import UploadMeasurementModal from '../../components/MeasurementModals/uploadModal'
import EditMeasurementModal from '../../components/MeasurementModals/EditMeasurementModal'
import useRecord from '../../hooks/useRecord'
import { isEmptyObj, secToSpecificMin } from '../../utils/funcs'
import useRecords from '../../hooks/useRecords'
import SpecificTypeCard from './SpecificTypeCard'
import UserBestRecord from '../../components/UserBestRecord'
import { updateweighttarget } from '../../api/user.api'
import ExerciseTrend from '../Dashboard/components/trend'
import { STATISTICITEMS } from './statisticItems'


export default function StatisticsPage() {
    const { currentTheme } = useSelector((state) => state.user)
    const lightPageClassname = currentTheme === 'light' ? 'StatisticsPage-light' : ''
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const { latestRecord, todayRecord } = useRecord()
    const [recordDate, setRecordDate] = useState()
    const [stepNum, setStepNum] = useState(null)
    const [calorieNum, setCalorieNum] = useState(null)
    const [distanceNum, setDistanceNum] = useState(null)
    const [durationNum, setDurationNum] = useState(null)
    const { stepTarget, calorieTarget, distanceTarget, durationTarget } = useUserTarget()
    useEffect(() => {
        if (isEmptyObj(todayRecord)) {
            if (!isEmptyObj(latestRecord)) {
                setCalorieNum(latestRecord.calorieConsumption)
                setStepNum(latestRecord.steps)
                setDurationNum(latestRecord.duration)
                setDistanceNum(latestRecord.distance)
                setRecordDate(formatTimeToChinese(latestRecord.updatedAt))
            }
        } else {
            setCalorieNum(todayRecord.calorieConsumption)
            setStepNum(todayRecord.steps)
            setDurationNum(todayRecord.duration)
            setDistanceNum(todayRecord.distance)
            setRecordDate(formatTimeToChinese(todayRecord.updatedAt))
        }
    }, [todayRecord, latestRecord])
    const { durationArr, stepArr, calorieArr, distanceArr, dateArr, records } = useRecords()

    return (
        <div className={`StatisticsPage ${lightPageClassname}`}>
            <div style={{ display: 'flex', flex: 1, gap: SIZE.NormalMargin }}>
                <div className='StatisticsPage-container' style={{ width: '100%', height: '100%', overflow: 'auto', flex: 1 }}>
                    <TodayExercise />
                    <SpecificTypeCard type={STATISTICITEMS.distance} valueArr={distanceArr} dateArr={dateArr} recordDate={recordDate} title={"跑步步行距离"} titleColor={COLORS.primary} currentValue={distanceNum ? (distanceNum / 1000).toFixed(2) : "0"} targetValue={distanceTarget ? (distanceTarget / 1000).toFixed(2) : null} unit={"km"} />
                    <SpecificTypeCard type={STATISTICITEMS.step} valueArr={stepArr} dateArr={dateArr} recordDate={recordDate} title={"步数"} titleColor={COLORS.primary} currentValue={stepNum} targetValue={stepTarget ? stepTarget : null} unit={"步"} />
                    <SpecificTypeCard type={STATISTICITEMS.calorie} valueArr={calorieArr} dateArr={dateArr} recordDate={recordDate} title={"卡路里"} titleColor={COLORS.colorieOrange} currentValue={calorieNum} targetValue={calorieTarget ? calorieTarget : null} unit={"千卡"} />
                    <SpecificTypeCard type={STATISTICITEMS.duration} valueArr={durationArr} dateArr={dateArr} recordDate={recordDate} title={"健身"} titleColor={COLORS.purple} currentValue={durationNum ? secToSpecificMin(durationNum) : "0"} targetValue={durationTarget ? secToSpecificMin(durationTarget) : null} unit={"分钟"} />
                    <ExerciseOverview />
                    <UserBestRecord records={records} />
                    <WholeTrend />
                    <NoMore />
                </div>
                <div className='StatisticsPage-container' style={{ width: '100%', height: '100%', overflow: 'auto', flex: 1 }}>
                    <BodyMatricOverviewCard />
                    <MeasurementRecordsCard />
                    <WeightBMICard />
                    <HeightBFRCard />
                    <NoMore />
                </div>
            </div>
        </div >
    )
}
const NoMore = () => {
    return <div style={{ display: 'flex', justifyContent: 'center', fontSize: 12, color: COLORS.commentText }}>--没有更多内容了--</div>
}

const WholeTrend = () => {
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    return <div style={{ marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
        <ExerciseTrend />
    </div>

}

const MeasurementRecordsCard = () => {
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(true)
    const { latestMeasurement, allMeasurements } = useMeasurement()
    const { weightArr, dateArr, BMIArr } = useMeasurements(allMeasurements)
    const handleDeleteMeasurement = async (measurementID) => {
        await deletemeasurement(measurementID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res.user))
                dispatch(setLatestMeasurement(res.measurement))
                dispatch(setMeasurements(res.updatedMeasurements))
            } else {
                message.error("出现异常请稍后重试")
            }
        })
    }
    const handleEditMeasurement = (measurement) => {
        setSelectedMeasurement(measurement)
        setUpdateMeasurementModalVisible(true)
    }
    const [UploadMeasurementModalVisible, setUploadMeasurementModalVisible] = useState(false)
    const [UpdateMeasurementModalVisible, setUpdateMeasurementModalVisible] = useState(false)
    const [selectedMeasurement, setSelectedMeasurement] = useState()
    return (
        <div style={{ marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', }}>
                {/* <DashboardOutlined /> */}
                <div style={{ fontSize: 16, fontWeight: 'bold', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: SIZE.NormalMargin }}>
                        <div>
                            数据记录: 共{allMeasurements.length}条
                        </div>
                        <div style={{ color: COLORS.commentText, fontSize: 14 }}>{collapsed ? <div onClick={() => setCollapsed(false)}>展开 <RightOutlined /></div> : <div onClick={() => setCollapsed(true)}>折叠 <DownOutlined /></div>}</div>
                    </div>
                    <div onClick={() => setUploadMeasurementModalVisible(true)} style={{ backgroundColor: COLORS.primary, padding: "4px 10px", borderRadius: 6, }}><div style={{ fontSize: 14, color: COLORS.white, gap: 6, display: 'flex', alignItems: 'center', }}><div>添加数据</div><FileAddOutlined /></div></div>
                </div>
            </div>
            {!collapsed && <div style={{ marginTop: SIZE.NormalMargin, }}>
                {allMeasurements.map((item, index) => <div
                    key={item?._id ? item._id : index}
                    style={{ padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, backgroundColor: THEME.backgroundColor, marginBottom: SIZE.NormalMargin }}
                >
                    <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: 14, fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: 2 }}>{formatTimeForChartSoloItem(item.date)}<div style={{ fontWeight: 'normal' }}>数据</div></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: SIZE.NormalMargin, color: COLORS.commentText }}>
                            <div onClick={() => handleEditMeasurement(item)}><EditOutlined /></div>
                            <div onClick={() => handleDeleteMeasurement(item._id)}><DeleteOutlined /></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 2 }}><div style={{ fontSize: 14 }}>体重:</div><div style={{ fontWeight: 'bold', fontSize: 18 }}>{item?.weight ? item.weight : "--"}</div><div style={{ fontSize: 12 }}>kg</div></div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 2 }}><div style={{ fontSize: 14 }}>身高:</div><div style={{ fontWeight: 'bold', fontSize: 18 }}>{item?.height ? item.height : "--"}</div><div style={{ fontSize: 12 }}>cm</div></div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 2 }}><div style={{ fontSize: 14 }}>BMI:</div><div style={{ fontWeight: 'bold', fontSize: 18 }}>{item?.BMI ? item.BMI : "--"}</div><div style={{ fontSize: 12 }}></div></div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 2 }}><div style={{ fontSize: 14 }}>BFR:</div><div style={{ fontWeight: 'bold', fontSize: 18 }}>{item?.bodyFatRate ? item.bodyFatRate : "--"}</div><div style={{ fontSize: 12 }}>%</div></div>
                    </div>
                </div>)}
            </div>}
            <UploadMeasurementModal visible={UploadMeasurementModalVisible} setVisible={setUploadMeasurementModalVisible} />
            <EditMeasurementModal measurement={selectedMeasurement} visible={UpdateMeasurementModalVisible} setVisible={setUpdateMeasurementModalVisible} />
        </div>)
}



const WeightBMICard = () => {
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const { weightTarget } = useUserTarget()
    const { latestMeasurement, allMeasurements } = useMeasurement()
    const { weightArr, dateArr, BMIArr } = useMeasurements(allMeasurements)
    return <div style={{ display: 'flex', gap: SIZE.NormalMargin }}>
        <div style={{ flex: 1, marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
            <div style={{ fontSize: 18, fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: 4, }}>体重<div style={{ fontSize: 12, fontWeight: 'normal' }}>(kg)</div></div>
            <ReactEcharts option={SimpleLineChartOption(dateArr, weightArr, 'Weight', null, weightTarget)} theme={'light'} />
        </div>
        <div style={{ flex: 1, marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
            <div style={{ fontSize: 18, fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: 4, }}>BMI</div>
            <ReactEcharts option={SimpleLineChartOption(dateArr, BMIArr, 'BMI',)} theme={'light'} />
        </div>
    </div>
}

const HeightBFRCard = () => {
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const { latestMeasurement, allMeasurements } = useMeasurement()
    const { bodyFatRateArr, dateArr, heightArr } = useMeasurements(allMeasurements)
    return <div style={{ display: 'flex', gap: SIZE.NormalMargin }}>
        <div style={{ flex: 1, marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
            <div style={{ fontSize: 18, fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: 4, }}>体脂率</div>
            <ReactEcharts option={SimpleLineChartOption(dateArr, bodyFatRateArr, 'BodyFatRate',)} theme={'light'} />
        </div>
        <div style={{ flex: 1, marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
            <div style={{ fontSize: 18, fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: 4, }}>身高</div>
            <ReactEcharts option={SimpleLineChartOption(dateArr, heightArr, 'Height',)} theme={'light'} />
        </div>
    </div>
}

const BodyMatricOverviewCard = () => {
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const { latestMeasurement } = useMeasurement()
    const { weightTarget } = useUserTarget()
    const [BMIdetailShow, setBMIdetailShow] = useState(false)
    const [EditWeightTargetShow, setEditWeightTargetShow] = useState(false)
    const [newWeightTarget, setNewWeightTarget] = useState(weightTarget);
    const dispatch = useDispatch()
    const handleUploadWeightTarget = async () => {
        if (newWeightTarget) {
            const data = {
                weightTarget: parseFloat(newWeightTarget),
            }
            await updateweighttarget(data).then(res => {
                if (res.status !== false) {
                    dispatch(loginSuccess(res))
                    message.success("设置目标体重成功！")
                } else {
                    message.error("出现异常请稍后重试")
                }
            })
        } else {
            message.error("请输入完成信息")
        }
    }
    const handleInputWeight = (value) => {
        setNewWeightTarget(value)
    }
    return <div style={{ marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
        {/* icon */}
        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
            {/* <DashboardOutlined /> */}
            <div style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.green }}>身高体重</div>
            <div style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.commentText }}>{latestMeasurement?.updatedAt && `最新一次记录于${formatTimeToChineseDetail(latestMeasurement.updatedAt)}`}</div>
        </div>
        <div style={{ marginTop: SIZE.NormalMargin }}>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, display: 'flex', gap: 2, }}><>体重/目标体重</><EditOutlined onClick={() => setEditWeightTargetShow(true)} style={{ fontSize: 10 }} /></div>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <div style={{ fontSize: 22, fontWeight: 'bold' }}>{latestMeasurement?.weight ? latestMeasurement.weight : "--"}</div>
                        </div>
                        <div>/</div>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <div style={{ fontSize: 16, fontWeight: 'bold' }}>{weightTarget ? weightTarget : "--"}</div>
                            <div style={{ fontSize: 12, }}>&nbsp;kg</div>
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}><>BMI水平</> <InfoCircleOutlined onClick={() => setBMIdetailShow(true)} style={{ fontSize: 10 }} /></div>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <div style={{ fontSize: 20, fontWeight: 'bold' }}>{latestMeasurement?.BMI ? BMISort(latestMeasurement?.BMI) : "--"}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', marginTop: SIZE.NormalMargin }}>
                <MetricItem title={"BMI"} value={latestMeasurement?.BMI} />
                <MetricItem title={"体脂率"} value={latestMeasurement?.bodyFatRate} unit={"%"} />
                <MetricItem title={"身高"} value={latestMeasurement?.height} unit={"cm"} />
            </div>
        </div>
        <Modal open={BMIdetailShow} footer={null} title="BMI"
            onOk={() => setBMIdetailShow(false)}
            onCancel={() => setBMIdetailShow(false)}>
            <div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: THEME.fontColor }}>
                        BMI（Body Mass Index，身体质量指数）是通过体重（千克）除以身高（米）的平方来计算的。
                    </div>
                    <div style={{ color: THEME.fontColor }}>
                        根据世界卫生组织（WHO）的标准，BMI可以分为几个不同的等级，用以评估个体的体重状况：
                    </div>
                    <div style={{ color: THEME.fontColor }}>
                        低于18.5：体重过轻
                    </div>
                    <div style={{ color: THEME.fontColor }}>
                        18.5至24.9：正常范围
                    </div>
                    <div style={{ color: THEME.fontColor }}>
                        25至29.9：超重
                    </div>
                    <div style={{ color: THEME.fontColor }}>
                        30及以上：肥胖
                    </div>
                </div>
            </div>
        </Modal>
        <Modal open={EditWeightTargetShow} footer={null} title="目标体重"
            onOk={() => setEditWeightTargetShow(false)}
            onCancel={() => setEditWeightTargetShow(false)}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: SIZE.NormalMargin }}>
                    <div style={{ width: 100 }}>目标体重(kg)</div>
                    <div style={{}}><InputNumber style={{ width: 200 }} defaultValue={weightTarget} min={30} max={200} step={0.01} onChange={handleInputWeight} /></div>
                </div>
                {((weightTarget !== newWeightTarget) && newWeightTarget) ? <div
                    className='buttonHover'
                    onClick={handleUploadWeightTarget}
                    style={{ fontSize: 14, color: COLORS.white, userSelect: 'none', fontWeight: 'bold', borderRadius: 14, backgroundColor: COLORS.primary, padding: "6px 20px" }}>
                    设置
                </div> :
                    <div
                        className='buttonHover'
                        style={{ fontSize: 14, color: COLORS.white, userSelect: 'none', fontWeight: 'bold', borderRadius: 14, backgroundColor: COLORS.commentText, padding: "6px 20px" }}>
                        设置
                    </div>}
            </div>
        </Modal>
    </div>
}

const MetricItem = ({ title, value, unit }) => {
    return <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12 }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <div style={{ fontSize: 20, fontWeight: 'bold' }}>{value ? value : "--"}</div>
            <div style={{ fontSize: 12, }}>{unit && unit}</div>
        </div>
    </div>
}

// const SpecificTypeCard = ({ title, titleColor, icon, currentValue, targetValue, unit, recordDate, valueArr, dateArr }) => {
//     console.log("valueArr", valueArr, 'dateArr', dateArr);
//     const theme = useUserTheme()
//     const THEME = APPTHEME[theme]
//     const [collapsed, setCollapsed] = useState(false)
//     return (
//         <div style={{ marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
//             <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
//                 <div style={{ display: 'flex', marginBottom: SIZE.NormalMargin, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
//                     {/* icon */}
//                     <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: 26, height: 26, backgroundColor: titleColor, borderRadius: 9 }}>
//                         {icon}
//                     </div>
//                     <div style={{ fontSize: 16, fontWeight: 'bold', color: titleColor }}>{title}</div>
//                     <div style={{ fontSize: 14, color: COLORS.commentText }}>更新于{formatTimeToChinese(recordDate)}</div>
//                 </div>
//                 <div
//                     onClick={() => setCollapsed(!collapsed)}
//                 >
//                     {collapsed ? <div style={{ display: 'flex', alignItems: 'center' }}>
//                         <div style={{ fontSize: 14, display: 'flex', alignItems: 'center', color: COLORS.commentText }}>展开</div>
//                         <RightOutlined style={{ color: COLORS.commentText }} />
//                     </div> :
//                         <div style={{ display: 'flex', alignItems: 'center' }}>
//                             <div style={{ fontSize: 14, display: 'flex', alignItems: 'center', color: COLORS.commentText }}>折叠</div>
//                             <DownOutlined style={{ color: COLORS.commentText }} />
//                         </div>}
//                 </div>
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
//                 <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
//                     <div style={{ fontSize: SIZE.ExtraLargerTitle, fontWeight: 'bold', color: THEME.fontColor }}>{currentValue}</div>
//                     <div style={{ fontWeight: 'bold', color: THEME.fontColor }}>{unit} </div>
//                 </div>
//                 <div style={{ color: COLORS.commentText, fontWeight: 'bold' }}>/ {targetValue ? targetValue : "--"}{unit}</div>
//             </div>
//             <PurePercentage currentValue={currentValue} targetValue={targetValue} />
//             {!collapsed && <div style={{ padding: 19, display: 'flex', alignItems: 'center' }}>
//                 {(valueArr && dateArr) && <ReactEcharts option={SimpleLineChartOption(dateArr, valueArr, 'nihao')} theme={'light'} />}
//             </div>}
//         </div >)
// }

const TodayExercise = () => {
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const { todayRecord } = useRecord()
    const [recordDate, setRecordDate] = useState()
    const [stepNum, setStepNum] = useState(null)
    const [calorieNum, setCalorieNum] = useState(null)
    const [distanceNum, setDistanceNum] = useState(null)
    const [durationNum, setDurationNum] = useState(null)
    const [tutorialCalorieConsumption, setTutorialCalorieConsumption] = useState(null)
    useEffect(() => {
        if (!isEmptyObj(todayRecord)) {
            todayRecord?.calorieConsumption && setCalorieNum(todayRecord.calorieConsumption)
            todayRecord?.steps && setStepNum(todayRecord.steps)
            todayRecord?.duration && setDurationNum(todayRecord.duration)
            todayRecord?.distance && setDistanceNum(todayRecord.distance)
            todayRecord?.updatedAt && setRecordDate(formatTimeToChinese(todayRecord.updatedAt))
            todayRecord?.tutorialCalorieConsumption && setTutorialCalorieConsumption(todayRecord.tutorialCalorieConsumption)
        }
    }, [todayRecord])
    return <div style={{ borderRadius: SIZE.CardBorderRadius, backgroundColor: THEME.contentColor, padding: SIZE.NormalMargin, marginBottom: SIZE.NormalMargin }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: COLORS.green, fontWeight: 'bold' }}>
            <CalendarTwoTone twoToneColor={COLORS.green} />
            <div>今日运动记录</div>
            <div style={{ fontSize: 14, color: COLORS.commentText, fontWeight: 'normal' }}>更新于{recordDate ? formatTimeToChinese(recordDate) : "--"}</div>
        </div>
        <div style={{ display: 'flex', marginTop: SIZE.NormalMargin }}>
            <div style={{ flex: 1, }}>
                <div style={{ color: COLORS.commentText, fontSize: 14, fontWeight: 'bold', }}>
                    运动时长
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <div style={{ fontSize: 20, fontWeight: 'bold' }}>{durationNum ? secToSpecificMin(durationNum) : "0"}</div>
                    <div style={{ fontSize: 12 }}>min</div>
                </div>
            </div>
            <div style={{ flex: 1, }}>
                <div style={{ color: COLORS.commentText, fontSize: 14, fontWeight: 'bold', }}>
                    运动消耗
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <div style={{ fontSize: 20, fontWeight: 'bold' }}>{calorieNum ? calorieNum : '--'}</div>
                    <div style={{ fontSize: 14 }}>+</div>
                    <div style={{ fontSize: 20, fontWeight: 'bold' }}>{tutorialCalorieConsumption ? tutorialCalorieConsumption : "--"}</div>
                    <div style={{ fontSize: 12 }}>unit</div>
                </div>
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SIZE.NormalMargin, marginTop: SIZE.NormalMargin }}>
            <div style={{ display: 'flex', gap: SIZE.NormalMargin }}>
                <ExerciseItem title={'跑步步行'} titleColor={COLORS.primary} value={distanceNum ? (distanceNum / 1000).toFixed(2) : "--"} unit={'公里'} />
                <ExerciseItem title={'步数'} titleColor={COLORS.primary} value={stepNum ? stepNum : "--"} unit={'步'} />
            </div>
            <div style={{ display: 'flex', gap: SIZE.NormalMargin }}>
                <ExerciseItem title={'卡路里'} titleColor={COLORS.colorieOrange} value={calorieNum ? calorieNum : "--"} unit={'千卡'} />
                <ExerciseItem title={'健身'} titleColor={COLORS.purple} value={durationNum ? secToSpecificMin(durationNum) : "--"} unit={'分钟'} />
            </div>
        </div>
    </div>
}

const ExerciseOverview = () => {
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const { durationSum, calorieSum, distanceSum, stepSum } = useRecords()
    return <div style={{ borderRadius: SIZE.CardBorderRadius, backgroundColor: THEME.contentColor, padding: SIZE.NormalMargin, marginBottom: SIZE.NormalMargin }}>
        <div style={{ fontWeight: 'bold', fontSize: 16, }}>各项运动数据汇总</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SIZE.NormalMargin, marginTop: SIZE.NormalMargin }}>
            <div style={{ display: 'flex', gap: SIZE.NormalMargin }}>
                <ExerciseItem title={'跑步步行'} titleColor={COLORS.primary} value={distanceSum ? (distanceSum / 1000).toFixed(2) : "--"} unit={'公里'} />
                <ExerciseItem title={'步数'} titleColor={COLORS.primary} value={stepSum ? stepSum : "--"} unit={'步'} />
            </div>
            <div style={{ display: 'flex', gap: SIZE.NormalMargin }}>
                <ExerciseItem title={'卡路里'} titleColor={COLORS.colorieOrange} value={calorieSum ? calorieSum : "--"} unit={'千卡'} />
                <ExerciseItem title={'健身'} titleColor={COLORS.purple} value={durationSum ? secToSpecificMin(durationSum) : "--"} unit={'分钟'} />
            </div>
        </div>
    </div>
}

const ExerciseItem = ({ title, titleColor, value, unit }) => {
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    return <div style={{ flex: 1, borderRadius: SIZE.CardBorderRadius, padding: SIZE.NormalMargin, backgroundColor: THEME.backgroundColor }}>
        <div style={{ display: 'flex', gap: 3 }}>
            { }
            <div style={{ color: titleColor, fontWeight: 'bold' }}>
                {title}
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ fontSize: 20, fontWeight: 'bold' }}>{value}</div><div style={{ fontSize: 12 }}>{unit}</div>
        </div>
    </div>
}