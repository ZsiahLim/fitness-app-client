
import { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar'
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import './index.less';

function Dashboard() {
    const { currentUser, currentTheme } = useSelector((state) => state.user)
    const navigateTo = useNavigate()
    const lightAppClassname = currentTheme === 'light' ? 'App-light' : ''
    const lightDashboardClassname = currentTheme === 'light' ? 'myDashboard-light' : ''
    useEffect(() => {
        !currentUser && navigateTo('/login')
    }, [])
    return (
        <div className={`App ${lightAppClassname}`}>
            <div className={`myDashboard ${lightDashboardClassname}`}>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard;
