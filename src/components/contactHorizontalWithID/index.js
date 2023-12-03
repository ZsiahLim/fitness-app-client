import React, { useEffect, useState } from 'react'
import SIZE from '../../constants/SIZE'
import { Avatar, message } from 'antd'
import useUserTheme from '../../hooks/useUserTheme'
import APPTHEME from '../../constants/COLORS/APPTHEME'
import { createconversation, getuser, removecontact } from '../../api/user.api'
import GENDER from '../../constants/GENDER'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../redux/userSlice'
import COLORS from '../../constants/COLORS'
import { MessageFilled } from '@ant-design/icons'

export default function ContactHorizontalWithID({ contactID }) {
    const dispatch = useDispatch()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const [contact, setContact] = useState({ name: "", gender: "", avator: null })
    const { name, gender, avator } = contact
    const getUser = async () => {
        await getuser(contactID).then(res => {
            if (res.status !== false) {
                setContact(res)
            } else {
                message.error("出现异常请稍后重试")
            }
        })
    }
    const handleSendMessage = async () => {
        await createconversation({ receiverId: contactID }).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res.user))
                const conversation = res.conversation
                // navigate('SpecificConversationPage', { conversationID: conversation._id, contact })
            } else {
                console.log(res);
                message.error("出现异常请稍后重试")
            }
        })
    }
    const handleDeleteUser = async () => {
        await removecontact(contactID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res))
            } else {
                message.error("出现异常请稍后重试")
            }
        })
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <div style={{
            borderRadius: SIZE.CardBorderRadius,
            backgroundColor: currentTheme.backgroundColor,
            display: 'flex',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            padding: "4px 4px",
            marginBottom: 4,
            flexDirection: 'row'
        }}>
            <div onClick={() => {
                // navigate('UserPage', { userID: contactID })
            }}
                style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={avator} />
                <div
                    style={{
                        flex: 1,
                        padding: '0 2px',
                        height: '100%'
                    }}>
                    <div style={{ fontSize: 14, color: currentTheme.fontColor, fontWeight: 'bold', wordBreak: 'break-word' }}>
                        {name}
                    </div>
                </div>
            </div>
            <div onClick={handleSendMessage} style={{ color: COLORS.commentText, }}><MessageFilled /></div>
        </div >
    )
}
