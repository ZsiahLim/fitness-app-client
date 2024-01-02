import React from 'react'
import useRecordsAnalysis from '../../hooks/useRecordsAnalysis'
import { ClockCircleOutlined, FireFilled, TrophyFilled } from '@ant-design/icons'
import COLORS from '../../constants/COLORS'
import SIZE from '../../constants/SIZE'
import { formatTimeForCharts } from '../../utils/formatTime'
import { secToSpecificMin } from '../../utils/funcs'
import { useIntl } from 'react-intl'

function UserBestRecord({ records }) {
    const intl = useIntl()
    const { maxSteps, maxStepsDate, maxDuration, maxDurationDate, maxCalorie, maxCalorieDate, maxDistance, maxDistanceDate, } = useRecordsAnalysis(records)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: SIZE.NormalMargin }}>
            <div style={{ marginBottom: SIZE.NormalMargin }}>
                <div style={{ fontSize: SIZE.NormalTitle, fontWeight: 'bold', color: COLORS.commentText }}>{intl.formatMessage({ id: 'app.stats.highRecord' })}</div>
            </div>
            <div
                style={{
                    background: 'linear-gradient(to right, rgb(134, 162, 242), rgb(100, 134, 240))',
                    display: 'flex',
                    flexDirection: 'column', borderRadius: 12, padding: "10px 14px",
                }}
            >
                <div >
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        {/* {ICON.trophy(SIZE.NormalTitle, COLORS.white)} */}
                        <TrophyFilled style={{ color: COLORS.white }} />
                        <div style={{ fontSize: SIZE.SmallTitle, fontWeight: "bold", color: COLORS.white }}>{intl.formatMessage({ id: 'app.stats.singleHighRecord' })}</div>
                    </div>
                    <div style={{ display: 'flex', marginTop: 6, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        {/* {ICON.fire(16, COLORS.white)} */}
                        <FireFilled style={{ color: COLORS.white }} />
                        <div style={{ fontSize: SIZE.SmallTitle, fontWeight: "bold", color: COLORS.white }}>{intl.formatMessage({ id: 'app.stats.title.cal' })}</div>
                    </div>
                    <div style={{ display: 'flex', marginTop: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                            <div style={{ color: COLORS.white, fontSize: SIZE.NormalTitle, fontWeight: 'bold' }}>{maxCalorie}</div>
                            <div style={{ color: COLORS.backgroundGray, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{intl.formatMessage({ id: 'app.stats.unit.cal' })}</div>
                        </div>
                        {maxCalorieDate ? <div style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{formatTimeForCharts(maxCalorieDate)}</div> :
                            <div style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>--</div>}
                    </div>

                    <div style={{ display: 'flex', marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <div style={{ fontSize: SIZE.SmallTitle, fontWeight: "bold", color: COLORS.white }}>{intl.formatMessage({ id: 'app.stats.title.step' })}</div>
                    </div>
                    <div style={{ display: 'flex', marginTop: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                            <div style={{ color: COLORS.white, fontSize: SIZE.NormalTitle, fontWeight: 'bold' }}>{maxSteps}</div>
                            <div style={{ color: COLORS.backgroundGray, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{intl.formatMessage({ id: 'app.stats.unit.step' })}</div>
                        </div>
                        {maxStepsDate ? <div style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{formatTimeForCharts(maxStepsDate)}</div> :
                            <div style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>--</div>}
                    </div>


                    <div style={{ display: 'flex', marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <div style={{ fontSize: SIZE.SmallTitle, fontWeight: "bold", color: COLORS.white }}>{intl.formatMessage({ id: 'app.stats.title.dist' })}</div>
                    </div>
                    <div style={{ display: 'flex', marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                            <div style={{ color: COLORS.white, fontSize: SIZE.NormalTitle, fontWeight: 'bold' }}>{maxDistance}</div>
                            <div style={{ color: COLORS.backgroundGray, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{intl.formatMessage({ id: 'app.stats.unit.dist' })}</div>
                        </div>
                        {maxDistanceDate ? <div style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{formatTimeForCharts(maxDistanceDate)}</div> :
                            <div style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>--</div>}
                    </div>


                    <div style={{ display: 'flex', marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <ClockCircleOutlined style={{ color: COLORS.white }} />
                        <div style={{ fontSize: SIZE.SmallTitle, fontWeight: "bold", color: COLORS.white }}>{intl.formatMessage({ id: 'app.stats.title.duration' })}</div>
                    </div>
                    <div style={{ display: 'flex', marginTop: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                            <div style={{ color: COLORS.white, fontSize: SIZE.NormalTitle, fontWeight: 'bold' }}>{secToSpecificMin(maxDuration)}</div>
                            <div style={{ color: COLORS.backgroundGray, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{intl.formatMessage({ id: 'app.stats.unit.duration' })}</div>
                        </div>
                        {maxDurationDate ? <div style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>{formatTimeForCharts(maxDurationDate)}</div> :
                            <div style={{ color: COLORS.white, fontSize: SIZE.ExtarSmallTitle, fontWeight: 'bold' }}>--</div>}
                    </div>
                </div>
            </div></div>
    )
}

export default UserBestRecord