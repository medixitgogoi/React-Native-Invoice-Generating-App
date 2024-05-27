import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const billDetailsSlice = createSlice({
    name: 'bill',
    initialState,
    reducers: {
        addItemToBill: (state, action) => {
            const newItem = {
                id: Date.now() + Math.random().toString(36).substring(2, 9),
                ...action.payload
            };
            state.push(newItem);
        },
        removeItemFromBill: (state, action) => {
            return state.filter(item => item.id !== action.payload.id);
        },
        emptyBill: (state) => {
            return state = [];
        },
    },
})

export const { addItemToBill, removeItemFromBill, emptyBill } = billDetailsSlice.actions;
export default billDetailsSlice.reducer;