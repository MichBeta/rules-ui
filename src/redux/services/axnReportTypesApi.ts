import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const axnReportTypesApi = createApi({
    reducerPath: 'axnReportTypesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api'
    }),
    endpoints: (builder) => ({
        getAxnReportTypes: builder.query<[{WORK_ITEM_PK:number, ITEM_TYPE:string}], string>({
            query: (id) => `/getReportTypes?claimNumber=${id}`,
        }),
    }),
})

export const { useGetAxnReportTypesQuery } = axnReportTypesApi;