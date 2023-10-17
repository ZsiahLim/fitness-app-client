import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import './index.less'

export default function Contact({ contact, selected }) {
    const { currentTheme } = useSelector(state => state.user)
    const selectedClassname = selected ? (currentTheme === 'light' ? "chatPage-oneContact-light-selected" : "chatPage-oneContact-dark-selected") : ''
    const lightClassname = currentTheme === 'light' ? "chatPage-oneContact-light" : ''

    return (
        <div className={`chatPage-oneContact ${selectedClassname} ${lightClassname}`} >
            <div className='chatPage-oneContact-avator'>
                <Avatar shape='square' size={50} src={contact?.avator} icon={<UserOutlined />} />
            </div>
            <div className='chatPage-oneContact-name'>
                {contact && contact.name}
            </div>
        </div>
    )
}
