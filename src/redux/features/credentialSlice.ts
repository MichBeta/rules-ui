import {createSlice} from "@reduxjs/toolkit";
import {cookies} from "next/headers";

const initialState = {
    username: '',
    password: '',
    grant_type: 'password',
    client_id: 'rules.ui',
    scope: 'openid',
    client_secret: 'thisisasecret'
}

export const credentialSlice = createSlice({
    name: 'credential',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
    }
});

export const {setUsername, setPassword} = credentialSlice.actions;

export default credentialSlice.reducer;