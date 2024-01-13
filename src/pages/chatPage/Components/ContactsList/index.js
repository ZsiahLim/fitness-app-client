import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { getuser } from '../../../../api/user.api';
import { useLocation, useNavigate } from 'react-router-dom';
import Contact from '../contact';
import { Empty } from 'antd';

export default function ContactsList() {
    const { currentUser, currentTheme } = useSelector((state) => state.user)
    const [contacts, setContacts] = useState()
    const getData = async () => {
        const contactsId = currentUser.contactsUsers
        const getContactByID = async (userID) => await getuser(userID)
        const requests = contactsId.map(userId => getContactByID(userId));
        const res = await Promise.all(requests)
        return res
    }
    useEffect(() => {
        const res = getData()
        res.then((contacts) => {
            setContacts(contacts)
        })
    }, [currentUser.contactsUsers])
    const lightcontactsPageClassname = currentTheme === 'light' ? "contactsPage-light" : ''
    const navigateTo = useNavigate()
    const location = useLocation()
    return (
        <div className={`contactsPage ${lightcontactsPageClassname}`}>
            <div className='contactPage-contactList'>
                {contacts?.length === 0 && <div style={{ padding: '50px 0' }}>
                    <Empty description={false} />
                </div>}
                {contacts?.map(contact => <div key={contact._id} onClick={() => navigateTo(`detail/${contact._id}`)}><Contact contact={contact} selected={location.pathname.split('/')[4] === contact._id} /></div>)}
            </div>
        </div>
    )
}
