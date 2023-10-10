import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    groupCode: ''
}

export const groupCodeSlice = createSlice({
    name: 'groupCode',
    initialState,
    reducers: {
        setGroupCode: (state, action) => {
            state.groupCode = action.payload;
        },
        clearGroupCode: (state) => {
            state.groupCode = '';
        }
    }
});

export const {setGroupCode, clearGroupCode} = groupCodeSlice.actions;

export default groupCodeSlice.reducer;