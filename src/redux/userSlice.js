import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
    currentTheme: null
}

export const UserSlicer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.currentUser = action.payload
            state.currentTheme = action.payload.preferedTheme
        },
        loginFailure: (state) => {
            state.loading = false
            state.error = true
        },
        logout: (state) => {
            state.loading = false
            state.currentUser = null
            state.error = false
        },
        setTheme: (state, action) => {
            state.currentTheme = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setLoading, loginStart, loginFailure, loginSuccess, logout, setTheme } = UserSlicer.actions

export default UserSlicer.reducer