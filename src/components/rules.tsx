import {useGetRulesQuery} from "@/redux/services/ruleApi";
import Table from "@/components/table";
import {Spinner} from "@material-tailwind/react";

export function Rules() {
    const {data, error, isLoading, isFetching} = useGetRulesQuery(null)
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
                ? <Table
                    data={data}
                    columns={[
                        {key: "name", name: "Rule Description"},
                        {key: "ruleCode", name: "Rule Code"},
                    ]}
                    title={"Rules"}
                    perPage={9}
                />
                : null}
        </div>
    )
}