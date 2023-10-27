import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { Part } from "@/models/part";

export const partApi = createApi({
    reducerPath: 'partApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rules-service.tkg-rms-dev.usdc01.solera.farm/api'
    }),
    endpoints: (builder) => ({
        getPartsBySectionCode: builder.query<Part, string>({
            query: (sectionCode) => `/parts/${sectionCode}`,
        }),
    })
})

export const {useGetPartsBySectionCodeQuery} = partApi;

