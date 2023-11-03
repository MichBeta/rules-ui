export interface Organization{
    id: string;
    name: string;
    businessCategory?: string;
    childOrganizations?: Organization[];
    orgId: string;
    oePk: string;
    country: string;
    orgDisabled: string;
    testData: string;
    axnExpertEcOutage: string;
    has_novo_compliance: string;
    isChecked: boolean;
}