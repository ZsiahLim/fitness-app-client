import React, { useEffect, useState } from 'react'
import COLORS from '../../../constants/COLORS'
import { AppstoreAddOutlined, AppstoreOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import SIZE from '../../../constants/SIZE'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { Empty } from 'antd'
import TutorialCardHorizontalWithID from '../../../components/tutorialCard/tutorialCardHorizontalWithID'

function MyExerciseCard() {
    const { currentUser } = useSelector(state => state.user)
    const [favoriteTutorials, setFavoriteTutorials] = useState([])
    const [practicedTutorials, setPracticedTutorials] = useState([])
    const theme = useUserTheme()
    const THEME = APPTHEME[theme]
    useEffect(() => {
        if (currentUser?.favoriteTutorials && currentUser?.favoriteTutorials.length !== 0) {
            setFavoriteTutorials(currentUser.favoriteTutorials)
        }
        if (currentUser?.practicedTutorials && currentUser?.practicedTutorials.length !== 0) {
            setPracticedTutorials(currentUser.practicedTutorials)
        }
    }, [currentUser])
    const [collapsed, setCollapsed] = useState(true)
    const [content, setContent] = useState([])
    const [contentTitle, setContentTitle] = useState()
    const cardItem = {
        favor: {
            label: '收藏课程',
            value: 'favor',
        },
        practise: {
            label: '练过课程',
            value: 'practise',
        }
    }
    const handleShowFavorContent = () => {
        if (collapsed) {
            setCollapsed(false)
        } else if (!collapsed) {
            contentTitle === cardItem.favor.label && setCollapsed(true)
        }
        setContent(favoriteTutorials);
        setContentTitle(cardItem.favor.label)
    }
    const handleShowPractiseContent = () => {
        if (collapsed) {
            setCollapsed(false)
        } else if (!collapsed) {
            contentTitle === cardItem.practise.label && setCollapsed(true)
        }
        setContent(practicedTutorials);
        setContentTitle(cardItem.practise.label)
    }
    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: THEME.backgroundColor, padding: SIZE.NormalMargin, borderRadius: SIZE.CardBorderRadius, marginBottom: SIZE.NormalMargin }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <div style={{ width: 6, height: 24, borderRadius: 4, backgroundColor: COLORS.primary }}></div>
                <div style={{ fontSize: 22, fontWeight: 'bold' }}>{"Exercise"}</div>
            </div>
            <div style={{ flex: 1, padding: '20px 0', display: 'flex', flexWrap: 'wrap', gap: SIZE.NormalMargin, backgroundColor: THEME.contentColor, borderRadius: SIZE.CardBorderRadius }}>
                <div onClick={handleShowFavorContent} className='buttonHover' style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: SIZE.NormalMargin }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ padding: SIZE.LargerMargin, borderRadius: SIZE.CardBorderRadius, backgroundColor: COLORS.primary }}>
                            <AppstoreAddOutlined style={{ fontSize: 36, color: COLORS.white }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: SIZE.NormalMargin, alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontWeight: 'bold', }}>{cardItem.favor.label}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', }}><div style={{ fontWeight: 'bold', fontSize: 20 }}>{favoriteTutorials.length}</div><div style={{ fontSize: 14, color: COLORS.commentText }}>{"节课程"}</div></div>
                    </div>
                </div>
                <div onClick={handleShowPractiseContent} className='buttonHover' style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: SIZE.NormalMargin }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ padding: SIZE.LargerMargin, borderRadius: SIZE.CardBorderRadius, backgroundColor: COLORS.commentText }}>
                            <AppstoreOutlined style={{ fontSize: 36, color: COLORS.white }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: SIZE.NormalMargin, alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontWeight: 'bold', }}>{cardItem.practise.label}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', }}><div style={{ fontWeight: 'bold', fontSize: 20 }}>{practicedTutorials.length}</div><div style={{ fontSize: 14, color: COLORS.commentText }}>{"节课程"}</div></div>
                    </div>
                </div>
            </div>
            {!collapsed && <div style={{ marginTop: SIZE.NormalMargin, backgroundColor: THEME.contentColor, borderRadius: SIZE.CardBorderRadius, padding: SIZE.NormalMargin }}>
                {content.length === 0 && <Empty description={"没有课程"} />}
                <div style={{ fontWeight: 'bold' }}>{contentTitle}</div>
                {content.map((item, index) => <TutorialCardHorizontalWithID key={index} withCalendar={true} tutorialID={item} />)}
            </div>}
        </div>
    )
}

export default MyExerciseCard