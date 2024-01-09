let claimColumnNames: Map<string, string> = new Map ();
claimColumnNames.set("CLAIMNUMBER", "Claim Number");
claimColumnNames.set("GROSSTOTAL", "Gross Total");
claimColumnNames.set("ACCIDENTDATETIME", "Accident Date");
claimColumnNames.set("DOLLARVARIANCE", "Dollar Variance");
claimColumnNames.set("PERCENTAGEVARIANCE", "Percentage Variance");
claimColumnNames.set("SEVERITY", "Severity");
claimColumnNames.set("OWNER", "Owner");
claimColumnNames.set("VEHICLE", "Vehicle");
claimColumnNames.set("BUSINESSSTATUS", "Business Status");
claimColumnNames.set("SUPPLEMENTAMOUNT", "Supplement Amount");
claimColumnNames.set("APPRAISER", "Appraiser");
claimColumnNames.set("INSUREDPOLICYNUMBER", "Insured Policy #");
claimColumnNames.set("ATTACHMENTS", "Attachments");
claimColumnNames.set("CLAIMRESOURCE", "Claim Resource");
claimColumnNames.set("DEDUCTIBLE", "Deductible");
claimColumnNames.set("DRIVABLE", "Drivable");
claimColumnNames.set("INSPECTIONLOCATION", "Inspection Location");
claimColumnNames.set("INSURANCECOMPANY", "Insurance Company");
claimColumnNames.set("LASTUPDATEDDATETIME", "Last Updated Date");
claimColumnNames.set("RECEIVEDDATE", "Received Date");
claimColumnNames.set("REPAIRCOMPLETE", "Repair Complete");
claimColumnNames.set("OFFICE", "Office");
claimColumnNames.set("TOTALLOSSPERCENTAGE", "Total Loss Percentage");
claimColumnNames.set("TYPE", "Type");


export function claimColumnToClaimName(column: string) {
    if (column in claimColumnNames) {
        return claimColumnNames.get(column);
    }
    return column;
}

export function claimNameToClaimColumn(name: string):string | null {
    claimColumnNames.forEach((value, key) => {
        if (value === name) {
            return key;
        }
    });
    return name;
}

export function claimColumnToClaimNameMap(): Map<string, string> {
    return claimColumnNames;
}