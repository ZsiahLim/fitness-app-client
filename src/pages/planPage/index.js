import React from 'react'
import './index.less'
export default function PlanPage({ theme }) {
    const lightPlanPageClassname = theme === 'light' ? 'planPage-light' : ''
    return (
        <div className={`planPage ${lightPlanPageClassname}`}>
            planPage
        </div>
    )
}
