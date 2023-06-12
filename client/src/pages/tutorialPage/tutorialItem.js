import React from 'react'

export default function TutorialItem({ tutorial: { title, icon } }) {
    return (
        <div className='tutorialItem'>
            <div className='TutorialIcon'></div>
            <div className='TutorialTitle'>{title}</div>
        </div>
    )
}
