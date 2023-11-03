import {useGetOrganizationsByIdQuery} from "@/redux/services/organizationApi";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {Organization} from "@/models/organization";
import Cookies from "js-cookie";
import {useState} from "react";
import TreeView from "@/components/treeview";
import {Card, List, ListItem, ListItemSuffix, ListItemPrefix, Chip, Checkbox, Collapse} from "@material-tailwind/react";

export function Organizations() {
    const owner = Cookies.get("credentials")?.split("|")[2] || "";
    const {data, error, isLoading, isFetching} = useGetOrganizationsByIdQuery(owner)
    const [selectedOrganization, setSelectedOrganization] = useState<Record<string, boolean>>({});
    const [open, setOpen] = useState(false);
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No organizations found for: {owner}</div>

    const handleOrgsCheckboxChange = (orgId: string, checked: boolean) => {
        setSelectedOrganization(prevState => ({
            ...prevState,
            [orgId]: checked
        }));
    }

    return (
        <Card className="w-96">
            {data ?
                <TreeView data={data as Organization[]} />
                : null}
        </Card>
    )
}