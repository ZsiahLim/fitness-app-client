import './index.less'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export default function BlogPage() {
    const { currentTheme } = useSelector(state => state.user)
    const lightBlogPageClassname = currentTheme === 'light' ? 'blogPage-light' : ''
    return (
        <div className={`blogPage ${lightBlogPageClassname}`}>
            <div className='blog-box'>
                <Outlet />
            </div>
        </div >
    )
}
