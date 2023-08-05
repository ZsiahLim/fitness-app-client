import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    nowConversation: {},
    loading: false,
    error: false,
}

export const ConversationSlicer = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        conversationStart: (state) => {
            state.loading = true
        },
        conversationSuccess: (state, action) => {
            state.loading = false
            state.nowConversation = action.payload
        },
        loginFailure: (state) => {
            state.loading = false
            state.error = true
        }
    }
})

export const { conversationStart, conversationSuccess, loginFailure } = ConversationSlicer.actions

export default ConversationSlicer.reducer