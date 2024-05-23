import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
        },
        logoutUser: (state) => {
            return state = [];
        }
    },
})

// Action creators are generated for each case reducer function
export const { addUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;