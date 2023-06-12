import React from 'react'
import './index.less'
import { useParams } from 'react-router-dom'
import TutorialItem from './tutorialItem'
import { Divider } from 'antd'
import TutorialIntro from './tutorialIntro'
export default function TutorialPage() {
    let { theme } = useParams()
    const lightTutorialPageClassname = theme === 'light' ? 'tutorialPage-light' : ''
    return (
        <div className={`tutorialPage ${lightTutorialPageClassname}`}>
            <div className='tutorialItems'>
                <TutorialItem tutorial={{ title: "Yoga", icon: 'null' }} />
                <TutorialItem tutorial={{ title: "Jump rope", icon: 'null' }} />
                <TutorialItem tutorial={{ title: "Walk", icon: 'null' }} />
                <TutorialItem tutorial={{ title: "fat burning", icon: 'null' }} />
                <TutorialItem tutorial={{ title: "Cycling", icon: 'null' }} />
                <TutorialItem tutorial={{ title: "Aerobics", icon: 'null' }} />
                <TutorialItem tutorial={{ title: "Health", icon: 'null' }} />
                <TutorialItem tutorial={{ title: "Strength", icon: 'null' }} />
            </div>
            <Divider />
            <div className='tutorialContent'>
                <div className='tutorialRecommand'>
                    <h2>Recommand For You</h2>
                </div>
                <div className='tutorialSeries'>
                    <TutorialIntro />
                    <TutorialIntro />
                    <TutorialIntro />
                    <TutorialIntro />
                </div>
            </div>
        </div>
    )
}
