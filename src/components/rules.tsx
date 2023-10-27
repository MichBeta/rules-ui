import {useGetRulesByOwnerQuery} from "@/redux/services/ruleApi";
import Table from "@/components/table";
import {Spinner, Button , Typography } from "@material-tailwind/react";
import Cookies from "js-cookie";
import Image from "next/image";

export function Rules() {
    const {data, error, isLoading, isFetching} = useGetRulesByOwnerQuery(Cookies.get("credentials")?.split("|")[2] || "")
    // if is loading return spinner or something else to indicate loading state to the user
    if (isLoading) return (
        <div className={"flex flex-col space-y-4 items-center justify-center h-screen"}>
            <Spinner className="h-16 w-16 text-gray-900/50" />;
        </div>
    )
    if (error) return <div>No rules found</div>
    // return a table with the rules
    return (
        <div className={"flex flex-col space-y-4"}>
            {data
                ?
                <>
                    <div className={"flex flex-row-reverse items-center gap-4"}>
                        <Button color="blue" className="flex items-center gap-3">
                            <Typography color="white">Add Rule</Typography>
                        </Button >
                    </div>
                    <Table
                        data={data}
                        columns={[
                            {key: "name", name: "Rule Description"},
                            {key: "ruleCode", name: "Rule Code"},
                        ]}
                        title={"Rules"}
                        perPage={8}
                        actions={true}
                    />
                </>
                : null}
        </div>
    )
}