import React from 'react'
import './index.less'
export default function TutorialPage({ theme }) {
    const lightTutorialPageClassname = theme === 'light' ? 'tutorialPage-light' : ''
    return (
        <div className={`tutorialPage ${lightTutorialPageClassname}`}>
            TutorialPage
        </div>
    )
}
