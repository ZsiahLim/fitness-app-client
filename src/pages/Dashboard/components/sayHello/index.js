import './index.less'
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import Notifications from '../Notifications';
import { useState } from "react";
import { checkIsBirthday } from '../../../../utils/checkIsBirthday'
import COLORS from '../../../../constants/COLORS';
import useUserTheme from '../../../../hooks/useUserTheme';
import APPTHEME from '../../../../constants/COLORS/APPTHEME';

export default function Index() {
    const currentTheme = useUserTheme()
    const THEME = APPTHEME[currentTheme]
    const { currentUser: { name, birthday } } = useSelector(state => state.user)
    const { formatMessage } = useIntl()
    const [isBirthday] = useState(checkIsBirthday(birthday))

    return (
        <div className='sayHello'>
            <div>
                <div style={{ fontWeight: 800, fontSize: '30px' }}>{isBirthday ? formatMessage({ id: 'happyBirthday' }) : formatMessage({ id: 'hi' })}, <span style={{ color: COLORS.primary }}>{name}</span> ! </div>
                <div style={{ color: COLORS.commentText }}>{formatMessage({ id: 'sayhello' })} <span style={{ fontWeight: 600 }}>Target</span>~</div>
                <div className={`notificationBox`} style={{ backgroundColor: THEME.contentColor }}>
                    <Notifications />
                </div>
            </div>
        </div >
    )
}
