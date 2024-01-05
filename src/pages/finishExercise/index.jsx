import { useSelector } from 'react-redux'
import './index.less'
import { Avatar, Progress } from 'antd'
import { LeftOutlined, RightOutlined, UserOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { secToMin } from '../../utils/funcs'
import { formatTimeToChineseDetail } from '../../utils/formatTime'
import PIC from '../../constants/PIC'
import COLORS from '../../constants/COLORS'
import EXERCISETYPE from '../../constants/EXERCISETYPE'
import useUserLocale from '../../hooks/useUserLocale'
import StepTitle from '../../components/ExerciseStatisItems/Step'
import DistanceTitle from '../../components/ExerciseStatisItems/Distance'
import useUserTheme from '../../hooks/useUserTheme'
import APPTHEME from '../../constants/COLORS/APPTHEME'
import DurationTitle from '../../components/ExerciseStatisItems/Duration'

// const scoreArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export default function FinishExercise() {
    const userLocale = useUserLocale()
    const location = useLocation();
    const { tutorial, exerciseData: { step, distance, exerciseDuration, startTime, endTime, calorieConsumption } } = location.state;
    const { currentUser } = useSelector(state => state.user)
    const navigateTo = useNavigate()
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    return (
        <div className='finishExercise'>
            <div className='finishExercise-backBtn' onClick={() => navigateTo(-1)}><LeftOutlined /></div>
            <div className='finishExercisePage'>
                <div className="finishExercisePage-title">恭喜你完成训练！🎉</div>
                <div className="finishExercisePage-mainStatistics">
                    <div className="finishExercisePage-mainStatistics-avator">
                        <Avatar src={currentUser.avator} size={36} icon={<UserOutlined />} /> {currentUser.name}
                    </div>
                    <div className="finishExercisePage-mainStatistics-showContent">
                        {(tutorial.name !== "Run" && tutorial.name !== "Walk") ? <div className="finishExercisePage-mainStatistics-showContent-colorieChart">
                            <Progress type="dashboard" percent={100} format={() => calorieConsumption} strokeColor={'#ed7276'} strokeWidth={16} />
                            <div className='commentText'>预估消耗(千卡)</div>
                        </div> :
                            <div className="finishExercisePage-mainStatistics-showContent-colorieChart">
                                <div style={{ width: 260, margin: '10px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {step && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: 10, borderRadius: 10, backgroundColor: COLORS.white }}>
                                        <StepTitle />
                                        <div style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.primary }}>{step}</div>
                                    </div>}
                                    {distance && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: 10, borderRadius: 10, backgroundColor: COLORS.white }}>
                                        <DistanceTitle />
                                        <div style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.primary }}>{distance.toFixed(0)}m</div>
                                    </div>}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: 10, borderRadius: 10, backgroundColor: COLORS.white }}>
                                        <DurationTitle />
                                        <div style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.purple }}>{secToMin(exerciseDuration)}</div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail">
                            <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail-item">
                                {tutorial.level && <div className="commentText">{tutorial.level} - {tutorial.duration}分钟</div>}
                                <div style={{ color: COLORS.primary, fontSize: 22, fontWeight: 'bold' }}>
                                    {userLocale === "zh" ? tutorial?.zh_name : tutorial.name}
                                </div>
                                {(tutorial?.zh_brief || tutorial?.brief) && <div className="commentText" style={{ fontStyle: 'italic', fontSize: 14 }}>「"{userLocale === "zh" ? tutorial?.zh_brief : tutorial.brief}"」</div>}
                            </div>
                            {(tutorial.name !== "Run" && tutorial.name !== "Walk") && <div style={{ display: 'flex', margin: '6px 0', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: 10, borderRadius: 10, backgroundColor: THEME.contentColor }}>
                                <DurationTitle />
                                <div style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.purple }}>{secToMin(exerciseDuration)}</div>
                            </div>}
                            <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail-item">
                                <div className="commentText">训练开始时间</div>
                                <div className="">{formatTimeToChineseDetail(startTime)}</div>
                            </div>
                            <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail-item">
                                <div className="commentText">训练结束时间</div>
                                <div className="">{formatTimeToChineseDetail(endTime)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="finishExercisePage-evaluateTutorial">
                    <div className='finishExercisePage-evaluateTutorial-title'><CardTitle title={'这个教程如何'} /></div>
                    <div className="finishExercisePage-evaluateTutorial-show">
                        <div className='commentText'>特别不满意</div>
                        <div className='commentText'>非常满意</div>
                    </div>
                    <div className="finishExercisePage-evaluateTutorial-rate">
                        {scoreArr.map(item => <div className={`finishExercisePage-evaluateTutorial-rate-score ${score === item && 'clicked'}`} onClick={() => setScore(item)}>{item}</div>)}
                    </div>
                    <div className='finishExercisePage-evaluateTutorial-promo'>
                        <div className="commentText">
                            给予教程诚心的评论 让社区中的大家有更好的体验
                        </div>
                    </div>
                </div> */}
                <div className="finishExercisePage-evaluateTutorial" >
                    <div onClick={() => navigateTo(`/tutorial/${EXERCISETYPE.cooldown.value}`)} className='buttonHover' style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                            flexShrink: 0,
                            flexBasis: 60,
                            height: 60,
                            width: 60,
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            marginRight: 10
                        }}>
                            <img style={{ maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'cover' }} src={PIC.cooldown} />
                        </span>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ fontWeight: 'bold', color: COLORS.commentText }}>接着做一个伸展运动吧，更有效缓解疲劳</div>
                            <RightOutlined style={{ color: COLORS.commentText }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
