import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    storedMyBlogs: [],
    shouldUpdateMine: false,
    randomBlogs: [],
    shouldUpdateRandom: false,
}

export const BlogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        storeMyBlogs: (state, action) => {
            state.storedMyBlogs = action.payload
            state.shouldUpdateMine = false
        },
        setShouldUpdateMine: (state, action) => {
            state.shouldUpdateMine = true
        },
        storeRandomBlogs: (state, action) => {
            state.randomBlogs = action.payload
            state.shouldUpdateRandom = false
        },
        setShouldUpdateRandom: (state, action) => {
            state.shouldUpdateMine = true
        },
    }
})

export const { storeMyBlogs, setShouldUpdateMine, storeRandomBlogs, setShouldUpdateRandom } = BlogSlice.actions

export default BlogSlice.reducer