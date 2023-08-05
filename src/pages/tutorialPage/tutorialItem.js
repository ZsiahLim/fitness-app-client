import React from 'react'

export default function TutorialItem({ tutorial: { title, icon } }) {
    return (
        <div className='tutorialItem'>
            <div className='TutorialIcon'> <img src={icon}></img> </div>
            <div className='TutorialTitle'>{title}</div>
        </div>
    )
}
