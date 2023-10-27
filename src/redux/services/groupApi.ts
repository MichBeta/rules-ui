import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";

interface IVersionedEntity {
    entityId: string;
}

interface ICondition {
    hasDamageFieldsInTree: boolean;
    args: any[];
    CheckAsync(predicateService: any, variance: any, args: any[], estimate: any, damageLine: any, thresholds: any): Promise<boolean>;
}

interface PreconditionAssignments {
    ruleCode: string;
    violated: boolean;
}

interface GroupAssignment {
    groupId: string;
    ruleIds: string[];
}

interface Group {
    entityId: string;
    name: string;
    owner: string;
    ruleCode?: string;
    condition?: ICondition;
    archived?: boolean;
    activated?: boolean;
    lossRelatedDamage?: boolean;
    relatedPriorDamage?: boolean;
    unrelatedPriorDamage?: boolean;
    description: string;
    severity?: number;
    triggerReview?: boolean;
    triggerAlert?: boolean;
    alertEmail?: string;
    critical?: boolean;
    preconditionAssignments?: PreconditionAssignments[];
    minimumViolations?: number | null;
    createdOn: Date;
    assignedRuleIds: string[];
    groupAssignments: GroupAssignment[];
    violationMessage?: string;
}

export const groupApi = createApi({
    reducerPath: 'groupApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rules-service.tkg-rms-dev.usdc01.solera.farm/api'
    }),
    endpoints: (builder) => ({
        getGroups: builder.query<Group[], null>({
            query: () => `/groups`,
        }),
        getGroupById: builder.query<Group, string>({
            query: (id) => `/groups/${id}`,
        }),
        getGroupsByOrganizationId: builder.query<Group[], string>({
            query: (id) => `/groups/org/${id}`,
        }),
        createGroup: builder.mutation<Group, Group>({
            query: (group) => ({
                url: `/groups`,
                method: 'POST',
                body: group
            }),
        }),
        deleteGroup: builder.mutation({
            query: (id) => ({
                url: `/groups/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetGroupsQuery,
    useGetGroupByIdQuery,
    useGetGroupsByOrganizationIdQuery,
    useCreateGroupMutation,
    useDeleteGroupMutation,
} = groupApi;