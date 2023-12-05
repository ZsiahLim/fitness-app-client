import React, { useEffect, useState } from 'react'
import SIZE from '../../constants/SIZE'
import './index.less'
import { Avatar, message } from 'antd'
import useUserTheme from '../../hooks/useUserTheme'
import APPTHEME from '../../constants/COLORS/APPTHEME'
import { addcontactbyid, createconversation } from '../../api/user.api'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../../redux/userSlice'
import COLORS from '../../constants/COLORS'
import { useNavigate } from 'react-router-dom'
import GENDER from '../../constants/GENDER'
import { ManOutlined, WomanOutlined } from '@ant-design/icons'

export default function ContactHorizontal({ contact }) {
    const dispatch = useDispatch()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const { currentUser } = useSelector(state => state.user)
    const navigateTo = useNavigate()
    const { contactsUsers } = currentUser
    const { name, gender, avator } = contact
    const { _id: ContactID } = contact

    useEffect(() => {
        setAlreadySubscribed(currentUser.contactsUsers.includes(ContactID))
    }, [currentUser])

    const [alreadySubscribed, setAlreadySubscribed] = useState(contactsUsers.includes(ContactID))
    const handleSubscribe = async () => {
        await addcontactbyid(ContactID).then(res => {
            if (res.status !== false) {
                dispatch(loginSuccess(res))
            } else {
                message.error('出现异常请稍后重试')
            }
        })
    }
    const handleSendMessage = async () => {
        await createconversation({ receiverId: ContactID }).then(res => {
            if (res.status !== false) {
                navigateTo(`/chat/conversations/specific/${conversation._id}`)
                dispatch(loginSuccess(res.user))
                const conversation = res.conversation
            } else {
                console.log(res);
                message.error("出现异常请稍后重试")
            }
        })
    }
    return (
        <div
            className='ContactHorizontal'
            style={{
                borderRadius: SIZE.CardBorderRadius,
                backgroundColor: currentTheme.backgroundColor,
                display: 'flex',
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                padding: "10px 10px",
                marginBottom: 10,
                flexDirection: 'row'
            }}>
            <div
                className='ContactHorizontal-user'
                onClick={() => {
                    navigateTo(`user/${ContactID}`)
                }}
                style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={avator} />
                <div
                    style={{
                        flex: 1,
                        padding: '0 6px',
                        height: '100%'
                    }}>
                    <div style={{ fontSize: 14, color: currentTheme.fontColor, fontWeight: 'bold', wordBreak: 'break-word', }}>
                        <div>
                            {name}
                        </div>
                        {gender === GENDER.male ? <ManOutlined style={{ color: COLORS.primary, fontSize: 12 }} /> : <WomanOutlined style={{ color: COLORS.pink, fontSize: 12 }} />}
                    </div>
                </div>
            </div>
            {alreadySubscribed ? <div className='optionBtn' onClick={handleSendMessage}
                style={{ color: COLORS.commentText, }}>发消息</div>
                : <div className='optionBtn' onClick={handleSubscribe} style={{ color: COLORS.primary, }}>关注</div>
            }
        </div >
    )
}
