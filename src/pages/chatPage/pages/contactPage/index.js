import { Outlet, useNavigate } from 'react-router-dom';
import ContactsList from '../../Components/ContactsList';
import FootNavigationBar from '../../Components/footNavigationBar';
import { useIntl } from 'react-intl';
import { UserAddOutlined } from '@ant-design/icons';
import useUserTheme from '../../../../hooks/useUserTheme';
import APPTHEME from '../../../../constants/COLORS/APPTHEME';

export default function ContactPage() {
    const intl = useIntl()
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const navigateTo = useNavigate()
    return (
        <>
            <div className="chat-contentBox-leftBar">
                <div className="chat-contentBox-leftBar-header">
                    <div className="chat-contentBox-leftBar-header-title">{intl.formatMessage({ id: 'app.cmty.title.contacts' })}</div>
                    <div className='buttonHover' onClick={() => navigateTo("/chat/subscribe")} style={{ backgroundColor: THEME.backgroundColor, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
                        <UserAddOutlined />
                    </div>
                </div>
                <div className="chat-contentBox-leftBar-mainContent">
                    <ContactsList />
                </div>
                <div className="chat-contentBox-leftBar-footNavigationBar">
                    <FootNavigationBar />
                </div>
            </div>
            <div className="chat-contentBox-rightBar">
                <Outlet />
            </div>
        </>
    )
}