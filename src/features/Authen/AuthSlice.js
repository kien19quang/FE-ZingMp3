import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let initialState = {
    isLoggedIn: false,
    userInfor: '',
};

export const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            return { ...state, isLoggedIn: true };
        },

        setAccessToken: (state, action) => {
            return { ...state, userInfor: action.payload };
        },
    },
});

export const { setIsLoggedIn, setAccessToken } = songSlice.actions;

export default songSlice.reducer;
