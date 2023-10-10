import { useSelector } from 'react-redux'
import CardTitle from '../CardTitle'
import './index.less'
import { Avatar, Progress } from 'antd'
import { LeftOutlined, UserOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { secToMin } from '../../utils/funcs'
const scoreArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export default function FinishExercise() {
    const { watchtime } = useParams()
    const { currentUser } = useSelector(state => state.user)
    const [score, setScore] = useState()
    const currentTutorial = useLoaderData()
    const navigateTo = useNavigate()
    // 模拟根据用户看视频时长来计算卡路里
    const calculateCalorie = () => {
        console.log('tutorial duration', currentTutorial.duration);
        let rate = (watchtime / Math.floor(currentTutorial.duration))
        rate = rate > 1 ? 1 : rate

        //only mock need to update later
        const averageColorie = (currentTutorial.lowerEstimateColorie + currentTutorial.higherEstimateColorie) / 2
        return Math.floor(rate * averageColorie)
    }
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
                        <div className="finishExercisePage-mainStatistics-showContent-colorieChart">
                            <Progress type="dashboard" percent={100} format={() => calculateCalorie()} strokeColor={'#ed7276'} strokeWidth={16} />
                            <div className='commentText'>预估消耗(千卡)</div>
                        </div>
                        <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail">
                            <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail-item">
                                <div className="commentText">{currentTutorial.level} - {currentTutorial.duration}分钟</div>
                                {currentTutorial.name} - <span className="commentText">{currentTutorial.brief}</span>
                            </div>
                            <div className="finishExercisePage-mainStatistics-showContent-exerciseDetail-item">
                                <div className="commentText">训练时长</div>
                                <div className="">{secToMin(watchtime)}</div>
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
