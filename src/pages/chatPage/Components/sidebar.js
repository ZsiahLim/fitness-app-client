import React, { useState, useEffect } from 'react'
import { StarTwoTone, MessageTwoTone, ContactsTwoTone } from '@ant-design/icons';
import { Badge } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar(props) {
    const { currentTheme } = useSelector(state => state.user)
    const { changeSelectPage } = props
    const navigateTo = useNavigate()
    const { pathname } = useLocation()
    const [selectPage, setSelectPage] = useState(pathname.split('/')[2]);
    const lightnavigation = currentTheme === 'light' ? 'navigation-light' : ''

    useEffect(() => {
        setSelectPage(pathname.split('/')[2])
    }, [pathname])
    return (
        <>
            <div className='chat-edit-bar'>
                <div className='navigationBar'>
                    <div className={`navigation ${lightnavigation}`}
                        style={{
                            borderBottom: selectPage === 'conversations' ? '2px solid #4e8df5' : '',
                            backgroundColor: selectPage === 'conversations' ? `${currentTheme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => navigateTo('conversations')}
                    >
                        <Badge size="small" count={1}>
                            <MessageTwoTone
                                className='navigationCenteredItem'
                                twoToneColor={selectPage === 'conversations' ? '#4e8df5' : "#3d3d3d"}
                                style={{ fontSize: 18 }}
                            />
                        </Badge>
                    </div>
                    <div className={`navigation ${lightnavigation}`}
                        style={{
                            borderBottom: selectPage === 'contacts' ? '2px solid #4e8df5' : '',
                            backgroundColor: selectPage === 'contacts' ? `${currentTheme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => navigateTo('contacts')}
                    >
                        <ContactsTwoTone
                            className='navigationCenteredItem'
                            twoToneColor={selectPage === 'contacts' ? '#4e8df5' : "#3d3d3d"}
                            style={{ fontSize: 18 }}
                        />
                    </div>
                    <div className={`navigation ${lightnavigation}`}
                        style={{
                            borderBottom: selectPage === 'favorites' ? '2px solid #4e8df5' : '',
                            backgroundColor: selectPage === 'favorites' ? `${currentTheme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => navigateTo('favorites')}
                    >
                        <StarTwoTone
                            className='navigationCenteredItem'
                            twoToneColor={selectPage === 'favorites' ? '#4e8df5' : "#3d3d3d"}
                            style={{ fontSize: 18 }}
                        />
                    </div>
                </div >
            </div>
        </>
    )
}
