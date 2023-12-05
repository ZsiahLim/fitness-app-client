import { Avatar, Button, List, Skeleton, message, Modal, Select, Input, Popconfirm, Drawer, Segmented, Divider, Form, Badge } from 'antd';
import { UserOutlined, MessageFilled, MessageTwoTone, ContactsTwoTone, StarTwoTone, LeftOutlined, EllipsisOutlined, AudioOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { UserAddOutlined } from '@ant-design/icons'
import { loginStart, loginSuccess } from '../../../../redux/userSlice'
import { useDispatch } from 'react-redux'
import { addcontact, createconversation, createreport, fuzzysearchuser, removecontact } from '../../../../api/user.api';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import ContactsList from '../../Components/ContactsList';
import FootNavigationBar from '../../Components/footNavigationBar';
import COLORS from '../../../../constants/COLORS';
import useUserTheme from '../../../../hooks/useUserTheme';
import APPTHEME from '../../../../constants/COLORS/APPTHEME';
import ContactHorizontalWithID from '../../../../components/contactHorizontalWithID';
import ContactHorizontal from '../../../../components/contactHorizontal';

function SubscribeUserPage() {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const dispatch = useDispatch()
    const [searchedUsers, setSearchedUsers] = useState([])
    const [searchText, setSearchText] = useState('')
    const handleSearchUser = async () => {
        console.log(searchText);
        if (searchText) {
            await fuzzysearchuser({ searchText }).then(res => {
                console.log(res);
                if (res.status !== false) {
                    // setSearchText('')
                    setSearchedUsers(res)
                } else {
                    message.error("出现异常请稍后再试")
                }
            })
        } else {
            message.error("请输入您要搜索的内容")
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
                            Search
                        </div>
                        <div
                            style={{ display: 'flex', alignItems: 'center', padding: '10px 4px', gap: 10, backgroundColor: currentTheme.backgroundColor, borderRadius: 14 }}
                        >
                            <Input
                                onKeyDown={(event) => { event.key === 'Enter' && handleSearchUser() }}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder='Search user by ID/Name/Email'
                                bordered={false}
                            />
                            <div className='searchIcon' onClick={handleSearchUser} style={{ display: 'flex', alignItems: 'center' }}><SearchOutlined style={{ color: COLORS.primary, fontSize: 18 }} /></div>
                        </div>
                    </div>
                </div>
                <div className="chat-contentBox-leftBar-mainContent" style={{ margin: '10px 10px 0 10px' }}>
                    {(searchText && searchedUsers.length !== 0) && searchedUsers.map((user, index) => <ContactHorizontal key={index} contact={user} />)}
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