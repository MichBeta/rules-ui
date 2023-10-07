import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

type User = {
    id: string;
    country: string;
    lob_id: string;
    org_name: string;
    org_bus_cat: string;
    last_name: string;
    first_name: string;
    middle_name: string;
    userRoles: Roles;
    email_adress: string;
}

type Roles = [
    {
        role_org_id: string;
        role_type: string;
        wae_pk: string;
        asc_identity: string;
        ext_identity: string;
        roleCapabilities: RoleCapabilities;
    }
]

type RoleCapabilities = [
    {
        capability_desc: string;
        capability_value: string;
    }
]

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rules-service.tkg-rms-dev.usdc01.solera.farm/api/ngp/user'
    }),
    endpoints: (builder) => ({
        getUserById: builder.query<User, string>({
            query: (id) => `/ExactUid/${id}`,
        })
    })
})

export const {useGetUserByIdQuery} = userApi;