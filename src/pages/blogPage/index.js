import './index.less'
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function BlogPage() {
    const { currentTheme } = useSelector(state => state.user)
    const lightBlogPageClassname = currentTheme === 'light' ? 'blogPage-light' : ''
    // const navigateTo = useNavigate()
    // const { pathname } = useLocation()
    // useEffect(() => {
    //     pathname === '/blog' && navigateTo('community')
    // }, [])
    return (
        <div className={`blogPage ${lightBlogPageClassname}`}>
            <div className='blog-box'>
                <Outlet />
            </div>
        </div >
    )
}
