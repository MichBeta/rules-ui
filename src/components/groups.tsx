import {useGetGroupsQuery} from "@/redux/services/groupApi";
import Table from "@/components/table";

export function Groups() {
    const {data, error, isLoading, isFetching} = useGetGroupsQuery(null)
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No groups found</div>
    return (
        <div className={"flex flex-col space-y-4"}>
            { data
                ? <Table
                    data={data}
                    columns={[
                        {key: "name", name: "Name"},
                        {key: "description", name: "Description"},
                    ]}
                    title={"Groups"}
                    perPage={9}
                    actions={true}
                />
                : null}
        </div>
    )
}