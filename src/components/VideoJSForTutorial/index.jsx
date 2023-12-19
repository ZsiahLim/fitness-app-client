import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './index.less'
import { secToMin } from '../../utils/funcs';
import { useNavigate } from 'react-router-dom';
import COLORS from '../../constants/COLORS';
import { PauseOutlined } from '@ant-design/icons';
import SIZE from '../../constants/SIZE';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/userSlice';
import { setSessions } from '../../redux/SessionSlice';
import { finishsession } from '../../api/session.api';
export const VideoJSForTutorial = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const dispatch = useDispatch()
    const { options, onReady, tutorial } = props;
    const [watchTime, setWatchTime] = useState(0)
    const navigateTo = useNavigate()
    const [played, setPlayed] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState(0)
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null);
    const [videoDuration, setVideoDuration] = useState(0);

    useEffect(() => {
        // Make sure Video.js player is only initialized once
        if (!playerRef.current) {
            // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
            const videoElement = document.createElement("video-js");
            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);
            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);
            });
            player.on('timeupdate', () => {
                const currentTimeInSeconds = player.currentTime();
                // 更新观看时间
                setWatchTime(currentTimeInSeconds);
            });
            player.on('ended', async () => {
                const durationInSeconds = player.duration();
                setEndTime(new Date());
                // 在控制台中输出视频总时长
                console.log('视频总时长（秒）：', Math.floor(durationInSeconds));
                const finish = await handleFinishExercise(); // 等待 handleFinishExercise 的结果
                if (finish && finish.status) {
                    const exerciseData = finish.exerciseData;
                    navigateTo(`/finish`, { state: { exerciseData, tutorial } });
                    window.location.reload();
                }
            });
            player.on('pause', () => {
                setPlaying(false)
                setCurrentTimeInSeconds(player.currentTime())
                console.log("videoDuration111", videoDuration);
                if (!videoDuration) {
                    console.log("duration1", player.duration());
                    player.duration() && setVideoDuration(player.duration());
                }
                setEndTime(new Date());
            });
            player.on('play', () => {
                setPlaying(true)
                console.log("videoDuration111", videoDuration);
                if (!videoDuration) {
                    console.log("duration1", player.duration());
                    player.duration() && setVideoDuration(player.duration());
                }
                if (!startTime) {
                    setStartTime(new Date());  // 当前时间作为开始时间
                }
                !played && setPlayed(true)
            });
        } else {
            const player = playerRef.current;
            player.autoplay(options.autoplay);
            console.log("duration: ", player.duration());
            player.duration() && setVideoDuration(player.duration());
            player.src(options.sources);
        }
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    useEffect(() => {
        const player = playerRef.current;
        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    const endExerciseCheck = async () => {
        if (currentTimeInSeconds < 60) {
            console.log(currentTimeInSeconds);
            message.info('训练时间太短，无法记录，确认离开么');
        } else {
            const finish = await handleFinishExercise(); // 等待 handleFinishExercise 的结果
            console.log("finish", finish);
            if (finish && finish.status) {
                console.log("daozhele");
                const exerciseData = finish.exerciseData;
                navigateTo(`/finish`, { state: { exerciseData, tutorial } });
                window.location.reload();
            }
        }
    }

    const handleFinishExercise = async () => {
        return new Promise(async (resolve) => {
            if (videoDuration) {
                const { lowerEstimateColorie, higherEstimateColorie } = tutorial
                const averageColorie = Math.round((parseInt(lowerEstimateColorie) + parseInt(higherEstimateColorie)) / 2 / videoDuration * watchTime)
                const data = {
                    exerciseDuration: currentTimeInSeconds,
                    startTime: startTime,
                    endTime: endTime,
                    calorieConsumption: averageColorie,
                }

                await finishsession(tutorial._id, data).then(res => {
                    if (res.status !== false) {
                        dispatch(loginSuccess(res.user))
                        dispatch(setSessions(res.updatedSessions))
                        resolve({ status: true, exerciseData: data }); // 解析 Promise
                    } else {
                        message.error("出现异常，请稍后重试")
                        resolve({ status: false });
                    }
                }).catch(err => {
                    console.log("err", err);
                    resolve({ status: false });
                })
            } else {
                console.log("videoDuration", videoDuration);
                message.error('出现异常，请稍后重试');
                resolve({ status: false });
            }
        })
    }

    return (
        <div
            className='VideoJSForTutorial'
            ref={videoRef}
            data-vjs-player >
            {played && <div className='VideoJSForTutorial-time' style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 10, backgroundColor: COLORS.white, opacity: 0.8, padding: "0 10px", borderRadius: 10 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.primary }}>已训练</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: COLORS.primary }}>{secToMin(watchTime)}</div>
            </div>}
            {<div className='VideoJSForTutorial-operate'>
                {playing && <div className='VideoJSForTutorial-operate-pause' style={{ fontSize: 18, fontWeight: 800, color: '#e7e7e7', backgroundColor: COLORS.gray }} onClick={() => playerRef.current?.pause()}>
                    <PauseOutlined style={{ fontWeight: 800 }} />
                </div>}
                {!playing && <div className='VideoJSForTutorial-operate-start' style={{ fontSize: 18, marginRight: SIZE.NormalMargin, fontWeight: 800, color: '#e7e7e7' }} onClick={() => playerRef.current?.play()}>{!played ? '开始跟练' : '继续跟练'}</div>}
                {(played && !playing) && <div className='VideoJSForTutorial-operate-start' style={{ fontSize: 18, fontWeight: 800, backgroundColor: '#FF6B6B', color: '#e7e7e7' }} onClick={() => endExerciseCheck()}>结束锻炼</div>}
            </div>}
        </div>
    );
}

export default VideoJSForTutorial;