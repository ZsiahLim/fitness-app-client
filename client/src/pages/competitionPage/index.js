import React from 'react'
import './index.less'
export default function CompetitionPage({ theme }) {
    const lightCompetitionPageClassname = theme === 'light' ? 'competitionPage-light' : ''
    return (
        <div className={`competitionPage ${lightCompetitionPageClassname}`}>
            competitionPage
        </div>
    )
}
