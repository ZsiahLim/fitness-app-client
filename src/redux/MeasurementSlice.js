import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    measurements: [],
    latestMeasurement: {}
}

export const MeasurementSlicer = createSlice({
    name: 'measurements',
    initialState,
    reducers: {
        setMeasurements: (state, action) => {
            state.measurements = action.payload
        },
        setLatestMeasurement: (state, action) => {
            state.latestMeasurement = action.payload
        },
    }
})

export const { setMeasurements, setLatestMeasurement } = MeasurementSlicer.actions

export default MeasurementSlicer.reducer