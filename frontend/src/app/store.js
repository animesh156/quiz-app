import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import quizOptionsReducer from '../features/quiz/quizSlice'

export const store = configureStore(
    {
        reducer:{
            auth: authReducer,
            quizOptions: quizOptionsReducer,
        }
    }
)