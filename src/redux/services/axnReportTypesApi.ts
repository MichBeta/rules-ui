import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const axnReportTypesApi = createApi({
    reducerPath: 'axnReportTypesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://clms.tkg-rms-dev.usdc01.solera.farm/api'
    }),
    endpoints: (builder) => ({
        getAxnReportTypes: builder.query<[{WORK_ITEM_PK:number, ITEM_TYPE:string}], string>({
            query: (id) => `/getReportTypes?claimNumber=${id}`,
        }),
    }),
})

export const { useGetAxnReportTypesQuery } = axnReportTypesApi;