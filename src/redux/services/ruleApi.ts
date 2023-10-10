import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";


interface IVersionedEntity {
    entityId: string;
}

interface ICondition {
    hasDamageFieldsInTree: boolean;
    args: any[];
    CheckAsync(predicateService: any, variance: any, args: any[], estimate: any, damageLine: any, thresholds: any): Promise<boolean>;
}

interface RuleInputs {
    [key: string]: any;
}

interface Variance {
    total: number;
}

interface RuleThresholds {
    [key: string]: any;
}

interface IDamageLine {}

interface Field {
    type: string;
    value: any;
}

interface ClaimField extends Field {
    constructor(value: any, predictive: string, raw: string, type: string, isEditable: boolean): void;
}

interface RuleViolation {
    damageLine: IDamageLine | null;
    inputs: RuleInputs;
    thresholds: RuleThresholds;
    variance: number;
    violationMessage: string;
    severity: number;
}

interface PreconditionAssignments {
    ruleCode: string;
    violated: boolean;
}

interface GroupAssignment {
    groupId: string;
    ruleIds: string[];
}

interface Rule {
    entityId: string;
    code: number;
    ruleCode: string;
    condition: ICondition;
    archived: boolean;
    activated: boolean;
    lossRelatedDamage: boolean;
    relatedPriorDamage: boolean;
    unrelatedPriorDamage: boolean;
    description: string;
    violationMessage: string;
    assignedRuleIds: string[];
    groupAssignments: GroupAssignment[];
    name: string;
    owner: string;
    createdOn: Date;
    severity: number;
    triggerReview: boolean;
    triggerAlert: boolean;
    alertEmail: string;
    critical: boolean;
    preconditionAssignments: PreconditionAssignments[];
    minimumViolations: number | null;
    CheckAsync(estimate: any, prepareConditionService: any, predicateService: any, substitutionService: any, preconditionList: RuleList): Promise<RuleResult>;
}

interface RuleResult {
    rule: Rule;
    isTriggered: boolean;
    violations: RuleViolation[];
    errorMessage: string;
}

interface RuleList {
    AddRange(rules: Rule[]): void;
    RunRulesAsync(estimate: any, prepareConditionService: any, predicateService: any, substitutionService: any, preconditionList: RuleList): Promise<RuleResult[]>;
}


export const ruleApi = createApi({
    reducerPath: 'ruleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rules-service.tkg-rms-dev.usdc01.solera.farm/api'
    }),
    endpoints: (builder) => ({
        getRules: builder.query<Rule[], null>({
            query: () => `/rules`,
        }),
        getRuleById: builder.query({
            query: (id) => `/rules/${id}`,
        }),
        getRuleByRuleCode: builder.query<Rule, string>({
            query: (ruleCode) => `/rules/ruleByRuleCode/${ruleCode}`,
        }),
        createRule: builder.mutation({
            query: (rule) => ({
                url: `/rules`,
                method: 'POST',
                body: rule
            }),
        }),
        deleteRule: builder.mutation({
            query: (id) => ({
                url: `/rules/${id}`,
                method: 'DELETE',
            }),
        }),
    })
})

export const {useGetRulesQuery, useGetRuleByIdQuery, useGetRuleByRuleCodeQuery, useCreateRuleMutation, useDeleteRuleMutation} = ruleApi;