import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import dataReducer from '../features/dataSlice'
import playlistReducer from '../features/playlistSlice'


const store = configureStore({
    reducer : {
        auth : authReducer,
        data : dataReducer,
        playlist : playlistReducer,
    }
})

export default store