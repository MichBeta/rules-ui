import Cookies from "js-cookie";
import Table from "@/components/table";

export function ComplianceWorklist(){
    const owner = Cookies.get("credentials")?.split("|")[2] || "";
    return (
        <div>
            Compliance Worklist
        </div>
    );
}