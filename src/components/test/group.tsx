import {useAppSelector} from "@/redux/hooks";
import {useGetGroupByIdQuery} from "@/redux/services/groupApi";

export function Group() {
    const groupCode = useAppSelector(state => state.groupCodeReducer.groupCode)
    const {data, error, isLoading, isFetching} = useGetGroupByIdQuery(groupCode)
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No group found</div>
    return (
        <>
            <div className={"flex flex-col space-y-4 bg-zinc-800 text-white p-4 m-2 rounded-md"}>
                <div className={"flex flex-row space-x-4"}>
                    <div className={"font-bold"}>Group Id:</div>
                    <div>{data?.entityId}</div>
                </div>
                <div className={"flex flex-row space-x-4"}>
                    <div className={"font-bold"}>Group Code:</div>
                    <div>{data?.name}</div>
                </div>
                <div className={"flex flex-row space-x-4"}>
                    <div className={"font-bold"}>Description:</div>
                    <div>{data?.owner}</div>
                </div>
                <div className={"flex flex-row space-x-4"}>
                    <div className={"font-bold"}>Violation Message:</div>
                    <div>{data?.description}</div>
                </div>
            </div>
        </>
    )
}