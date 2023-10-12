import {useAppSelector} from "@/redux/hooks";
import {useGetPredicatesQuery} from "@/redux/services/predicateApi";
import Table from "@/components/table";

export function Predicate() {
    const {data, error, isLoading, isFetching} = useGetPredicatesQuery(null)
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No predicate found</div>
    return (
        <div className={"flex flex-col space-y-4"}>
            {data
                ? <Table
                    data={data}
                    columns={[
                        {key: "name", name: "Predicates Name"},
                        {key: "tag", name: "Predicates Tag"},
                    ]}
                    title={"Predicates"}
                    perPage={9}
                />
                : null}
        </div>
    )
}