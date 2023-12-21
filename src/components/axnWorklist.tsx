import Cookies from "js-cookie";
import {useGetAxnClaimsQuery} from "@/redux/services/axnClaimsApi";
import Table from "@/components/table";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {useGetAxnReportTypesQuery} from "@/redux/services/axnReportTypesApi";
import React, {useState, useEffect} from "react";
import {
    Checkbox, Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Textarea,
} from "@material-tailwind/react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import TabsComponent from "@/components/tabs";
import {Rule} from "@/redux/services/ruleApi";
import {useGetAxnReportVersionsQuery} from "@/redux/services/axnReportVersionsApi";
import {Predicate} from "@/components/test/predicate";
import {ClaimFields} from "@/components/test/claimField";
import {Enumerations} from "@/components/test/enumeration";
import {Validator} from "@/components/test/validator";
import {Parts} from "@/components/test/part";
import {AxnClaimViewer} from "@/components/test/axnClaimViewer";

interface ClaimDataItem {
    id: number;
    label: string;
    value: string;
    content: JSX.Element;
}

export function AxnWorklist() {
    const owner = Cookies.get("credentials")?.split("|")[2] || "";
    const claimnumber = useAppSelector(state => state.tableRowReducer.id);
    const claim = useGetAxnReportTypesQuery(claimnumber)
    const {data, error, isLoading, isFetching} = useGetAxnClaimsQuery(owner)
    const [open, setOpen] = useState(false);
    const [claimData, setClaimData] = useState<ClaimDataItem[]>([]);

    useEffect(() => {
        if (claim.data) {
            let internalClaimContent: JSX.Element[] = [];
            let enterpriseClaimContent: JSX.Element[] = [];
            let extraClaimContent: JSX.Element[] = [];
            claim.data.forEach((claim, index) => {
                if (claim.FILENAME === "xpertinternalreport.pdf") {
                    internalClaimContent.push(<a
                        key={index}
                        href={`http://localhost:8080/api/getReportBySftp?caseId=${claim.CASEID}&id=${claim.ID}`}
                        target="_blank"
                        className="transition ease-in-out bg-white hover:-translate-y-1 hover:bg-[rgb(50,37,94)] hover:text-white duration-300"
                    >
                        <Typography>
                            <span className={"font-bold"}>Estimate Type:</span> {claim.TYPE}
                        </Typography>
                        <Typography>
                            <span className={"font-bold"}>Estimate Version:</span> {claim.VERSION}
                        </Typography>
                    </a>);
                } else if (claim.FILENAME === "compliancecheckreport.pdf") {
                    enterpriseClaimContent.push(<a
                        key={index}
                        href={`http://localhost:8080/api/getReportBySftp?caseId=${claim.CASEID}&id=${claim.ID}`}
                        target="_blank"
                        className="transition ease-in-out bg-white hover:-translate-y-1 hover:scale-110 hover:bg-[rgb(50,37,94)] hover:text-white duration-300"
                    >
                        <Typography>
                            <span className={"font-bold"}>Estimate Type:</span> {claim.TYPE}
                        </Typography>
                        <Typography>
                            <span className={"font-bold"}>Estimate Version:</span> {claim.VERSION}
                        </Typography>
                    </a>);
                } else {
                    extraClaimContent.push(<a
                        key={index}
                        href={`http://localhost:8080/api/getReportBySftp?caseId=${claim.CASEID}&id=${claim.ID}`}
                        target="_blank"
                        className="transition ease-in-out bg-white hover:-translate-y-1 hover:scale-110 hover:bg-[rgb(50,37,94)] hover:text-white duration-300"
                    >
                        <Typography>
                            <span className={"font-bold"}>Estimate Filename:</span> {claim.FILENAME}
                        </Typography>
                        <Typography>
                            <span className={"font-bold"}>Version:</span> {claim.VERSION}
                        </Typography>
                    </a>);
                }
            });
            console.log(internalClaimContent);
            setClaimData([
                {
                    id: 1,
                    label: "Internal Claim",
                    value: "internalClaim",
                    content: <div className="flex flex-col gap-6">{internalClaimContent}</div>
                },
                {
                    id: 2,
                    label: "Enterprise Claim",
                    value: "enterpriseClaim",
                    content: <div className="flex flex-col gap-6">{enterpriseClaimContent}</div>
                },
                {
                    id: 3,
                    label: "Extra Claim",
                    value: "extraClaim",
                    content: <div className="flex flex-col gap-6">{extraClaimContent}</div>
                },
            ]);
        }
    }, [claim.data]);
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No claims found</div>
    const handleOpen = () => {
        setOpen(!open)
    };
    return (
        <div className={"flex flex-col space-y-4"}>
            {data
                ?
                <>
                    <Table
                        data={data}
                        columns={[
                            {key: "CLAIMNUMBER", name: "Claim Number"},
                            {key: "GROSSTOTAL", name: "Gross Total"},
                            {key: "ACCIDENTDATETIME", name: "Accident Date"},
                            {key: "DOLLARVARIANCE", name: "Dollar Variance"},
                            {key: "PERCENTAGEVARIANCE", name: "Percentage Variance"},
                            {key: "SEVERITY", name: "Severity"},
                            {key: "OWNER", name: "Owner"},
                            {key: "VEHICLE", name: "Vehicle"},
                            {key: "BUSINESSSTATUS", name: "Business Status"},
                            {key: "SUPPLEMENTAMOUNT", name: "Supplement Amount"},
                            {key: "APPRAISER", name: "Appraiser"},
                            {key: "INSUREDPOLICYNUMBER", name: "Insured Policy #"},
                            {key: "ATTACHMENTS", name: "Attachments"},
                            {key: "CLAIMRESOURCE", name: "Claim Resource"},
                            {key: "DEDUCTIBLE", name: "Deductible"},
                            {key: "DRIVABLE", name: "Drivable"},
                            {key: "INSPECTIONLOCATION", name: "Inspection Location"},
                            {key: "INSURANCECOMPANY", name: "Insurance Company"},
                            {key: "LASTUPDATEDDATETIME", name: "Last Updated Date"},
                            {key: "RECEIVEDDATE", name: "Received Date"},
                            {key: "REPAIRCOMPLETE", name: "Repair Complete"},
                            {key: "OFFICE", name: "Office"},
                            {key: "TOTALLOSSPERCENTAGE", name: "Total Loss Percentage"},
                            {key: "TYPE", name: "Type"},
                        ]}
                        title={"Claims"}
                        perPage={5}
                        columnID={"CLAIMNUMBER"}
                        searchable={true}
                        customColumns={[
                            {
                                key: "Actions", name: "Actions", render: (row: any) => (
                                    <Button color="blue" onClick={() => setOpen(!open)}>
                                        <Typography color="white">PDFs</Typography>
                                    </Button>
                                )
                            },
                        ]}
                    />
                </>
                : null
            }

            <Dialog open={open} handler={handleOpen} size={"xl"}>
                <DialogHeader>
                    <Typography color="blue-gray">{claimnumber}</Typography>
                </DialogHeader>
                <DialogBody>
                    <div className="mb-4 flex flex-col gap-6">
                        <TabsComponent data={claimData}/>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button color="red" ripple={true} onClick={handleOpen}>
                        Close
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}