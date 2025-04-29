import { configureStore } from "@reduxjs/toolkit";
import roomDataReducer from "../slice/roomDataSlice";

export default configureStore({
    reducer: {
        roomData: roomDataReducer
    },
})