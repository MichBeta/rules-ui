import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

interface Predicate{
    name: string;
    tag: string;
    parameters: Parameter[];
}

interface Parameter{
    name: string;
    type: string;
}

export const predicateApi = createApi({
    reducerPath: 'predicateApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rules-service.tkg-rms-dev.usdc01.solera.farm/api'
    }),
    endpoints: (builder) => ({
        getPredicates: builder.query<Predicate[], null>({
            query: () => `/predicates`,
        }),
    }),
})

export const { useGetPredicatesQuery } = predicateApi;