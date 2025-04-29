import { createSlice } from "@reduxjs/toolkit"

export const formDataSlice = createSlice({
    name: "formData",
    initialState: {
        data: {
            id: "",
            name: "",
            address: "",
            city_id: "",
            nit: "",
            number_rooms: "",
        },
        errors: {}
    },
    reducers: {
        addFormDataByValue: (state, action) => {
            state.data = {
                ...state.data,
                [action.payload.name]: action.payload.value
            }
        },
        addFormData: (state, action) => {
            state.data = action.payload
        },
        addErrors: (state, action) => {
            state.errors = action.payload
        },
        clearErrors: (state) => {
            state.errors = {}
        }
    }
})

export const { addFormDataByValue, addFormData, addErrors, clearErrors } = formDataSlice.actions

export default formDataSlice.reducer