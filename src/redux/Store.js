import { configureStore } from '@reduxjs/toolkit';
import billReducer from "./BillDetailsSlice";
import userReducer from "./UserSlice";

export const store = configureStore({
    reducer: {
        bill: billReducer,
        user: userReducer,
    },
})