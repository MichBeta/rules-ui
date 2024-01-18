import {useGetGroupsByOrganizationIdQuery} from "@/redux/services/groupApi";
import {useGetRulesByOwnerQuery} from "@/redux/services/ruleApi";
import Table from "@/components/table";
import {
    Button,
    Typography,
} from "@material-tailwind/react";
import {useState} from "react";

import Cookies from "js-cookie";
import GroupEditor from '@/components/groups/groupEditor';

export function Groups() {
    const owner = Cookies.get("credentials")?.split("|")[2] || "";
    const {data, error, isLoading, isFetching} = useGetGroupsByOrganizationIdQuery(owner)
    const [open, setOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<string>(null);

    const handleOpen = () => {
        setOpen(!open)
    };
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No groups found</div>
    return (
        <div className={"flex flex-col space-y-4"}>
            { data
                ?
                <>
                    <div className={"flex flex-row-reverse items-center gap-4"}>
                        <Button color="blue" className="flex items-center gap-3" onClick={handleOpen}>
                            <Typography color="white">Add Group</Typography>
                        </Button >
                    </div>
                    <Table
                        data={data}
                        columns={[
                            {key: "name", name: "Name"},
                            {key: "description", name: "Description"},
                        ]}
                        title={"Groups"}
                        perPage={8}
                        actions={true}
                        columnID={"name"}
                    />
                    <GroupEditor handleOpen={handleOpen} owner={owner} open={open} idGroup={selectedGroup}/>
                </>
                : null}
        </div>
    )
}