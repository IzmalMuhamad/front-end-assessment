import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
    name: 'authToken',
    initialState: {
        token: localStorage.getItem('localToken') || null,
    },
    reducers: {
        addToken: state => {
            const newToken = Date.now();
            state.token = newToken;
            localStorage.setItem('localToken', newToken);
        },
        deleteToken: state => {
            state.token = null;
            localStorage.removeItem('localToken');
        },
    }
});

// Action creators are generated for each case reducer function
export const { addToken, deleteToken } = tokenSlice.actions;

export default tokenSlice.reducer;
