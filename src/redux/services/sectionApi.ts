import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface Sections{
    SectionPageCode: string;
    DescText: string;
    SectionCode: string;
}

export const sectionApi = createApi({
    reducerPath: 'sectionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rules-service.tkg-rms-dev.usdc01.solera.farm/api'
    }),
    endpoints: (builder) => ({
        getSections: builder.query<Sections[], null>({
            query: () => `/sections`,
        }),
    })
})

export const { useGetSectionsQuery } = sectionApi;