import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Dictionary} from "@reduxjs/toolkit";

interface Enumeration {
    [key: string]: {
        [key: string]: string;
    }
}

export const enumerationApi = createApi({
    reducerPath: 'enumerationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rules-service.tkg-rms-dev.usdc01.solera.farm/api'
    }),
    endpoints: (builder) => ({
        getEnumerations: builder.query<Enumeration, null>({
            query: () => `/enumerations`,
        }),
    }),
})

export const { useGetEnumerationsQuery } = enumerationApi;