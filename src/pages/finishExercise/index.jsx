import { useSelector } from 'react-redux'
import CardTitle from '../../components/CardTitle'
import './index.less'
import { Avatar, Progress } from 'antd'
import { LeftOutlined, RightOutlined, UserOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { secToMin } from '../../utils/funcs'
import { formatTimeForChartSoloItem } from '../../utils/formatTime'
import PIC from '../../constants/PIC'
import COLORS from '../../constants/COLORS'
import EXERCISETYPE from '../../constants/EXERCISETYPE'
import { useIntl } from 'react-intl'

// const scoreArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export default function FinishExercise() {
    const intl = useIntl()
    const location = useLocation();
    const { tutorial, exerciseData: { step, distance, exerciseDuration, startTime, endTime, calorieConsumption } } = location.state;
    const { currentUser } = useSelector(state => state.user)
    // const [score, setScore] = useState()
    const navigateTo = useNavigate()
    return (
        <div className='finishExercise'>
            <div className='finishExercise-backBtn' onClick={() => navigateTo(-1)}><LeftOutlined /></div>
            <div className='finishExercisePage'>
                <div className="finishExercisePage-title">{intl.formatMessage({id: 'app.ex.congrats'})}</div>
                <div className="finishExercisePage-mainStatistics">
                    <div className="finishExercisePage-mainStatistics-avator">
                        <Avatar src={currentUser.avator} size={36} icon={<UserOutlined />} /> {currentUser.name}
                    </div>
                    <div className="finishExercisePage-mainStatistics-showContent">
                        {tutorial.name !== "Run" && tutorial.name !== "Walk" && <div className="finishExercisePage-mainStatistics-showContent-colorieChart">
                            <Progress type="dashboard" percent={100} format={() => calorieConsumption} strokeColor={'#ed7276'} strokeWidth={16} />
                            <div className='commentText'>{intl.formatMessage({id: 'app.ex.calEst'})}</div>
                        </div>}
                        <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail">
                            <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail-item">
                                {tutorial.level && <div className="commentText">{tutorial.level} - {tutorial.duration}{intl.formatMessage({id: 'app.ex.timeUnit'})}</div>}
                                {tutorial.name}
                                <div className="commentText">{tutorial.brief}</div>
                            </div>
                            {step && <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail-item">
                                <div className="commentText">{intl.formatMessage({id: 'app.ex.step'})}</div>
                                <div style={{ fontSize: 18, fontWeight: 'bold' }}>{step}</div>
                            </div>}
                            {distance && <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail-item">
                                <div className="commentText">{intl.formatMessage({id: 'app.ex.dist'})}</div>
                                <div style={{ fontSize: 18, fontWeight: 'bold' }}>{distance.toFixed(0)}</div>
                            </div>}
                            <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail-item">
                                <div className="commentText">{intl.formatMessage({id: 'app.ex.duration'})}</div>
                                <div style={{ fontSize: 18, fontWeight: 'bold' }}>{secToMin(exerciseDuration)}</div>
                            </div>
                            <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail-item">
                                <div className="commentText">{intl.formatMessage({id: 'app.ex.startTime'})}</div>
                                <div className="">{formatTimeForChartSoloItem(startTime)}</div>
                            </div>
                            <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail-item">
                                <div className="commentText">{intl.formatMessage({id: 'app.ex.endTime'})}</div>
                                <div className="">{formatTimeForChartSoloItem(endTime)}</div>
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
                            <div style={{ fontWeight: 'bold', color: COLORS.commentText }}>{intl.formatMessage({id: 'app.ex.msg.coolDown'})}</div>
                            <RightOutlined style={{ color: COLORS.commentText }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
