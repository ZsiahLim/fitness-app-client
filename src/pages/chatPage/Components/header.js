import { SearchOutlined, PlusOutlined, } from '@ant-design/icons'
import { Input, Button, Popover, message } from 'antd'
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess } from '../../../redux/userSlice'
import { addcontact } from '../../../api/user.api'

const Content = () => {
    const dispatch = useDispatch()
    const add = async (contactID) => {
        try {
            dispatch(loginStart())
            await addcontact({ method: 'userId', value: contactID }).then(updatedUser => {
                dispatch(loginSuccess(updatedUser))
            })
        } catch (error) {
            message.error('add contact failure')
        }
    }
    return (
        <div>
            User ID <Input onPressEnter={({ target: { contactID } }) => { add(contactID) }} placeholder="Search" style={{ width: '200px' }} prefix={<SearchOutlined />} allowClear />
        </div>
    )
}
export default function Header() {
    return (
        <>
            <Input placeholder="Search" style={{ width: '200px' }} prefix={<SearchOutlined />} allowClear />
            <Popover placement="bottomLeft" title={<h3>Add a new user</h3>} content={Content} arrow={false}>
                <Button icon={<PlusOutlined />} />
            </Popover>
        </>
    )
}
