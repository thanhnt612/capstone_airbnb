import { configureStore } from '@reduxjs/toolkit'
import userReduder from './reducers/userReduder';
import bookingReducer from './reducers/bookingReducer';
export const store = configureStore({
    reducer: {
        userReduder,
        bookingReducer
    }
})

//type của dispatch và state tổng
export type RootState = ReturnType<typeof store.getState>

export type DispatchType = typeof store.dispatch;