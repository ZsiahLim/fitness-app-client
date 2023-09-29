import React, { useState } from 'react'
import './index.less'
import ProfileCard from './components/profileCard'
import { Segmented, Divider } from 'antd';
import MyBlog from '../blogPage/myBlog';
import { useSelector } from 'react-redux';

export default function SettingPage() {
    const { currentTheme } = useSelector(state => state.user)
    const [module, setModule] = useState('My medal')
    const getDataByOption = (e) => {
        setModule(e)
    }
    const lightsettingPageClassname = currentTheme === 'light' ? 'settingPage-light' : ''
    return (
        <div className={`settingPage ${lightsettingPageClassname}`}>
            <ProfileCard />
            <div className='tabs'>
                <Segmented onChange={(e) => getDataByOption(e)} options={['My medal', 'My Blogs', 'Liked Blogs', 'Favorite Blogs', 'My Tutorials', 'My Competitions']} />
            </div>
            <div className='divider'>
                <Divider style={{ width: "90%" }} />
            </div>
            <div className='content'>
                {module === 'My Blogs' && <MyBlog />}
                {module === 'My medal' && <></>}
                {module === 'Liked Blogs' && <></>}
                {module === 'Favorite Blogs' && <></>}
                {module === 'My Tutorials' && <></>}
                {module === 'My Competitions' && <></>}
            </div>
        </div>
    )
}
