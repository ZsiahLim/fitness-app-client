import './index.less'
import { useDispatch, useSelector } from 'react-redux'
import ContactHorizontalWithID from '../../../../components/contactHorizontalWithID';
import { Empty } from 'antd';
import useUserTheme from '../../../../hooks/useUserTheme';
import APPTHEME from '../../../../constants/COLORS/APPTHEME';
import COLORS from '../../../../constants/COLORS';
import contact from '../../../../Pic/contact.png';
import { useIntl } from 'react-intl';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function Index() {//need to update
    const intl = useIntl()
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    const { currentUser, currentTheme } = useSelector((state) => state.user)
    const contactsDashboardClassname = currentTheme === 'light' ? 'contacts-light' : ''
    const myCardsClassname = currentTheme === 'light' ? 'myCards-light' : ''
    const navigateTo = useNavigate()
    return (
        <div className={`contacts ${contactsDashboardClassname}`} >
            <div className={`myCards ${myCardsClassname}`} >
                <div style={{ fontSize: 16, marginBottom: 6, padding: "4px 10px", fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <img src={contact} style={{ height: 24, width: 24 }} />
                        <div>{intl.formatMessage({ id: 'app.dsh.title.contact' })} {currentUser.contactsUsers.length !== 0 && <span>: {currentUser.contactsUsers.length}<UserOutlined /></span>}</div>
                    </div>
                    <div onClick={() => navigateTo('/chat/subscribe')} className='buttonHover' style={{ backgroundColor: THEME.backgroundColor, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
                        <UserAddOutlined />
                    </div>
                </div>
                <div className='contacts-container' style={{ flex: 1, overflow: 'auto' }}>
                    {currentUser.contactsUsers.length !== 0 && currentUser.contactsUsers.map((contactID, index) => <ContactHorizontalWithID key={index} contactID={contactID} />)}
                    {currentUser.contactsUsers.length === 0 && <div style={{ width: "100%", height: '96%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 16, backgroundColor: THEME.backgroundColor, }}>
                        <Empty description={false} />
                        <div style={{ fontSize: 14, color: COLORS.commentText }}>
                            {intl.formatMessage({ id: 'app.dsh.msg.noContacts' })}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}
