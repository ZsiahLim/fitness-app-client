import './index.less'
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import Notifications from '../Notifications';
import { useState } from "react";
import { checkIsBirthday } from '../../../../utils/checkIsBirthday'

export default function Index() {
    const { currentTheme, currentUser: { name, birthday } } = useSelector(state => state.user)
    const { formatMessage } = useIntl()
    const welcomeDashboardClassname = currentTheme === 'light' ? 'welcome-light' : ''
    const SayhelloUsernameClassname = currentTheme === 'light' ? 'Sayhello-username-light' : ''
    const notificationBoxClassname = currentTheme === 'light' ? 'notificationBox-light' : ''
    const [isBirthday, setIsBirthday] = useState(checkIsBirthday(birthday))
    return (
        <div className='sayHello'>
            <div style={{ fontWeight: 800, fontSize: '30px' }}>{isBirthday ? formatMessage({ id: 'happyBirthday' }) : formatMessage({ id: 'hi' })}, <span className={`Sayhello-username ${SayhelloUsernameClassname}`}>{name}</span> ! </div>
            <div className={`welcome ${welcomeDashboardClassname}`}><h3>{formatMessage({ id: 'sayhello' })} <span style={{ fontWeight: 600 }}>Medal</span>~</h3></div>
            <div className={`notificationBox ${notificationBoxClassname}`}>
                <Notifications />
            </div>
        </div >
    )
}
