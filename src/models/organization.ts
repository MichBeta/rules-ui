interface OrganizationTree {
    id: string;
    ldapId: string;
    name: string;
    businessCategory: number;
    childOrganizations: OrganizationTree[];
    orgId: string;
    oePk: string;
    country: string;
    orgDisabled: string;
    testData: string;
    axnExpertEcOutage: string;
    parOrgId: string;
    has_novo_compliance: string;
}
interface FlattenOrganization{
    organizationTree:OrganizationTree;
    depth:number;
}

const flatten =( org:OrganizationTree, depth:number = 0) => {
    let descendants:FlattenOrganization[] = [{organizationTree:org, depth}];
    if(org.childOrganizations && org.childOrganizations.length > 0){
        org.childOrganizations.forEach(child => {
            descendants = descendants.concat(flatten(child, depth + 1));
        });
    }
    return descendants;
}

export { type OrganizationTree,type FlattenOrganization,flatten}