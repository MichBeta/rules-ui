// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { OrganizationTree, FlattenOrganization, flatten} from '@/models';

// Define a service using a base URL and expected endpoints
export const organizationApi = createApi({
    reducerPath: 'organizationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rules-service.tkg-rms-dev.usdc01.solera.farm/api/ngp/organization',
    }),
    endpoints: (builder) => ({
        getOrganizationById: builder.query<OrganizationTree, string>({
            query: (id) => `/id/${id}`,
        }),
        getOrganizationTree: builder.query<FlattenOrganization[], string>({
            query: (id) => `/id/${id}`,
            transformResponse: (response:OrganizationTree) => {
                return flatten(response);
            }
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetOrganizationByIdQuery,useGetOrganizationTreeQuery} = organizationApi;