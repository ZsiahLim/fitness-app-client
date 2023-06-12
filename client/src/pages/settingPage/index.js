import React from 'react'
import './index.less'
import ProfileCard from '../../components/profileCard'
import { Segmented, Divider } from 'antd';
import { useParams } from 'react-router-dom';

export default function SettingPage() {
    let { theme } = useParams();
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
