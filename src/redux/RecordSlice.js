import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    records: [],
}

export const RecordSlicer = createSlice({
    name: 'records',
    initialState,
    reducers: {
        setRecords: (state, action) => {
            state.records = action.payload
        },
    }
})

export const { setRecords } = RecordSlicer.actions

export default RecordSlicer.reducer