import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const groupApi = createApi({
    reducerPath: 'groupApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rules-service.tkg-rms-dev.usdc01.solera.farm/api'
    }),
    endpoints: (builder) => ({
        getGroups: builder.query<Group[], null>({
            query: () => `/groups`,
        }),
        getGroupById: builder.query<Group, string>({
            query: (id) => `/groups/${id}`,
        }),
        getGroupsByOrganizationId: builder.query<Group[], string>({
            query: (id) => `/groups/org/${id}`,
        }),
        createGroup: builder.mutation<Group, Group>({
            query: (group) => ({
                url: `/groups`,
                method: 'POST',
                body: group
            }),
        }),
        deleteGroup: builder.mutation({
            query: (id) => ({
                url: `/groups/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetGroupsQuery,
    useGetGroupByIdQuery,
    useGetGroupsByOrganizationIdQuery,
    useCreateGroupMutation,
    useDeleteGroupMutation,
} = groupApi;