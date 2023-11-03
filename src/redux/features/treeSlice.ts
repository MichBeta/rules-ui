import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Organization} from "@/models/organization";

interface TreeState {
    nodes: Organization[];
}

const initialState: TreeState = {
    nodes: [], // Initialize with your tree data
};

const treeSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {
        setChildNodes: (state, action: PayloadAction<{ id: string; childNodes: Organization[] }>) => {
            // Find the parent node by ID and set its child nodes
            state.nodes = state.nodes.map(node =>
                node.id === action.payload.id
                    ? { ...node, childOrganizations: action.payload.childNodes }
                    : node
            );
        },
    },
});

export const { setChildNodes } = treeSlice.actions;
export default treeSlice.reducer;