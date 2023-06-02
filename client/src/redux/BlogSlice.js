import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
}

export const BlogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.loading = false
            state.error = true
        },
        logout: (state) => {
            state.loading = false
            state.currentUser = null
            state.error = false
        }
    }
})

export const { loginStart, loginFailure, loginSuccess, logout } = BlogSlice.actions

export default BlogSlice.reducer