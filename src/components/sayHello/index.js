import React from 'react'
import WORDS from '../../constant/words'
import COLOR from '../../constant/color'
import './index.less'
export default function Index(props) {
    const { theme, userName } = props
    const welcomeDashboardClassname = theme === 'light' ? 'welcome-light' : ''
    const SayhelloUsernameClassname = theme === 'light' ? 'Sayhello-username-light' : ''
    return (
        <div className='sayHello'>
            <div style={{ fontWeight: 800, fontSize: '30px' }}>Hi, <span className={`Sayhello-username ${SayhelloUsernameClassname}`}>{userName}</span> ! </div>
            <div className={`welcome ${welcomeDashboardClassname}`}>Welcome to the <span style={{ fontWeight: 600 }}>{WORDS.logoName}</span></div>
        </div>
    )
}
