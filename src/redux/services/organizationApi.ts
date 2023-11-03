import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Organization} from "@/models/organization";


export const organizationApi = createApi({
    reducerPath: 'organizationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rules-service.tkg-rms-dev.usdc01.solera.farm/api'
    }),
    endpoints: (builder) => ({
        getOrganizationsById: builder.query<Organization[], string>({
            query: (id) => `/ngp/organization/id/${id}`,
        }),
    }),
})

export const { useGetOrganizationsByIdQuery } = organizationApi;