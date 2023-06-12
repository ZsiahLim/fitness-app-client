import React from 'react'
import { RightOutlined, ProfileOutlined } from '@ant-design/icons';
import OneTutorialVideo from './oneTutorialVideo';
import { useParams } from 'react-router-dom';

export default function TutorialIntro() {
    let { theme } = useParams()
    const lightTutorialIntroClassname = theme === 'light' ? 'TutorialIntro-light' : ''
    return (
        <div className={`TutorialIntro ${lightTutorialIntroClassname}`}>
            <div className='TutorialIntro-title'><h3>10 mins Intense sweating for abdominal fat loss &nbsp;&nbsp;<RightOutlined /></h3></div>
            <div className='TutorialIntro-intro'>
                <ProfileOutlined /> series | Low-impact, non-jumping, core-focused exercises to shed belly fat without much movement
            </div>
            <div className='TutorialVideoContent'>
                <OneTutorialVideo />
                <OneTutorialVideo />
                <OneTutorialVideo />
                <OneTutorialVideo />
                <OneTutorialVideo />
            </div>
        </div>
    )
}
