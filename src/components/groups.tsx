import {useGetGroupsByOrganizationIdQuery} from "@/redux/services/groupApi";
import {useGetRulesByOwnerQuery} from "@/redux/services/ruleApi";
import {useGetOrganizationsByIdQuery} from "@/redux/services/organizationApi";
import Table from "@/components/table";
import {
    Button,
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Checkbox,
    Textarea
} from "@material-tailwind/react";
import TabsComponent from "@/components/tabs";
import {useState} from "react";
import {Rule} from "@/redux/services/ruleApi";
import {Organization} from "@/redux/services/organizationApi";
import Cookies from "js-cookie";

export function Groups() {
    const owner = Cookies.get("credentials")?.split("|")[2] || "";
    const {data, error, isLoading, isFetching} = useGetGroupsByOrganizationIdQuery(owner)
    const rules = useGetRulesByOwnerQuery(owner)
    const organizations = useGetOrganizationsByIdQuery(owner)
    const [open, setOpen] = useState(false);
    const [selectedRules, setSelectedRules] = useState<Record<string, boolean>>({});
    const [selectedOrganization, setSelectedOrganization] = useState<Record<string, boolean>>({});

    const handleRulesCheckboxChange = (ruleId: string, checked: boolean) => {
        setSelectedRules(prevState => ({
            ...prevState,
            [ruleId]: checked
        }));
    }

    const handleOrgsCheckboxChange = (orgId: string, checked: boolean) => {
        setSelectedOrganization(prevState => ({
            ...prevState,
            [orgId]: checked
        }));
    }
    const handleOpen = () => {
        setSelectedRules({})
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
                    />
                    <Dialog open={open} handler={handleOpen} size={"xl"}>
                        <DialogHeader>
                            <Typography color="blue-gray">Add Group</Typography>
                        </DialogHeader>
                        <DialogBody>
                            <div className="mb-4 flex flex-col gap-6">
                                <TabsComponent data={[
                                    { id: 1, label: "Description", value:"description", content: <>
                                            <Input size="lg" label="Code" crossOrigin={undefined} type="text" required={true}/>
                                            <Textarea
                                                size={"lg"}
                                                label={"Description"}
                                                required={true}
                                            />
                                        </> },
                                    { id: 2, label: "Rules", value:"configuration", content: <>
                                            <Table
                                                data={rules.data as Rule[]}
                                                searchable={true}
                                                customColumns={[
                                                    {key: "selected", name: "Selected", render: (row: Rule) => (
                                                            <Checkbox
                                                                checked={selectedRules[row.ruleCode] || false}
                                                                onChange={(e) => handleRulesCheckboxChange(row.ruleCode, e.target.checked)}
                                                                crossOrigin={undefined}
                                                                className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                                            />
                                                        )},
                                                ]}
                                                columns={[
                                                    {key: "ruleCode", name: "Rule Code"},
                                                    {key: "name", name: "Rule Description"},
                                                ]}
                                                title={"Rules"}
                                                perPage={5}
                                            />
                                        </> },
                                    { id: 3, label: "Organizations", value:"organizations", content:
                                            <>
                                            <Table
                                                data={organizations.data as Organization[]}
                                                searchable={true}
                                                customColumns={[
                                                    {key: "selected", name: "Selected", render: (row: Organization) => (
                                                            <Checkbox
                                                                checked={selectedOrganization[row.id] || false}
                                                                onChange={(e) => handleRulesCheckboxChange(row.id, e.target.checked)}
                                                                crossOrigin={undefined}
                                                                className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                                            />
                                                        )},
                                                ]}
                                                columns={[
                                                    {key: "name", name: "Organization Name"},
                                                    {key: "name", name: "Rule Description"},
                                                ]}
                                                title={"Organizations"}
                                                perPage={5}
                                            />
                                        </>
                                    },
                                ]}/>
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button color="blue" type={"submit"} ripple={true}>
                                Save
                            </Button>
                            <Button color="red" ripple={true} onClick={handleOpen}>
                                Cancel
                            </Button>
                        </DialogFooter>
                    </Dialog>
                </>
                : null}
        </div>
    )
}