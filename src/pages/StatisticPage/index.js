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
import NoMore from '../../components/NoMore'
import CalorieTitle from '../../components/ExerciseStatisItems/Calorie'
import DistanceTitle from '../../components/ExerciseStatisItems/Distance'
import StepTitle from '../../components/ExerciseStatisItems/Step'
import DurationTitle from '../../components/ExerciseStatisItems/Duration'
import { useIntl } from 'react-intl'

export default function StatisticsPage() {
    const intl = useIntl();
    const { currentTheme } = useSelector((state) => state.user)
    const lightPageClassname = currentTheme === 'light' ? 'StatisticsPage-light' : ''
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
                    <SpecificTypeCard ExerciseStatisItems={<DistanceTitle />} type={STATISTICITEMS.distance} valueArr={distanceArr} dateArr={dateArr} recordDate={recordDate} title={intl.formatMessage({ id: 'app.stats.title.dist' })} currentValue={distanceNum ? (distanceNum / 1000).toFixed(2) : "0"} targetValue={distanceTarget ? (distanceTarget / 1000).toFixed(2) : null} unit={intl.formatMessage({ id: 'app.stats.unit.dist' })} />
                    <SpecificTypeCard ExerciseStatisItems={<StepTitle />} type={STATISTICITEMS.step} valueArr={stepArr} dateArr={dateArr} recordDate={recordDate} title={intl.formatMessage({ id: 'app.stats.title.step' })} currentValue={stepNum} targetValue={stepTarget ? stepTarget : null} unit={intl.formatMessage({ id: 'app.stats.unit.step' })} />
                    <SpecificTypeCard ExerciseStatisItems={<CalorieTitle />} type={STATISTICITEMS.calorie} valueArr={calorieArr} dateArr={dateArr} recordDate={recordDate} title={intl.formatMessage({ id: 'app.stats.title.cal' })} currentValue={calorieNum} targetValue={calorieTarget ? calorieTarget : null} unit={intl.formatMessage({ id: 'app.stats.unit.cal' })} />
                    <SpecificTypeCard ExerciseStatisItems={<DurationTitle />} type={STATISTICITEMS.duration} valueArr={durationArr} dateArr={dateArr} recordDate={recordDate} title={intl.formatMessage({ id: 'app.stats.title.duration' })} currentValue={durationNum ? secToSpecificMin(durationNum) : "0"} targetValue={durationTarget ? secToSpecificMin(durationTarget) : null} unit={intl.formatMessage({ id: 'app.stats.unit.duration' })} />
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

const WholeTrend = () => {
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    return <div style={{ marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
        <ExerciseTrend />
    </div>

}

const MeasurementRecordsCard = () => {
    const intl = useIntl();
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(true)
    const { latestMeasurement, allMeasurements } = useMeasurement()
    const handleDeleteMeasurement = async (measurementID) => {
        await deletemeasurement(measurementID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res.user))
                dispatch(setLatestMeasurement(res.measurement))
                dispatch(setMeasurements(res.updatedMeasurements))
            } else {
                message.error(intl.formatMessage({ id: 'error.errorMsg' }))
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
                            {intl.formatMessage({ id: 'app.stats.dataRecordPt1' })}{allMeasurements.length}{intl.formatMessage({ id: 'app.stats.dataRecordPt2' })}
                        </div>
                        <div className='buttonHover' style={{ color: COLORS.commentText, fontSize: 14 }}>{collapsed ? <div onClick={() => setCollapsed(false)}>{intl.formatMessage({ id: 'app.stats.expand' })} <RightOutlined /></div> : <div onClick={() => setCollapsed(true)}>{intl.formatMessage({ id: 'app.stats.fold' })} <DownOutlined /></div>}</div>
                    </div>
                    <div className='buttonHover' onClick={() => setUploadMeasurementModalVisible(true)} style={{ backgroundColor: COLORS.primary, padding: "4px 10px", borderRadius: 6, }}><div style={{ fontSize: 14, color: COLORS.white, gap: 6, display: 'flex', alignItems: 'center', }}><div>{intl.formatMessage({ id: 'app.stats.btn.addData' })}</div><FileAddOutlined /></div></div>
                </div>
            </div>
            {!collapsed && <div style={{ marginTop: SIZE.NormalMargin, }}>
                {allMeasurements.map((item, index) => <div
                    key={item?._id ? item._id : index}
                    style={{ padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, backgroundColor: THEME.backgroundColor, marginBottom: SIZE.NormalMargin }}
                >
                    <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: 14, fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: 2 }}>{formatTimeForChartSoloItem(item.date)}<div style={{ fontWeight: 'normal' }}>{intl.formatMessage({ id: 'app.stats.title.record' })}</div></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: SIZE.NormalMargin, color: COLORS.commentText }}>
                            <div className='buttonHover' onClick={() => handleEditMeasurement(item)}><EditOutlined /></div>
                            <div className='buttonHover' onClick={() => handleDeleteMeasurement(item._id)}><DeleteOutlined /></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 2 }}><div style={{ fontSize: 14 }}>{intl.formatMessage({ id: 'app.stats.title.wt' })}:</div><div style={{ fontWeight: 'bold', fontSize: 18 }}>{item?.weight ? item.weight : "--"}</div><div style={{ fontSize: 12 }}>{intl.formatMessage({ id: 'app.stats.unit.wt' })}</div></div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 2 }}><div style={{ fontSize: 14 }}>{intl.formatMessage({ id: 'app.stats.title.ht' })}:</div><div style={{ fontWeight: 'bold', fontSize: 18 }}>{item?.height ? item.height : "--"}</div><div style={{ fontSize: 12 }}>{intl.formatMessage({ id: 'app.stats.unit.ht' })}</div></div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 2 }}><div style={{ fontSize: 14 }}>BMI:</div><div style={{ fontWeight: 'bold', fontSize: 18 }}>{item?.BMI ? item.BMI : "--"}</div><div style={{ fontSize: 12 }}></div></div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 2 }}><div style={{ fontSize: 14 }}>{intl.formatMessage({ id: 'app.stats.title.bfr' })}:</div><div style={{ fontWeight: 'bold', fontSize: 18 }}>{item?.bodyFatRate ? item.bodyFatRate : "--"}</div><div style={{ fontSize: 12 }}>%</div></div>
                    </div>
                </div>)}
            </div>}
            <UploadMeasurementModal visible={UploadMeasurementModalVisible} setVisible={setUploadMeasurementModalVisible} />
            <EditMeasurementModal measurement={selectedMeasurement} visible={UpdateMeasurementModalVisible} setVisible={setUpdateMeasurementModalVisible} />
        </div>)
}



const WeightBMICard = () => {
    const intl = useIntl();
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const { weightTarget } = useUserTarget()
    const { latestMeasurement, allMeasurements } = useMeasurement()
    const { weightArr, dateArr, BMIArr } = useMeasurements(allMeasurements)
    return <div style={{ display: 'flex', gap: SIZE.NormalMargin }}>
        <div style={{ flex: 1, marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
            <div style={{ fontSize: 18, fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: 4, }}>{intl.formatMessage({ id: 'app.stats.title.wt' })}<div style={{ fontSize: 12, fontWeight: 'normal' }}>({intl.formatMessage({ id: 'app.stats.unit.wt' })})</div></div>
            <ReactEcharts option={SimpleLineChartOption(dateArr, weightArr, 'Weight', null, weightTarget)} theme={'light'} />
        </div>
        <div style={{ flex: 1, marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
            <div style={{ fontSize: 18, fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: 4, }}>BMI</div>
            <ReactEcharts option={SimpleLineChartOption(dateArr, BMIArr, 'BMI',)} theme={'light'} />
        </div>
    </div>
}

const HeightBFRCard = () => {
    const intl = useIntl()
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const { latestMeasurement, allMeasurements } = useMeasurement()
    const { bodyFatRateArr, dateArr, heightArr } = useMeasurements(allMeasurements)
    return <div style={{ display: 'flex', gap: SIZE.NormalMargin }}>
        <div style={{ flex: 1, marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
            <div style={{ fontSize: 18, fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: 4, }}>{intl.formatMessage({ id: 'app.stats.title.bfr' })}</div>
            <ReactEcharts option={SimpleLineChartOption(dateArr, bodyFatRateArr, 'BodyFatRate',)} theme={'light'} />
        </div>
        <div style={{ flex: 1, marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
            <div style={{ fontSize: 18, fontWeight: 'bold', display: 'flex', alignItems: 'baseline', gap: 4, }}>{intl.formatMessage({ id: 'app.stats.title.ht' })}</div>
            <ReactEcharts option={SimpleLineChartOption(dateArr, heightArr, 'Height',)} theme={'light'} />
        </div>
    </div>
}

const BodyMatricOverviewCard = () => {
    const intl = useIntl();
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
                    message.success(intl.formatMessage({ id: 'msg.wtSetSuccess' }))
                } else {
                    message.error(intl.formatMessage({ id: 'error.errorMsg' }))
                }
            })
        } else {
            message.error(intl.formatMessage({ id: 'error.incompleteInput' }))
        }
    }
    const handleInputWeight = (value) => {
        setNewWeightTarget(value)
    }
    return <div style={{ marginBottom: 10, backgroundColor: THEME.contentColor, borderRadius: 12, padding: SIZE.NormalMargin }}>
        {/* icon */}
        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
            {/* <DashboardOutlined /> */}
            <div style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.green }}>{intl.formatMessage({ id: 'app.stats.title.wtAndHt' })}</div>
            <div style={{ fontSize: 12, fontWeight: 'bold', color: COLORS.commentText }}>{latestMeasurement?.updatedAt && `${intl.formatMessage({ id: 'app.stats.lastTimeUpdate' })} ${formatTimeToChineseDetail(latestMeasurement.updatedAt)}`}</div>
        </div>
        <div style={{ marginTop: SIZE.NormalMargin }}>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, display: 'flex', gap: 2, }}><>{intl.formatMessage({ id: 'app.stats.title.wtAndGoal' })}</><EditOutlined onClick={() => setEditWeightTargetShow(true)} style={{ fontSize: 10 }} /></div>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <div style={{ fontSize: 22, fontWeight: 'bold' }}>{latestMeasurement?.weight ? latestMeasurement.weight : "--"}</div>
                        </div>
                        <div>/</div>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <div style={{ fontSize: 16, fontWeight: 'bold' }}>{weightTarget ? weightTarget : "--"}</div>
                            <div style={{ fontSize: 12, }}>&nbsp;{intl.formatMessage({ id: 'app.stats.unit.wt' })}</div>
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}><>{intl.formatMessage({ id: 'app.stats.title.bmiLvl' })}</> <InfoCircleOutlined onClick={() => setBMIdetailShow(true)} style={{ fontSize: 10 }} /></div>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <div style={{ fontSize: 20, fontWeight: 'bold' }}>{latestMeasurement?.BMI ? BMISort(latestMeasurement?.BMI) : "--"}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', marginTop: SIZE.NormalMargin }}>
                <MetricItem title={"BMI"} value={latestMeasurement?.BMI} />
                <MetricItem title={intl.formatMessage({ id: 'app.stats.title.bfr' })} value={latestMeasurement?.bodyFatRate} unit={"%"} />
                <MetricItem title={intl.formatMessage({ id: 'app.stats.title.ht' })} value={latestMeasurement?.height} unit={intl.formatMessage({ id: 'app.stats.unit.ht' })} />
            </div>
        </div>
        <Modal open={BMIdetailShow} footer={null} title={intl.formatMessage({ id: 'app.stats.intro' })}
            onOk={() => setBMIdetailShow(false)}
            onCancel={() => setBMIdetailShow(false)}>
            <div>
                <div style={{ flex: 1 }}>
                    <div style={{ color: THEME.fontColor }}>
                        {intl.formatMessage({ id: 'app.stats.intro.contentPt1' })}
                    </div>
                    <div style={{ color: THEME.fontColor }}>
                        {intl.formatMessage({ id: 'app.stats.intro.contentPt2' })}
                    </div>
                    <div style={{ color: THEME.fontColor }}>
                        {intl.formatMessage({ id: 'app.stats.intro.contentPt3' })}
                    </div>
                    <div style={{ color: THEME.fontColor }}>
                        {intl.formatMessage({ id: 'app.stats.intro.contentPt4' })}
                    </div>
                    <div style={{ color: THEME.fontColor }}>
                        {intl.formatMessage({ id: 'app.stats.intro.contentPt5' })}
                    </div>
                    <div style={{ color: THEME.fontColor }}>
                        {intl.formatMessage({ id: 'app.stats.intro.contentPt6' })}
                    </div>
                </div>
            </div>
        </Modal>
        <Modal open={EditWeightTargetShow} footer={null} title={intl.formatMessage({ id: 'app.stats.title.goalWt' })}
            onOk={() => setEditWeightTargetShow(false)}
            onCancel={() => setEditWeightTargetShow(false)}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: SIZE.NormalMargin }}>
                    <div style={{ width: 100 }}>{intl.formatMessage({ id: 'app.stats.title.goalWtUnit' })}</div>
                    <div style={{}}><InputNumber style={{ width: 200 }} defaultValue={weightTarget} min={30} max={200} step={0.01} onChange={handleInputWeight} /></div>
                </div>
                {((weightTarget !== newWeightTarget) && newWeightTarget) ? <div
                    className='buttonHover'
                    onClick={handleUploadWeightTarget}
                    style={{ fontSize: 14, color: COLORS.white, userSelect: 'none', fontWeight: 'bold', borderRadius: 14, backgroundColor: COLORS.primary, padding: "6px 20px" }}>
                    {intl.formatMessage({ id: 'app.stats.title.update' })}
                </div> :
                    <div
                        className='buttonHover'
                        style={{ fontSize: 14, color: COLORS.white, userSelect: 'none', fontWeight: 'bold', borderRadius: 14, backgroundColor: COLORS.commentText, padding: "6px 20px" }}>
                        {intl.formatMessage({ id: 'app.stats.title.update' })}
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

const TodayExercise = () => {
    const intl = useIntl();
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
            <div>{intl.formatMessage({ id: 'app.stats.todaySession' })}</div>
            <div style={{ fontSize: 14, color: COLORS.commentText, fontWeight: 'normal' }}>{intl.formatMessage({ id: 'app.stats.updateSince' })}{recordDate ? formatTimeToChinese(recordDate) : "--"}</div>
        </div>
        <div style={{ display: 'flex', marginTop: SIZE.NormalMargin }}>
            <div style={{ flex: 1, }}>
                <div style={{ color: COLORS.commentText, fontSize: 14, fontWeight: 'bold', }}>
                    {intl.formatMessage({ id: 'app.stats.workoutDuration' })}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <div style={{ fontSize: 20, fontWeight: 'bold' }}>{durationNum ? secToSpecificMin(durationNum) : "0"}</div>
                    <div style={{ fontSize: 12 }}>{intl.formatMessage({ id: 'app.stats.unit.duration' })}</div>
                </div>
            </div>
            <div style={{ flex: 1, }}>
                <div style={{ color: COLORS.commentText, fontSize: 14, fontWeight: 'bold', }}>
                    {intl.formatMessage({ id: 'app.stats.todaySession' })}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <div style={{ fontSize: 20, fontWeight: 'bold' }}>{calorieNum ? calorieNum : '--'}</div>
                    <div style={{ fontSize: 14 }}>+</div>
                    <div style={{ fontSize: 20, fontWeight: 'bold' }}>{tutorialCalorieConsumption ? tutorialCalorieConsumption : "--"}</div>
                    <div style={{ fontSize: 12 }}>{intl.formatMessage({ id: 'app.stats.unit.cal' })}</div>
                </div>
            </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SIZE.NormalMargin, marginTop: SIZE.NormalMargin }}>
            <div style={{ display: 'flex', gap: SIZE.NormalMargin }}>
                <ExerciseItem title={intl.formatMessage({ id: 'app.stats.title.dist' })} titleColor={COLORS.primary} value={distanceNum ? (distanceNum / 1000).toFixed(2) : "--"} unit={intl.formatMessage({ id: 'app.stats.unit.dist' })} />
                <ExerciseItem title={intl.formatMessage({ id: 'app.stats.title.step' })} titleColor={COLORS.primary} value={stepNum ? stepNum : "--"} unit={intl.formatMessage({ id: 'app.stats.unit.step' })} />
            </div>
            <div style={{ display: 'flex', gap: SIZE.NormalMargin }}>
                <ExerciseItem title={intl.formatMessage({ id: 'app.stats.title.cal' })} titleColor={COLORS.colorieOrange} value={calorieNum ? calorieNum : "--"} unit={intl.formatMessage({ id: 'app.stats.unit.cal' })} />
                <ExerciseItem title={intl.formatMessage({ id: 'app.stats.title.duration' })} titleColor={COLORS.purple} value={durationNum ? secToSpecificMin(durationNum) : "--"} unit={intl.formatMessage({ id: 'app.stats.unit.duration' })} />
            </div>
        </div>
    </div>
}

const ExerciseOverview = () => {
    const intl = useIntl();
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const { durationSum, calorieSum, distanceSum, stepSum } = useRecords()
    return <div style={{ borderRadius: SIZE.CardBorderRadius, backgroundColor: THEME.contentColor, padding: SIZE.NormalMargin, marginBottom: SIZE.NormalMargin }}>
        <div style={{ fontWeight: 'bold', fontSize: 16, }}>{intl.formatMessage({ id: 'app.stats.title.summary' })}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SIZE.NormalMargin, marginTop: SIZE.NormalMargin }}>
            <div style={{ display: 'flex', gap: SIZE.NormalMargin }}>
                <ExerciseItem title={intl.formatMessage({ id: 'app.stats.title.dist' })} titleColor={COLORS.primary} value={distanceSum ? (distanceSum / 1000).toFixed(2) : "--"} unit={intl.formatMessage({ id: 'app.stats.unit.dist' })} />
                <ExerciseItem title={intl.formatMessage({ id: 'app.stats.title.step' })} titleColor={COLORS.primary} value={stepSum ? stepSum : "--"} unit={intl.formatMessage({ id: 'app.stats.unit.step' })} />
            </div>
            <div style={{ display: 'flex', gap: SIZE.NormalMargin }}>
                <ExerciseItem title={intl.formatMessage({ id: 'app.stats.title.cal' })} titleColor={COLORS.colorieOrange} value={calorieSum ? calorieSum.toFixed(1) : "--"} unit={intl.formatMessage({ id: 'app.stats.unit.cal' })} />
                <ExerciseItem title={intl.formatMessage({ id: 'app.stats.title.duration' })} titleColor={COLORS.purple} value={durationSum ? secToSpecificMin(durationSum) : "--"} unit={intl.formatMessage({ id: 'app.stats.unit.duration' })} />
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