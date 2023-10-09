import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { secToMin } from '../utils/funcs';
import { useNavigate } from 'react-router-dom';
export const VideoJSForTutorial = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { options, onReady, tutorial } = props;
    const [watchTime, setWatchTime] = useState(0)
    const navigateTo = useNavigate()
    useEffect(() => {

    }, [])
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
                console.log('视频总时长（秒）：', durationInSeconds);
                navigateTo('/finish')
            });
            // You could update an existing player in the `else` block here
            // on prop change, for example:
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

    return (
        <div style={{ height: '100%', width: "100%", position: 'relative' }} ref={videoRef} data-vjs-player >
            <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 10, }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>已训练</div>
                <div style={{ fontSize: 36, fontWeight: 800 }}>{watchTime}</div>
            </div>
        </div>
    );
}

export default VideoJSForTutorial;