import { message, Input, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fuzzysearchuser } from '../../../../api/user.api';
import { Outlet } from 'react-router-dom';
import FootNavigationBar from '../../Components/footNavigationBar';
import COLORS from '../../../../constants/COLORS';
import useUserTheme from '../../../../hooks/useUserTheme';
import APPTHEME from '../../../../constants/COLORS/APPTHEME';
import ContactHorizontal from '../../../../components/contactHorizontal';
import { useIntl } from 'react-intl';

function SubscribeUserPage() {
    const intl = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [searchedUsers, setSearchedUsers] = useState([])
    const [searchText, setSearchText] = useState('')
    const handleSearchUser = async () => {
        if (searchText) {
            await fuzzysearchuser({ searchText }).then(res => {
                if (res && res.status !== false) {
                    // setSearchText('')
                    setSearchedUsers(res)
                } else {
                    message.error(intl.formatMessage({ id: 'error.errorMsg' }))
                }
            })
        } else {
            message.error(intl.formatMessage({ id: 'error.cmty.searchFailed' }))
        }
    }
    useEffect(() => {
        if (!searchText) {
            setSearchedUsers([])
        }
    }, [searchText])
    return (
        <>
            <div className="chat-contentBox-leftBar">
                <div className="chat-contentBox-leftBar-header">
                    <div className="chat-contentBox-leftBar-header-title">
                        <div>
                            {intl.formatMessage({ id: 'app.cmty.title.search' })}
                        </div>
                        <div
                            style={{ display: 'flex', alignItems: 'center', padding: '10px 4px', gap: 10, backgroundColor: currentTheme.backgroundColor, borderRadius: 14 }}
                        >
                            <Input
                                onKeyDown={(event) => { event.key === 'Enter' && handleSearchUser() }}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder={intl.formatMessage({ id: 'app.cmty.field.search' })}
                                bordered={false}
                                autoFocus={true}
                            />
                            <div className='searchIcon' onClick={handleSearchUser} style={{ display: 'flex', alignItems: 'center' }}><SearchOutlined style={{ color: COLORS.primary, fontSize: 18 }} /></div>
                        </div>
                    </div>
                </div>
                <div className="chat-contentBox-leftBar-mainContent" style={{ margin: '10px 10px 0 10px' }}>
                    {(searchText && searchedUsers.length !== 0) && searchedUsers.map((user, index) => <ContactHorizontal key={index} contact={user} />)}
                    {(searchText && searchedUsers.length === 0) && <div style={{ marginTop: 100 }}>
                        <Empty description={false} />
                    </div>
                    }
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

export default SubscribeUserPage