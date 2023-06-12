import React from 'react'
import imgPath2 from '../../Pic/game.webp'

export default function OneTutorialVideo() {
    return (
        <div className='oneTutorialVideo'>
            <div className='TutorialVideoImg'>
                <img className='TutorialImg' src={imgPath2} />
            </div>
            <div className='TutorialVideoInfo'>
                <div className='TutorialVideoWords'>
                    <div className='TutorialVideoTitle'>waist slimming | Beginner</div>
                    <div className='TutorialVideoNum'>21000 people have practiced</div>
                </div>
            </div>
        </div>
    )
}
