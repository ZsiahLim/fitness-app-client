import React, { useEffect, useState } from 'react'
import SIZE from '../../constants/SIZE'
import { Avatar, message } from 'antd'
import useUserTheme from '../../hooks/useUserTheme'
import APPTHEME from '../../constants/COLORS/APPTHEME'
import { createconversation, getuser, removecontact } from '../../api/user.api'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../redux/userSlice'
import COLORS from '../../constants/COLORS'
import { MessageFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'

export default function ContactHorizontalWithID({ contactID }) {
    const intl = useIntl()
    const dispatch = useDispatch()
    const theme = useUserTheme()
    const navigateTo = useNavigate()
    const currentTheme = APPTHEME[theme]
    const [contact, setContact] = useState({ name: "", gender: "", avator: null })
    const { name, gender, avator } = contact
    const getUser = async () => {
        await getuser(contactID).then(res => {
            if (res.status !== false) {
                setContact(res)
            } else {
                message.error(intl.formatMessage({id: 'error.errorMsg'}))
            }
        })
    }
    const handleSendMessage = async () => {
        await createconversation({ receiverId: contactID }).then(res => {
            if (res.status !== false) {
                const conversation = res.conversation
                navigateTo(`/chat/conversations/specific/${conversation._id}`)
            } else {
                console.log(res);
                message.error(intl.formatMessage({id: 'error.errorMsg'}))
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
            padding: 10,
            marginBottom: 4,
            flexDirection: 'row'
        }}>
            <div
                className='buttonHover'
                onClick={() => navigateTo(`/chat/contacts/detail/${contactID}`)}
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
            <div className='buttonHover' onClick={handleSendMessage} style={{ color: COLORS.commentText, }}><MessageFilled /></div>
        </div >
    )
}
