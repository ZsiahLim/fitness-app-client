import { useSelector } from 'react-redux'
import CardTitle from '../CardTitle'
import './index.less'
import { Avatar, Progress } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
const scoreArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export default function FinishExercise() {
    const { watchtime } = useParams()
    const { currentUser, currentTutorial } = useSelector(state => state.user)
    const [score, setScore] = useState()
    //calculate colorie according to the duration and watchtime


    return (
        <div className='finishExercise'>
            <div className='finishExercisePage'>
                <div className="finishExercisePage-title">恭喜你完成训练！🎉</div>
                <div className="finishExercisePage-mainStatistics">
                    <div className="finishExercisePage-mainStatistics-avator">
                        <Avatar src={currentUser.avator} size={36} icon={<UserOutlined />} /> {currentUser.name}
                    </div>
                    <div className="finishExercisePage-mainStatistics-showContent">
                        <div className="finishExercisePage-mainStatistics-showContent-colorieChart">
                            <Progress type="dashboard" percent={100} format={() => 12} strokeColor={'#ed7276'} strokeWidth={16} />
                            <div className='commentText'>预估消耗(千卡)</div>
                        </div>
                        <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail">
                            <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail-item">
                                <div className="commentText">{currentTutorial.level} - {currentTutorial.duration}分钟</div>
                                {currentTutorial.name}
                            </div>
                            <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail-item">
                                <div className="commentText">时长</div>
                                <div className="">{watchtime}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="finishExercisePage-evaluateTutorial">
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
                </div>
            </div>
        </div>
    )
}
