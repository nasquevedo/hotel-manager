import { createSlice } from "@reduxjs/toolkit"

export const roomDataSlice = createSlice({
    name: "roomData",
    initialState: {
        data: {
            id: "",
            hotel_id: "",
            room_accomodation: {
                room_id: "",
                accomodation_id: ""
            },
            number_rooms: ""
        },
        errors: {}
    },
    reducers: {
        addRoomDataByValue: (state, action) => {
            state.data = {
                ...state.data,
                [action.payload.name]: action.payload.value
            }
        },
        addRoomDataAccomodation: (state, action) => {
            state.data = {
                ...state.data,
                room_accomodation: { 
                    [action.payload.name]: action.payload.value
                }
            }
        },
        addRoomData: (state, action) => {
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

export const { addRoomDataByValue, addRoomDataAccomodation, addRoomData, addErrors, clearErrors } = roomDataSlice.actions

export default roomDataSlice.reducer