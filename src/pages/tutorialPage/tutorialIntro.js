import React, { useEffect, useState } from 'react'
import { RightOutlined, ProfileOutlined } from '@ant-design/icons';
import OneTutorialVideo from './oneTutorialVideo';
import { Empty, message } from 'antd';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { getalltutorial } from '../../api/user.api';
export default function TutorialIntro({ tutorialVideo }) {
    const { currentTheme } = useSelector(state => state.user)
    const lightTutorialIntroClassname = currentTheme === 'light' ? 'TutorialIntro-light' : ''
    const [tutorialVideos, setTutorialVideos] = useState([])
    const getData = async () => {
        await getalltutorial().then(res => {
            setTutorialVideos(res)
        }).catch(err => {
            // console.log(err);
            message.error('failed to get tutorial, try again please')
        })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className={`TutorialIntro ${lightTutorialIntroClassname}`}>
            <div className='TutorialIntro-title'><h3>{tutorialVideo.Name} &nbsp;&nbsp;<RightOutlined /></h3></div>
            <div className='TutorialIntro-intro'>
                <ProfileOutlined /> {tutorialVideo?.tags} | {tutorialVideo?.brief}
            </div>
            <div className='TutorialVideoContent'>
                {tutorialVideos.length !== 0 ? tutorialVideos?.map((video) => <OneTutorialVideo video={video} />) : <Empty />}
            </div>
        </div>
    )
}
