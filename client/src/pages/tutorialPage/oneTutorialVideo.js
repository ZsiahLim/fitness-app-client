import React from 'react'
import imgPath2 from '../../Pic/game.webp'

export default function OneTutorialVideo({ video }) {
    return (
        <div className='oneTutorialVideo'>
            <div className='TutorialVideoImg'>
                <img className='TutorialImg' src={video.imgUrl} />
            </div>
            <div className='TutorialVideoInfo'>
                <div className='TutorialVideoWords'>
                    <div className='TutorialVideoTitle'>{video.Name} | {video.level}</div>
                    <div className='TutorialVideoNum'>{video.users.length} people have practiced</div>
                </div>
            </div>
        </div>
    )
}
