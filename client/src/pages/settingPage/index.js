import React from 'react'
import './index.less'
import ProfileCard from '../../components/profileCard'
import { Segmented, Divider } from 'antd';

export default function SettingPage({ theme }) {
    const lightsettingPageClassname = theme === 'light' ? 'settingPage-light' : ''
    return (
        <div className={`settingPage ${lightsettingPageClassname}`}>
            <ProfileCard />
            <div className='tabs'>
                <Segmented options={['My medal', 'My Blogs', 'Liked Blogs', 'Favorite Blogs']} />
            </div>
            <div className='divider'>

                <Divider style={{ width: "90%" }} />
            </div>
        </div>
    )
}
