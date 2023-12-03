import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    userSelectDay: new Date().toISOString(),
}

export const CalendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setUserSelectDay: (state, action) => {
            state.userSelectDay = action.payload
        },
    }
})

export const { setUserSelectDay } = CalendarSlice.actions

export default CalendarSlice.reducer