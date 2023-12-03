import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    systemMsgsTabShow: true,
    messagesTabShow: true,
    todosTabShow: true,
}

export const NotificationSettingSlice = createSlice({
    name: 'notificationTab',
    initialState,
    reducers: {
        setSystemMsgs: (state, action) => {
            state.systemMsgsTabShow = action.payload
        },
        setMessages: (state, action) => {
            state.messagesTabShow = action.payload
        },
        setTodos: (state, action) => {
            state.todosTabShow = action.payload
        },
        setNotificationTab: (state, action) => {
            state.todosTabShow = action.payload.todosTabShow
            state.systemMsgsTabShow = action.payload.systemMsgsTabShow
            state.messagesTabShow = action.payload.messagesTabShow
        },
    }
})

export const { setMessages, setSystemMsgs, setTodos, setNotificationTab } = NotificationSettingSlice.actions

export default NotificationSettingSlice.reducer