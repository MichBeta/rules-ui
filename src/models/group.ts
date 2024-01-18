enum AssignmentType {
    Enterprise = 1,
    XpertPartner = 2,
    XpertInternal = 4,
    All = Enterprise | XpertPartner | XpertInternal
}
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
    officeId: string;
    assignmentType: number;
}

interface Group {
    entityId?: string;
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
export {type IVersionedEntity,type ICondition,type PreconditionAssignments,type GroupAssignment,type Group , AssignmentType}