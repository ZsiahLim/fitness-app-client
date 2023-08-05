import React, { useEffect, useState } from 'react'
import { RightOutlined, ProfileOutlined } from '@ant-design/icons';
import OneTutorialVideo from './oneTutorialVideo';
import { useParams } from 'react-router-dom';
import { Empty, message } from 'antd';
import axios from 'axios'
export default function TutorialIntro({ tutorialVideo }) {
    let { theme } = useParams()
    const lightTutorialIntroClassname = theme === 'light' ? 'TutorialIntro-light' : ''
    const [tutorialVideos, setTutorialVideos] = useState([])
    const getData = async () => {
        await axios.get(`http://localhost:3001/api/tutorialLibraryVideo/${tutorialVideo._id}`).then(res => {
            setTutorialVideos(res.data)
        }).catch(err => {
            console.log(err);
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
