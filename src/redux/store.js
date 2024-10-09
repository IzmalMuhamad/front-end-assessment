import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './authToken'

export default configureStore({
    reducer: {
        authToken: tokenReducer,
    }
})