import {useAppSelector} from "@/redux/hooks";
import {useGetRuleByRuleCodeQuery} from "@/redux/services/ruleApi";

export function Rule() {
    const ruleCode = useAppSelector(state => state.ruleCodeReducer.ruleCode)
    const {data, error, isLoading, isFetching} = useGetRuleByRuleCodeQuery(ruleCode)
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No rule found</div>
    return (
        <>
            <div className={"flex flex-col space-y-4 bg-zinc-800 text-white bg-gray-900 p-4 m-2 rounded-md"}>
                <div className={"flex flex-row space-x-4"}>
                    <div className={"font-bold"}>Entity Id:</div>
                    <div>{data?.entityId}</div>
                </div>
                <div className={"flex flex-row space-x-4"}>
                    <div className={"font-bold"}>Rule Code:</div>
                    <div>{data?.ruleCode}</div>
                </div>
                <div className={"flex flex-row space-x-4"}>
                    <div className={"font-bold"}>Rule Name:</div>
                    <div>{data?.name}</div>
                </div>
                <div className={"flex flex-row space-x-4"}>
                    <div className={"font-bold"}>Description:</div>
                    <div>{data?.description}</div>
                </div>
                <div className={"flex flex-row space-x-4"}>
                    <div className={"font-bold"}>Violation Message:</div>
                    <div>{data?.violationMessage}</div>
                </div>
            </div>
        </>
    )
}