import React, { useState } from 'react'
import './index.less'
import CompetitionCard from './competitionCard'
import pngurl1 from '../../Pic/monitorProcess.webp'
import pngurl2 from '../../Pic/contact.webp'
import pngurl3 from '../../Pic/tutorial.webp'
import pngurl4 from '../../Pic/game.webp'
import pngurl5 from '../../Pic/workoutPlan.jpg'
import { useSelector } from 'react-redux'

export default function CompetitionPage() {
    const { currentTheme } = useSelector((state) => state.user)
    const [selectedPic, setSelectedPic] = useState(1)
    const lightCompetitionPageClassname = currentTheme === 'light' ? 'competitionPage-light' : ''
    return (
        <div className={`competitionPage ${lightCompetitionPageClassname}`}>
            <div className='competitionEvents'>
                <div className='title'><h1>June competitions</h1></div>
                <div className='competitionList'>
                    <CompetitionCard />
                    <CompetitionCard />
                    <CompetitionCard />
                    <CompetitionCard />
                    <CompetitionCard />
                </div>
            </div>
        </div >
    )
}
