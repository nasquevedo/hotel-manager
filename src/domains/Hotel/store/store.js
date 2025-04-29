import { configureStore } from "@reduxjs/toolkit";
import formDataReducer from "../slice/formDataSlice";

export default configureStore({
    reducer: {
        formData: formDataReducer
    },
})