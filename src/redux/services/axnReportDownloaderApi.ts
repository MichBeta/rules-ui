import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const axnReportDownloaderApi = createApi({
    reducerPath: 'axnReportDownloaderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api'
    }),
    endpoints: (builder) => ({
        //`/download-report?workItemPk=${id}&reportVersion=${version}`
        axnReportDownloader: builder.query<string, {workItemPK: number, reportVersion: string}>({
            query: ({workItemPK, reportVersion}) => `/download-report?workItemPk=${workItemPK}&reportVersion=${reportVersion}`,
        }),
    }),
})

export const { useAxnReportDownloaderQuery } = axnReportDownloaderApi;