import Cookies from "js-cookie";
import {useGetAxnClaimsQuery} from "@/redux/services/axnClaimsApi";
import Table from "@/components/table";

export function AxnWorklist() {
    const owner = Cookies.get("credentials")?.split("|")[2] || "";
    const {data, error, isLoading, isFetching} = useGetAxnClaimsQuery(owner)
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No claims found</div>
    return (
        <div className={"flex flex-col space-y-4"}>
            { data
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
                        perPage={8}
                        columnID={"ID"}
                    />
                </>
                : null
            }
        </div>
    );
}