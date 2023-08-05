import React, { useState, useEffect } from 'react'
import {
    StarTwoTone,
    MessageTwoTone,
    ContactsTwoTone,
} from '@ant-design/icons';
import { Badge } from 'antd';



export default function Sidebar(props) {
    const { theme, changeSelectPage } = props
    useEffect(() => {
        console.log(theme);
    }, [theme])
    const [selectPage, setSelectPage] = useState('chat');
    const lightnavigation = theme === 'light' ? 'navigation-light' : ''
    useEffect(() => {
        changeSelectPage(selectPage)
    }, [selectPage])
    return (
        <>
            <div className='chat-edit-bar'>
                <div className='navigationBar'>
                    <div className={`navigation ${lightnavigation}`}
                        style={{
                            borderBottom: selectPage === 'chat' ? '2px solid #4e8df5' : '',
                            backgroundColor: selectPage === 'chat' ? `${theme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => setSelectPage('chat')}
                    >
                        <Badge size="small" count={1}>
                            <MessageTwoTone
                                className='navigationCenteredItem'
                                twoToneColor={selectPage === 'chat' ? '#4e8df5' : "#3d3d3d"}
                                style={{ fontSize: 18 }}
                            />
                        </Badge>
                    </div>
                    <div className={`navigation ${lightnavigation}`}
                        style={{
                            borderBottom: selectPage === 'contact' ? '2px solid #4e8df5' : '',
                            backgroundColor: selectPage === 'contact' ? `${theme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => setSelectPage('contact')}
                    >
                        <ContactsTwoTone
                            className='navigationCenteredItem'
                            twoToneColor={selectPage === 'contact' ? '#4e8df5' : "#3d3d3d"}
                            style={{ fontSize: 18 }}
                        />
                    </div>
                    <div className={`navigation ${lightnavigation}`}
                        style={{
                            borderBottom: selectPage === 'favorites' ? '2px solid #4e8df5' : '',
                            backgroundColor: selectPage === 'favorites' ? `${theme === 'dark' ? '#383838' : '#ffffff'}` : ''
                        }}
                        onClick={() => setSelectPage('favorites')}
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
