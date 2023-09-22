import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    contacts: {}
}

export const ContactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setContacts: (state, action) => {
            state.contacts = action.payload
        }
    }
})

export const { setContacts } = ContactSlice.actions

export default ContactSlice.reducer