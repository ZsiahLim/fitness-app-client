import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
    currentTheme: null,
    userLocale: null
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
            state.userLocale = action.payload.preferedLanguage
            switch (action.payload.preferedLanguage) {
                case 'zh_CN':
                    state.userLocale = "zh_CN"
                    break;
                case 'en_US':
                    state.userLocale = "en_US"
                    break;
                default:
                    state.userLocale = navigator.language
                    break;
            }
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
        setLocale: (state, action) => {
            state.userLocale = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setLoading, loginStart, loginFailure, loginSuccess, logout, setTheme, setLocale } = UserSlicer.actions

export default UserSlicer.reducer