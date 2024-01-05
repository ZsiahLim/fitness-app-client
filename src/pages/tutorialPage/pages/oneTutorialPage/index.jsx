import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { calculateAverage } from '../../../../utils/funcs'
import MyCarousel from '../../../../components/myCarousel'
import './index.less'
import { CalendarOutlined, EllipsisOutlined, LeftOutlined, ShareAltOutlined, StarOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { VideoJSForTutorial } from '../../../../components/VideoJSForTutorial'
import COLORS from '../../../../constants/COLORS'
import SIZE from '../../../../constants/SIZE'
import { Dropdown, message } from 'antd'
import { formatTimeToChinese } from '../../../../utils/formatTime'
import useIsTutorialHasAlr from '../../../../hooks/useIsTutorialHasAlr'
import { createsession } from '../../../../api/session.api'
import { loginSuccess } from '../../../../redux/userSlice'
import { setSessions } from '../../../../redux/SessionSlice'
import { addtutorialtofavor } from '../../../../api/tutorial.api'
import useCheckFavorTutorialIsExist from '../../../../hooks/useCheckFavorTutorialIsExist'
import useUserTheme from '../../../../hooks/useUserTheme'
import { shareTutorial } from '../../../../utils/shareFuncs'
import { useIntl } from 'react-intl'
import useUserLocale from '../../../../hooks/useUserLocale'
import APPTHEME from '../../../../constants/COLORS/APPTHEME'

export default function SpecificTutorialPage() {
    const intl = useIntl()
    const currentTheme = useUserTheme()
    const THEME = APPTHEME[currentTheme]
    const tutorial = useLoaderData()
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const userLocale = useUserLocale()
    const { userSelectDay } = useSelector(state => state.calendar)
    const { _id, name, zh_name, brief, zh_brief, cover, lowerEstimateColorie, higherEstimateColorie, duration, description, zh_description, level, rate, users, video, type, equipments } = tutorial
    const [startedExcersise, setStartedExcersise] = useState(false)
    const lightSpecificTutorialPageClassname = currentTheme === 'light' ? 'specificTutorialPage-light' : ''
    const videoJsOptions = {
        autoplay: false,
        fill: true,
        responsive: true,
        controls: false,
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
    const isTodayHasAlr = useIsTutorialHasAlr(_id)

    const handleAddToCalendar = async () => {
        if (isTodayHasAlr) {
            message.error(intl.formatMessage({id: 'error.tut.added'}))
        } else {
            const newSession = {
                date: new Date(userSelectDay),
                tutorial: _id,
            }
            await createsession(newSession).then(res => {
                if (res.status === false) {
                    message.error(intl.formatMessage({id: 'error.errorMsg'}))
                } else {
                    message.success(intl.formatMessage({id: 'app.tut.msg.added'}))
                    dispatch(loginSuccess(res.user))
                    dispatch(setSessions(res.updatedSessions))
                }
            })
        }
    }
    const isExit = useCheckFavorTutorialIsExist(_id)
    const handleAddTutorialTofavor = async () => {
        if (isExit) {
            message.error(intl.formatMessage({id: 'error.tut.favoured'}))
        } else {
            await addtutorialtofavor(_id).then(res => {
                if (res.status === false) {
                    message.error(intl.formatMessage({id: 'error.errorMsg'}))
                } else {
                    dispatch(loginSuccess(res))
                    message.success(intl.formatMessage({id: 'app.tut.msg.favoured'}))
                }
            })
        }
    }
    const tutorialOptions = [
        { key: '1', label: (<div onClick={handleAddToCalendar}><CalendarOutlined /> {intl.formatMessage({id: 'app.tut.msg.addTo'})} {formatTimeToChinese(new Date(userSelectDay))} {intl.formatMessage({id: 'app.tut.msg.addTo.schedule'})}</div>), },
        { key: '2', label: (<div onClick={handleAddTutorialTofavor}><StarOutlined /> {intl.formatMessage({id: 'app.tut.msg.addFavour'})}</div>), },
        { key: '3', label: (<div onClick={() => shareTutorial(_id)}><ShareAltOutlined /> {intl.formatMessage({id: 'app.tut.msg.share'})}</div>), },
    ];

    return (
        <div className={`specificTutorialPage ${lightSpecificTutorialPageClassname}`}>
            {!startedExcersise && <>
                <div className='specificTutorialPage-backBtn' onClick={() => navigateTo(-1)}><LeftOutlined /> {intl.formatMessage({id: 'btn.back'})}</div>
                <div className="specificTutorialPage-cover">
                    <MyCarousel imgArr={[cover]} />
                    <div className='startVideo' onClick={() => setStartedExcersise(true)}>{intl.formatMessage({id: 'btn.startExercise'})}</div>
                </div>
                <div className="specificTutorialPage-detail">
                    <div className="specificTutorialPage-detail-title">
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: SIZE.NormalMargin }}>
                            <div style={{
                                backgroundColor: COLORS.primary,
                                width: "8px",
                                height: 30,
                                borderRadius: 4,
                                marginRight: 6
                            }}></div>
                            <div style={{ flex: 1, fontSize: 18, fontWeight: '500' }}>{userLocale === "zh" ? zh_name : name}</div>
                            <div style={{ marginLeft: SIZE.NormalMargin }}>
                                <Dropdown menu={{ items: tutorialOptions }} placement="bottomLeft">
                                    <EllipsisOutlined style={{ fontSize: 24 }} />
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div style={{ fontWeight: 'bold', fontStyle: 'italic' }}>「“{userLocale === "zh" ? zh_brief : brief}”」</div>
                    <div className="specificTutorialPage-detail-statistic" style={{ backgroundColor: THEME.backgroundColor }}>
                        <div className='specificTutorialPage-detail-statistic-left'>
                            <div className="specificTutorialPage-detail-statistic-level" style={{ marginRight: 10 }}>{level} <span className='commentText'>{intl.formatMessage({id: 'app.tut.msg.lvl'})}</span></div>
                            <div className="specificTutorialPage-detail-statistic-duration">{duration} <span className='commentText'>{intl.formatMessage({id: 'app.tut.msg.timeUnit'})}</span></div>
                        </div>
                        <div className='specificTutorialPage-detail-statistic-right'>
                            <div className="specificTutorialPage-detail-statistic-users" style={{ marginRight: 10 }}>{users.length} <span className='commentText'>{intl.formatMessage({id: 'app.tut.msg.trained'})}</span></div>
                            {rate.length === 0 ? <div className="specificTutorialPage-detail-statistic-rate"><span className='commentText'>{intl.formatMessage({id: 'app.tut.msg.noMarks'})}</span></div> : <div className="specificTutorialPage-detail-statistic-rate">{intl.formatMessage({id: 'app.tut.msg.marks'})}{calculateAverage(rate)}</div>}
                        </div>
                    </div>
                    <div className="specificTutorialPage-detail-desc" style={{ overflow: 'auto' }}>
                        {userLocale === "zh" ? zh_description : description}
                    </div>
                    <div className="specificTutorialPage-detail-colorie">
                        <div style={{ fontWeight: 500, fontSize: 16 }} className='commentText'>{intl.formatMessage({id: 'app.tut.msg.calEst'})}</div>
                        <div style={{ fontWeight: 600 }}>{lowerEstimateColorie}~{higherEstimateColorie}</div>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }} className='commentText'>{intl.formatMessage({id: 'app.tut.msg.equipReq'})}</div>
                    <div className="specificTutorialPage-detail-equipments">
                        {equipments.map(item => <div className="specificTutorialPage-detail-equipments-item">{item}</div>)}
                    </div>
                </div>
            </>}
            {startedExcersise && <div className='specificTutorialPage-video'>
                <div className='specificTutorialPage-video-exitBtn' onClick={() => setStartedExcersise(false)}><LeftOutlined /> {intl.formatMessage({id: 'btn.exit'})}</div>
                <VideoJSForTutorial tutorial={tutorial} options={videoJsOptions} onReady={handlePlayerReady} />
            </div>}
        </div >
    )
}
