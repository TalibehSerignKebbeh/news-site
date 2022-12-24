import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'auth',
    initialState: {user: null, token: null},
    reducers: {
        setCredentials: (state, action) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
        },
        resetCredentials: (state, action) => {
            state.token = null;
            state.user = null
        }
    }
})

export default authSlice.reducer;
export const { setCredentials, resetCredentials } = authSlice.actions;
export const myToken = (state) => state?.auth?.token;
export const myProfileData = (state) => state?.auth?.user;