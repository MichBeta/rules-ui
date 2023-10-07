import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    ruleCode: ''
}

export const ruleCodeSlice = createSlice({
    name: 'ruleCode',
    initialState,
    reducers: {
        setRuleCode: (state, action) => {
            state.ruleCode = action.payload;
        },
        clearRuleCode: (state) => {
            state.ruleCode = '';
        }
    }
});

export const {setRuleCode, clearRuleCode} = ruleCodeSlice.actions;

export default ruleCodeSlice.reducer;