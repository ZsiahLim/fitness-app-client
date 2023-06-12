import React from 'react'
import './index.less'
import { useParams } from 'react-router-dom'
import CompetitionCard from './competitionCard'
export default function CompetitionPage() {
    let { theme } = useParams()
    const lightCompetitionPageClassname = theme === 'light' ? 'competitionPage-light' : ''
    return (
        <div className={`competitionPage ${lightCompetitionPageClassname}`}>
            <div className='title'><h1>June competitions</h1></div>
            <div className='competitionList'>
                <CompetitionCard />
                <CompetitionCard />
                <CompetitionCard />
                <CompetitionCard />
                <CompetitionCard />
            </div>
        </div>
    )
}
