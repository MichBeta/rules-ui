import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import ruleCodeReducer from './features/ruleCodeSlice';
import credentialReducer from './features/credentialSlice';
import {userApi} from "@/redux/services/userApi";
import {ruleApi} from "@/redux/services/ruleApi";
import {setupListeners} from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
    reducer: {
        counterReducer: counterReducer,
        ruleCodeReducer: ruleCodeReducer,
        credentialReducer: credentialReducer,
        [userApi.reducerPath]: userApi.reducer,
        [ruleApi.reducerPath]: ruleApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(ruleApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;