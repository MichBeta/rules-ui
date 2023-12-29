// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


interface OrganizationTree {
    id: string;
    ldapId: string;
    name: string;
    businessCategory: number;
    childOrganizations?: OrganizationTree[];
    orgId: string;
    oePk: string;
    country: string;
    orgDisabled: string;
    testData: string;
    axnExpertEcOutage: string;
    parOrgId: string;
    has_novo_compliance: string;
}
export interface FlattenOrganization{
    organizationTree:OrganizationTree;
    depth:number;
}

const flatten =( org:OrganizationTree, depth:number = 0) => {
    let descendants:FlattenOrganization[] = [{organizationTree:org, depth}];
    if(org.childOrganizations && org.childOrganizations.length > 0){
        org.childOrganizations.forEach(child => {
            descendants = descendants.concat(flatten(child, depth + 1));
        });
    }
    return descendants;
}

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