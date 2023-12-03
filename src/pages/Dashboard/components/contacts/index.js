import './index.less'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl';
import ContactHorizontalWithID from '../../../../components/contactHorizontalWithID';

export default function Index() {//need to update
    const { currentUser, currentTheme } = useSelector((state) => state.user)
    const { formatMessage } = useIntl()
    const contactsDashboardClassname = currentTheme === 'light' ? 'contacts-light' : ''
    const myCardsClassname = currentTheme === 'light' ? 'myCards-light' : ''

    return (
        <div className={`contacts ${contactsDashboardClassname}`} >
            <div className={`myCards ${myCardsClassname}`} >
                <div style={{ fontSize: 16, padding: "4px 10px", fontWeight: 'bold' }}>Contacts</div>
                <div className='contacts-container' style={{ flex: 1, overflow: 'auto' }}>
                    {currentUser.contactsUsers.length !== 0 && currentUser.contactsUsers.map((contactID, index) => <ContactHorizontalWithID key={index} contactID={contactID} />)}
                </div>
            </div>
        </div>
    )
}
