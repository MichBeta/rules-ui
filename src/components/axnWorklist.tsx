import Cookies from "js-cookie";
import {useGetAxnClaimsQuery} from "@/redux/services/axnClaimsApi";
import Table from "@/components/table";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {useGetAxnReportTypesQuery} from "@/redux/services/axnReportTypesApi";
import {useState, useEffect} from "react";
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

interface ClaimDataItem {
    id: number;
    label: string;
    value: string;
    content: JSX.Element;
}

export function AxnWorklist() {
    const owner = Cookies.get("credentials")?.split("|")[2] || "";
    const tableRowId = useAppSelector(state => state.tableRowReducer.id);
    const claim = useGetAxnReportTypesQuery(tableRowId)
    const {data, error, isLoading, isFetching} = useGetAxnClaimsQuery(owner)
    const [workItemPK, setWorkItemPK] = useState(0);
    const versions = useGetAxnReportVersionsQuery(workItemPK)
    const [open, setOpen] = useState(false);
    const [claimData, setClaimData] = useState<ClaimDataItem[]>([]);

    useEffect(() => {
        if (claim.data && versions.data) {
            const updatedClaimData = claim.data.map((item) => {
                const jsxContent = (
                    <>
                        {versions.data?.map((_, index) => (
                            <a
                                key={index}
                                href={`https://clms.tkg-rms-dev.usdc01.solera.farm/download-report?workItemPk=${item.WORK_ITEM_PK}&reportVersion=${index}`}
                                target="_blank"
                                className="transition ease-in-out bg-white hover:-translate-y-1 hover:scale-110 hover:bg-[rgb(50,37,94)] hover:text-white duration-300"
                            >
                                {/* Your JSX structure */}
                            </a>
                        ))}
                    </>
                );

                return {
                    id: item.WORK_ITEM_PK,
                    label:
                        item.ITEM_TYPE === "I"
                            ? "Internal"
                            : item.ITEM_TYPE === "Q"
                                ? "Enterprise"
                                : "Partner",
                    value: item.WORK_ITEM_PK.toString(),
                    content: jsxContent,
                };
            });
            setClaimData(updatedClaimData);
        }
    }, [claim.data, versions.data]);
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
                                key: "openModal", name: "OpenModal", render: (row: any) => (
                                    <Button color="blue" onClick={() => setOpen(!open)}>
                                        <Typography color="white">Open</Typography>
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
                    <Typography color="blue-gray">{tableRowId}</Typography>
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