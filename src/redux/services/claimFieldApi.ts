import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

interface ClaimField{
    name: string;
    category: string;
    type: string;
    xpath: string;
    canCalculateVariance: boolean;
}

export const claimFieldApi = createApi({
    reducerPath: 'claimFieldApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rules-service.tkg-rms-dev.usdc01.solera.farm/api'
    }),
    endpoints: (builder) => ({
        getClaimFields: builder.query<ClaimField[], null>({
            query: () => `/claimfields`,
        }),
    }),
})

export const { useGetClaimFieldsQuery } = claimFieldApi;