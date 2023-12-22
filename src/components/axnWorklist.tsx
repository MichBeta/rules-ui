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
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    Drawer,
    Button,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import TabsComponent from "@/components/tabs";
import { HiChevronDown } from "react-icons/hi";
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

const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
};

export function AxnWorklist() {
    const owner = Cookies.get("credentials")?.split("|")[2] || "";
    const claimnumber = useAppSelector(state => state.tableRowReducer.id);
    const claim = useGetAxnReportTypesQuery(claimnumber)
    const {data, error, isLoading, isFetching} = useGetAxnClaimsQuery(owner)
    const [open, setOpen] = useState(false);
    const [accordionOpen, setAccordionOpen] = useState(0);
    const [claimData, setClaimData] = useState<ClaimDataItem[]>([]);

    const handleAccordionOpen = (value: number) => {
        console.log('Accordion Open Value:', value); // Log the value to ensure it's coming correctly

        // Check the current accordionOpen state to debug further
        console.log('Current accordionOpen State:', accordionOpen);

        if (accordionOpen === value) {
            console.log('Updating Accordion Open:', accordionOpen, value);
            setAccordionOpen(0);
        } else {
            console.log('Updating Accordion Open:', value);
            setAccordionOpen(value);
        }
    };
    useEffect(() => {
        if (claim.data) {
            let internalEstimateClaimContent: JSX.Element[] = [];
            let internalSupplementClaimContent: JSX.Element[] = [];
            let enterpriseEstimateClaimContent: JSX.Element[] = [];
            let enterpriseSupplementClaimContent: JSX.Element[] = [];
            let extraClaimContent: JSX.Element[] = [];
            claim.data.forEach((claim, index) => {
                if (claim.FILENAME === "xpertinternalreport.pdf") {
                    if(claim.TYPE === "Estimate") {
                        internalEstimateClaimContent.push(<a
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
                    } else if (claim.TYPE === "Supplement") {
                        internalSupplementClaimContent.push(<a
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
                    }
                } else if (claim.FILENAME === "compliancecheckreport.pdf") {
                    if(claim.TYPE === "Estimate") {
                        enterpriseEstimateClaimContent.push(<a
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
                    } else if (claim.TYPE === "Supplement") {
                        enterpriseSupplementClaimContent.push(<a
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
                    }
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
            setClaimData([
                {
                    id: 1,
                    label: "Internal",
                    value: "internal",
                    content: <>{ internalEstimateClaimContent.length > 0 ?
                    <Accordion open={accordionOpen === 1} animate={CUSTOM_ANIMATION} icon={
                        <HiChevronDown
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${accordionOpen === 1 ? "rotate-180" : ""}`}
                        />
                    } onClick={() => handleAccordionOpen(1)}>
                        <AccordionHeader>Estimate</AccordionHeader>
                        <AccordionBody>{internalEstimateClaimContent}</AccordionBody>
                    </Accordion>
                    : null }
                    { internalSupplementClaimContent.length > 0 ?
                    <Accordion open={accordionOpen === 2} animate={CUSTOM_ANIMATION} icon={
                        <HiChevronDown
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${accordionOpen === 2 ? "rotate-180" : ""}`}
                        />
                    } onClick={() => handleAccordionOpen(2)}>
                        <AccordionHeader>Supplement</AccordionHeader>
                        <AccordionBody>{internalSupplementClaimContent}</AccordionBody>
                    </Accordion>
                    : null }
                    </>,
                },
                {
                    id: 2,
                    label: "Enterprise",
                    value: "enterprise",
                    content: <>{ enterpriseEstimateClaimContent.length > 0 ?
                    <Accordion open={accordionOpen === 3} animate={CUSTOM_ANIMATION} icon={
                        <HiChevronDown
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${accordionOpen === 2 ? "rotate-180" : ""}`}
                        />
                    } onClick={() => handleAccordionOpen(3)}>
                        <AccordionHeader>Estimate</AccordionHeader>
                        <AccordionBody>{enterpriseEstimateClaimContent}</AccordionBody>
                    </Accordion>
                    : null }
                    { enterpriseSupplementClaimContent.length > 0 ?
                    <Accordion open={accordionOpen === 4} animate={CUSTOM_ANIMATION} icon={
                        <HiChevronDown
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${accordionOpen === 2 ? "rotate-180" : ""}`}
                        />
                    } onClick={() => handleAccordionOpen(4)}>
                        <AccordionHeader>Supplement</AccordionHeader>
                        <AccordionBody>{enterpriseSupplementClaimContent}</AccordionBody>
                    </Accordion>
                    : null }
                    </>,
                },
                {
                    id: 3,
                    label: "Extra",
                    value: "extra",
                    content: <div className="flex flex-col gap-6">{extraClaimContent}</div>
                },
            ]);
        }
    }, [claim.data, accordionOpen]);
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