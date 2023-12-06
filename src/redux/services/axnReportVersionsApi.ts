import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const axnReportVersionsApi = createApi({
    reducerPath: 'axnReportVersionsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://clms.tkg-rms-dev.usdc01.solera.farm/api'
    }),
    endpoints: (builder) => ({
        getAxnReportVersions: builder.query<[string], number>({
            query: (id) => `/getReportVersion?workItemPk=${id}`,
        }),
    }),
})

export const { useGetAxnReportVersionsQuery } = axnReportVersionsApi;