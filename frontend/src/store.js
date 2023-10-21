import {configureStore} from '@reduxjs/toolkit'

import authRducer from "./slices/authSlice"
import userReducer from "./slices/userSlice"
import photoReducer from "./slices/photoSlice"
export const store = configureStore({
    reducer: {
        auth: authRducer,
        user:userReducer,
        photo:photoReducer,
    },
})
