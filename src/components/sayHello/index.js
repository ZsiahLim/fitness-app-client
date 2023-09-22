import React from 'react'
import {
    BellFilled
} from '@ant-design/icons';
import './index.less'
import { Dropdown, Popover } from 'antd';

const items = [{ key: '1', label: (<a target="_blank" rel="noopener noreferrer">System Messages</a>) }, { key: '2', label: (<a target="_blank" rel="noopener noreferrer">My Messages</a>) }];
export default function Index(props) {
    const { theme, userName } = props
    const welcomeDashboardClassname = theme === 'light' ? 'welcome-light' : ''
    const SayhelloUsernameClassname = theme === 'light' ? 'Sayhello-username-light' : ''
    const notificationBoxClassname = theme === 'light' ? 'notificationBox-light' : ''
    return (
        <div className='sayHello'>
            <div style={{ fontWeight: 800, fontSize: '30px' }}>Hi, <span className={`Sayhello-username ${SayhelloUsernameClassname}`}>{userName}</span> ! </div>
            <div className={`welcome ${welcomeDashboardClassname}`}>Welcome to the <span style={{ fontWeight: 600 }}>Medal</span></div>
            <Dropdown menu={{ items }} placement="bottom" arrow>
                <div className={`notificationBox ${notificationBoxClassname}`}>
                    <BellFilled style={{ fontSize: 26 }} />
                </div>
            </Dropdown>
        </div>
    )
}
