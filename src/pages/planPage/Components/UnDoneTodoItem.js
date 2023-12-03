import React from 'react'
import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import { deletesession } from '../../../api/session.api'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../../redux/userSlice'
import { setSessions } from '../../../redux/SessionSlice'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'

const UnDoneTodoItem = ({ tutorial }) => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const dispatch = useDispatch()
    const navigateTo = useNavigate()
    const handleDelete = async () => {
        await deletesession(tutorial.sessionID).then(res => {
            if (res.status !== false) {
                const { user, updatedSessions } = res
                dispatch(loginSuccess(user))
                dispatch(setSessions(updatedSessions))
            }
        })
    }
    return (
        <div
            onClick={() => navigateTo(`/specifictutorial/${tutorial._id}`)}
            style={{ display: 'flex', alignItems: 'center', marginBottom: SIZE.NormalMargin, padding: 10, flexDirection: 'row', gap: 10, borderRadius: SIZE.CardBorderRadius, backgroundColor: currentTheme.backgroundColor }}
        >
            <div style={{ flexBasis: 6, height: 36, width: 6, borderRadius: 3, backgroundColor: COLORS.primary }}></div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: SIZE.NormalTitle, marginBottom: SIZE.LittleMargin, color: currentTheme.fontColor }}>{tutorial.name}</div>
                    <div style={{ fontSize: 12, color: COLORS.commentText }}>{tutorial.brief} </div>
                </div>
                <div onClick={(e) => { e.stopPropagation(); handleDelete() }}><DeleteOutlined /></div>
            </div>
        </div>
    )
}

export default UnDoneTodoItem