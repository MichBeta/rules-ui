import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {WorklistModel} from "@/models/worklist";
import {BussinesStatus} from "@/models/bussinesStatus";


/*function getStatusFromIndex(index: number): string | undefined {
    const keys = Object.keys(BussinesStatus).filter(key => !isNaN(Number(BussinesStatus[key])));
    const key = keys.find(k => BussinesStatus[k] === index.toString());
    return key ? BussinesStatus[key] : undefined;
}*/

export const axnClaimsApi = createApi({
    reducerPath: 'axnClaimsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://clms.tkg-rms-dev.usdc01.solera.farm/api'
    }),
    endpoints: (builder) => ({
        getAxnClaims: builder.query<WorklistModel[], string>({
            query: (id) => `/getWorkList?lineOfBusiness=${id}`,
            transformResponse: (response: WorklistModel[]) => {
                return response.map((item: WorklistModel) => {
                    item.BUSINESSSTATUS = BussinesStatus[Number(item.BUSINESSSTATUS)];
                    return item;
                });
            }
        }),
    }),
})

export const { useGetAxnClaimsQuery } = axnClaimsApi;