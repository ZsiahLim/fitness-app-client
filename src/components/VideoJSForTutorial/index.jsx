import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './index.less'
import { secToMin } from '../../utils/funcs';
import { useNavigate } from 'react-router-dom';
export const VideoJSForTutorial = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { options, onReady, tutorial } = props;
    const [watchTime, setWatchTime] = useState(secToMin(0))
    const navigateTo = useNavigate()
    const [played, setPlayed] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState(0)
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
                setWatchTime(secToMin(currentTimeInSeconds));
            });
            player.on('ended', () => {
                const durationInSeconds = player.duration();
                // 在控制台中输出视频总时长
                console.log('视频总时长（秒）：', Math.floor(durationInSeconds));
                navigateTo(`/finish/${tutorial._id}/${Math.floor(durationInSeconds)}`)
            });
            player.on('pause', () => {
                setPlaying(false)
                setCurrentTimeInSeconds(player.currentTime())
            });
            player.on('play', () => {
                setPlaying(true)
                !played && setPlayed(true)
            });

        } else {
            const player = playerRef.current;
            player.autoplay(options.autoplay);
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

    const endExerciseCheck = () => {
        if (currentTimeInSeconds < 60) {
            console.log(currentTimeInSeconds);
            console.log('训练时间太短，无法记录，确认离开么');
        } else {
            navigateTo(`/finish/${tutorial._id}/${Math.floor(currentTimeInSeconds)}`)
        }
    }

    return (
        <div className='VideoJSForTutorial' ref={videoRef} data-vjs-player >
            {played && <div className='VideoJSForTutorial-time' style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 10, }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#e7e7e7' }}>已训练</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#e7e7e7' }}>{watchTime}</div>
            </div>}
            <div className='VideoJSForTutorial-operate'>
                {playing && <div className='VideoJSForTutorial-operate-pause' style={{ fontSize: 18, fontWeight: 800, color: '#e7e7e7' }} onClick={() => playerRef.current?.pause()}>暂停跟练</div>}
                {!playing && <div className='VideoJSForTutorial-operate-start' style={{ fontSize: 18, fontWeight: 800, color: '#e7e7e7' }} onClick={() => playerRef.current?.play()}>{!played ? '开始跟练' : '继续跟练'}</div>}
                {(played && !playing) && <div className='VideoJSForTutorial-operate-start' style={{ fontSize: 18, fontWeight: 800, backgroundColor: '#FF6B6B', color: '#e7e7e7' }} onClick={() => endExerciseCheck()}>结束锻炼</div>}
            </div>
        </div>
    );
}

export default VideoJSForTutorial;