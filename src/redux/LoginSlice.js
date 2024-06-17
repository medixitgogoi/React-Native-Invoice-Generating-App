import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        addLoginUser: (state, action) => {
            state.push(action.payload);
        },
        logoutUser: (state) => {
            return state = [];
        },
    },
})

// Action creators are generated for each case reducer function
export const { addLoginUser, logoutUser } = loginSlice.actions;
export default loginSlice.reducer;