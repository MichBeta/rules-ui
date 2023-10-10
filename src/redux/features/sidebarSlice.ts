import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isExpanded: false
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isExpanded = !state.isExpanded;
        }
    }
});

export const {toggleSidebar} = sidebarSlice.actions;

export default sidebarSlice.reducer;