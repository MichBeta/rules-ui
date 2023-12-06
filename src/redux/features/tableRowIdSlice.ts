import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    id: ""
}

export const tableRowSlice = createSlice({
    name: 'tableRow',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        }
    }
});

export const {setId} = tableRowSlice.actions;

export default tableRowSlice.reducer;