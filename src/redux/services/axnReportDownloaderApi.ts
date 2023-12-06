import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const axnReportDownloaderApi = createApi({
    reducerPath: 'axnReportDownloaderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://clms.tkg-rms-dev.usdc01.solera.farm'
    }),
    endpoints: (builder) => ({
        //`/download-report?workItemPk=${id}&reportVersion=${version}`
        axnReportDownloader: builder.query<string, {workItemPK: number, reportVersion: string}>({
            query: ({workItemPK, reportVersion}) => `/download-report?workItemPk=${workItemPK}&reportVersion=${reportVersion}`,
        }),
    }),
})

export const { useAxnReportDownloaderQuery } = axnReportDownloaderApi;