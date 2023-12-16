import React from 'react'
import './index.less'

export default function TutorialItem({ tutorial: { title, icon } }) {
    return (
        <div className='tutorialItem'>
            <div className='TutorialIcon'> <img style={{ width: 30, height: 30 }} src={icon}></img> </div>
            <div className='TutorialTitle'>{title}</div>
        </div>
    )
}
