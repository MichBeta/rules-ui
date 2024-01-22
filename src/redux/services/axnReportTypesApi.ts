import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const axnReportTypesApi = createApi({
    reducerPath: 'axnReportTypesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://clms.tkg-rms-dev.usdc01.solera.farm/api'
    }),
    endpoints: (builder) => ({
        getAxnReportTypes: builder.query<[{CASEID:string, ID:string, TYPE:string, FILENAME:string, VERSION:number}], string>({
            query: (id) => `/getServerPdfList?claimNumber=${id}`,
        }),
    }),
})

export const {  useGetAxnReportTypesQuery } = axnReportTypesApi;