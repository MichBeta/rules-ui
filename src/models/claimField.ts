export interface ClaimField{
    name: string;
    category: string;
    type: string;
    xpath: string;
    canCalculateVariance: boolean;
}

export interface ClaimRow {
    CLAIMNUMBER: string;
    GROSSTOTAL: string;
    ACCIDENTDATETIME: string;
    DOLLARVARIANCE: string;
    PERCENTAGEVARIANCE: string;
    SEVERITY: string;
    OWNER: string;
    VEHICLE: string;
    BUSINESSSTATUS: string;
    SUPPLEMENTAMOUNT: string;
    APPRAISER: string;
    INSUREDPOLICYNUMBER: string;
    ATTACHMENTS: string;
    CLAIMRESOURCE: string;
    DEDUCTIBLE: string;
    DRIVABLE: string;
    INSPECTIONLOCATION: string;
    INSURANCECOMPANY: string;
    LASTUPDATEDDATETIME: string;
    RECEIVEDDATE: string;
    REPAIRCOMPLETE: string;
    OFFICE: string;
    TOTALLOSSPERCENTAGE: string;
    TYPE: string;
}

