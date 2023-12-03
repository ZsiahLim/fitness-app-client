import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sessions: [],
}

export const SessionSlicer = createSlice({
    name: 'sessions',
    initialState,
    reducers: {
        setSessions: (state, action) => {
            state.sessions = action.payload
        },
    }
})

export const { setSessions } = SessionSlicer.actions

export default SessionSlicer.reducer