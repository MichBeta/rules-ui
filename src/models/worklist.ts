/*
ACCIDENTDATETIME:"2023-11-28T06:00:00.000+0000"
APPRAISER:"DENVER COMP APP1, "
ATTACHMENTS:0
BUSINESSSTATUS:20
CLAIMNUMBER:"CG-112823 01"
CLAIMRESOURCE:"Falcon Insurance"
DEDUCTIBLE:48
DOLLARVARIANCE:17607.91
DRIVABLE:"Yes"
GROSSTOTAL:3277.85
INSPECTIONLOCATION:null
INSURANCECOMPANY:"Falcon Insurance"
INSUREDPOLICYNUMBER:"INSPOL"
LASTUPDATEDDATETIME:"2023-12-01T20:25:16.989+0000"
OFFICE:"Denver"
OWNER:"ln, fn"
PERCENTAGEVARIANCE:537.18
RECEIVEDDATE:"2023-11-28T16:25:51.589+0000"
REPAIRCOMPLETE:null
SEVERITY:15220
SUPPLEMENTAMOUNT:777.85
TOTALLOSSPERCENTAGE:29
TYPE:1
VEHICLE:"2011 Mercedes-Benz ML350"
 */

export interface WorklistModel {
    ID: string;
    ACCIDENTDATETIME: string;
    APPRAISER: string;
    ATTACHMENTS: number;
    BUSINESSSTATUS: string;
    CLAIMNUMBER: string;
    CLAIMRESOURCE: string;
    DEDUCTIBLE: number;
    DOLLARVARIANCE: number;
    DRIVABLE: string;
    GROSSTOTAL: number;
    INSPECTIONLOCATION: null;
    INSURANCECOMPANY: string;
    INSUREDPOLICYNUMBER: string;
    LASTUPDATEDDATETIME: string;
    OFFICE: string;
    OWNER: string;
    PERCENTAGEVARIANCE: number;
    RECEIVEDDATE: string;
    REPAIRCOMPLETE: null;
    SEVERITY: number;
    SUPPLEMENTAMOUNT: number;
    TOTALLOSSPERCENTAGE: number;
    TYPE: number;
    VEHICLE: string;
}