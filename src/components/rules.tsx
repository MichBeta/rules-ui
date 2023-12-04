import {Rule, useGetRulesByOwnerQuery} from "@/redux/services/ruleApi";
import Table from "@/components/table";
import {
    Spinner,
    Button,
    Typography,
    DialogHeader,
    DialogBody,
    Input,
    Textarea,
    Checkbox, DialogFooter, Dialog
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import Image from "next/image";
import TabsComponent from "@/components/tabs";
import {useState} from "react";

export function Rules() {
    const owner = Cookies.get("credentials")?.split("|")[2] || "";
    const {data, error, isLoading, isFetching} = useGetRulesByOwnerQuery(Cookies.get("credentials")?.split("|")[2] || "")

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
    };
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
                        <Button color="blue" className="flex items-center gap-3" onClick={handleOpen}>
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
                        columnID={"ruleCode"}
                    />
                    <Dialog open={open} handler={handleOpen} size={"xl"}>
                        <DialogHeader>
                            <Typography color="blue-gray">Add Rule</Typography>
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
                                    { id: 2, label: "Groups", value:"groups", content: <>
                                        </> },
                                    { id: 3, label: "Summary", value:"summary", content: <></> },
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