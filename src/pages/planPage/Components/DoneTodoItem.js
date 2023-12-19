import SIZE from '../../../constants/SIZE'
import COLORS from '../../../constants/COLORS'
import { deletesession } from '../../../api/session.api'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../../redux/userSlice'
import { setSessions } from '../../../redux/SessionSlice'
import useUserTheme from '../../../hooks/useUserTheme'
import APPTHEME from '../../../constants/COLORS/APPTHEME'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, DownCircleFilled } from '@ant-design/icons'

const DoneTodoItem = ({ tutorial }) => {
    const dispatch = useDispatch()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
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
    const handleNav = () => navigateTo("/finish", { state: { tutorial, exerciseData: tutorial.session } })
    return (
        <div
            onClick={handleNav}
            style={{ display: 'flex', alignItems: 'center', marginBottom: SIZE.NormalMargin, padding: 10, flexDirection: 'row', gap: 10, borderRadius: SIZE.CardBorderRadius, backgroundColor: currentTheme.backgroundColor }}
        >
            <div style={{ flexBasis: 6, height: 36, width: 6, borderRadius: 3, backgroundColor: COLORS.primary }}></div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ maxWidth: 240, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginRight: 10, fontSize: 16, marginBottom: SIZE.LittleMargin, color: currentTheme.fontColor }}>{tutorial.name}</div>
                    <div style={{ fontSize: 12, color: COLORS.commentText }}>{tutorial.brief} </div>
                </div>
                <div style={{ display: 'flex', gap: SIZE.NormalMargin, alignItems: 'center' }}>
                    <DownCircleFilled style={{ color: COLORS.green }} />
                    <div onClick={(e) => {
                        e.stopPropagation()
                        handleDelete()
                    }}>
                        <DeleteOutlined />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoneTodoItem