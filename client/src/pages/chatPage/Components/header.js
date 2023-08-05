import React from 'react'
import axios from 'axios';
import {
    SearchOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { Input, Button, Popover, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../../../redux/userSlice'

const Content = () => {
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const addContacts = async (contactID) => {
        try {
            dispatch(loginStart())
            const res = await axios.put(`http://localhost:3001/api/users/add/${contactID}`, {}, { withCredentials: true })
            dispatch(loginSuccess(res.data))
        } catch (error) {
            message.error('add contact failure')
        }
    }
    return (
        <div>
            User ID <Input onPressEnter={({ target: { value } }) => { addContacts(value); }} placeholder="Search" style={{ width: '200px' }} prefix={<SearchOutlined />} allowClear />
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
