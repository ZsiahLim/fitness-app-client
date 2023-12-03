import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { calculateAverage } from '../../../../utils/funcs'
import MyCarousel from '../../../../components/myCarousel'
import CardTitle from '../../../../components/CardTitle'
import './index.less'
import { CalendarFilled, LeftOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Tag } from 'antd'
import { VideoJSForTutorial } from '../../../../components/VideoJSForTutorial'

export default function SpecificTutorialPage() {
    const tutorial = useLoaderData()
    const navigateTo = useNavigate()
    const { currentTheme } = useSelector(state => state.user)
    const { name, brief, cover, lowerEstimateColorie, higherEstimateColorie, duration, description, level, rate, users, video, type, equipments } = tutorial
    const [startedExcersise, setStartedExcersise] = useState(false)
    const lightSpecificTutorialPageClassname = currentTheme === 'light' ? 'specificTutorialPage-light' : ''
    const addToCalendar = <div><CalendarFilled /></div>
    const videoJsOptions = {
        autoplay: false,
        fill: true,
        responsive: true,

        controls: true,

        fluid: false,
        sources: [{
            src: video,
            type: 'video/mp4'
        }]
    };
    const playerRef = React.useRef(null);
    const [videoReady, setVideoReady] = useState(false)
    const handlePlayerReady = (player) => {
        setVideoReady(true)
        playerRef.current = player
        player.on('timeupdate', function () {
            var currentTime = player.currentTime(); // 获取当前播放时间（已播放的时长）
            console.log('已播放时间：' + Math.floor(currentTime) + ' 秒');
        })
        player.on('play', function () {
            console.log('视频正在播放');
        });

        player.on('pause', function () {
            console.log('视频已暂停');
        });
    }
    return (
        <div className={`specificTutorialPage ${lightSpecificTutorialPageClassname}`}>
            {!startedExcersise && <>
                <div className='specificTutorialPage-backBtn' onClick={() => navigateTo(-1)}><LeftOutlined /> Back</div>
                <div className="specificTutorialPage-cover">
                    <MyCarousel imgArr={[cover]} />
                    <div className='startVideo' onClick={() => setStartedExcersise(true)}>开始跟练</div>
                </div>
                <div className="specificTutorialPage-detail">
                    <div className="specificTutorialPage-detail-title"><CardTitle title={name} extra={addToCalendar} /></div>
                    <div className="specificTutorialPage-detail-tags">
                        <Tag>无条约</Tag><Tag>零噪音</Tag>
                    </div>
                    <div className="specificTutorialPage-detail-statistic">
                        <div className='specificTutorialPage-detail-statistic-left'>
                            <div className="specificTutorialPage-detail-statistic-level" style={{ marginRight: 10 }}>{level} <span className='commentText'>零基础</span></div>
                            <div className="specificTutorialPage-detail-statistic-duration">{duration} <span className='commentText'>min</span></div>
                        </div>
                        <div className='specificTutorialPage-detail-statistic-right'>
                            <div className="specificTutorialPage-detail-statistic-users" style={{ marginRight: 10 }}>{users.length} <span className='commentText'>人练过</span></div>
                            {rate.length === 0 ? <div className="specificTutorialPage-detail-statistic-rate"><span className='commentText'>暂无评分</span></div> : <div className="specificTutorialPage-detail-statistic-rate">评分{calculateAverage(rate)}</div>}
                        </div>
                    </div>
                    <div className="specificTutorialPage-detail-desc" style={{ overflow: 'auto' }}>
                        {description}
                    </div>
                    <div className="specificTutorialPage-detail-colorie">
                        <div style={{ fontWeight: 500, fontSize: 16 }} className='commentText'>预估消耗(千卡)</div>
                        <div style={{ fontWeight: 600 }}>{lowerEstimateColorie}~{higherEstimateColorie}</div>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }} className='commentText'>Equipments Requirement:</div>
                    <div className="specificTutorialPage-detail-equipments">
                        {equipments.map(item => <div className="specificTutorialPage-detail-equipments-item">{item}</div>)}
                    </div>
                    {/* <div className="specificTutorialPage-detail-frequency">
                        <div style={{ fontSize: 18, fontWeight: 600 }} className='commentText'>练习频次:</div>
                        <div>3-5次/周</div>
                    </div> */}
                </div>
            </>}
            {startedExcersise && <div className='specificTutorialPage-video'>
                <div className='specificTutorialPage-video-exitBtn' onClick={() => setStartedExcersise(false)}><LeftOutlined /> Exit</div>
                <VideoJSForTutorial tutorial={tutorial} options={videoJsOptions} onReady={handlePlayerReady} />
            </div>}
        </div >
    )
}
