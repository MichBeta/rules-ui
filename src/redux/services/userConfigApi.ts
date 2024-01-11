import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import UserConfig from "@/models/userConfig";


export const userConfigApi = createApi({
    reducerPath: 'userConfigApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rules-service.tkg-rms-dev.usdc01.solera.farm/api/user-settings'
    }),
    endpoints: (builder) => ({
        getUserConfigByUserId: builder.query<UserConfig, string>({
            query: (userId) => `/${userId}`,
        }),
        createUserConfig: builder.mutation<UserConfig, UserConfig>({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body: body,
            }),
        }),
        updateUserConfigByUserId: builder.mutation<UserConfig, UserConfig>({
            query: (body) => ({
                url: '/',
                method: 'PUT',
                body: body,
            }),
        }),
    }),
})

export const { useGetUserConfigByUserIdQuery, useCreateUserConfigMutation, useUpdateUserConfigByUserIdMutation } = userConfigApi;