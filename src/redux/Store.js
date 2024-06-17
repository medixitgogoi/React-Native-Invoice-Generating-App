import { configureStore } from '@reduxjs/toolkit';
import billReducer from "./BillDetailsSlice";
import userReducer from "./UserSlice";
import loginReducer from './LoginSlice';

export const store = configureStore({
    reducer: {
        bill: billReducer,
        user: userReducer,
        login: loginReducer,
    },
})