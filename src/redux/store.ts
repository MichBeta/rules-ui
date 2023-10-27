import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import ruleCodeReducer from './features/ruleCodeSlice';
import groupCodeReducer from './features/groupCodeSlice';
import credentialReducer from './features/credentialSlice';
import sidebarReducer from './features/sidebarSlice';
import {userApi} from "@/redux/services/userApi";
import {ruleApi} from "@/redux/services/ruleApi";
import {groupApi} from "@/redux/services/groupApi";
import {predicateApi} from "@/redux/services/predicateApi";
import {claimFieldApi} from "@/redux/services/claimFieldApi";
import {enumerationApi} from "@/redux/services/enumerationApi";
import {partApi} from "@/redux/services/partApi";
import {sectionApi} from "@/redux/services/sectionApi";
import {setupListeners} from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
    reducer: {
        counterReducer: counterReducer,
        ruleCodeReducer: ruleCodeReducer,
        groupCodeReducer: groupCodeReducer,
        credentialReducer: credentialReducer,
        sidebarReducer: sidebarReducer,
        [userApi.reducerPath]: userApi.reducer,
        [ruleApi.reducerPath]: ruleApi.reducer,
        [groupApi.reducerPath]: groupApi.reducer,
        [predicateApi.reducerPath]: predicateApi.reducer,
        [claimFieldApi.reducerPath]: claimFieldApi.reducer,
        [enumerationApi.reducerPath]: enumerationApi.reducer,
        [partApi.reducerPath]: partApi.reducer,
        [sectionApi.reducerPath]: sectionApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(ruleApi.middleware)
        .concat(groupApi.middleware)
        .concat(predicateApi.middleware)
        .concat(claimFieldApi.middleware)
        .concat(enumerationApi.middleware)
        .concat(partApi.middleware)
        .concat(sectionApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;