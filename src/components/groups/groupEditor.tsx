import {
    Button,
    Checkbox, Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Textarea,
    Typography
} from '@material-tailwind/react';
import TabsComponent from '@/components/tabs';
import Table from '@/components/table';
import {FlattenOrganization} from '@/models';
import { Rule, useGetRulesByOwnerQuery } from '@/redux/services/ruleApi';
import { useGetOrganizationTreeQuery } from '@/redux/services/organizationApi';
import { useState } from 'react';
import { useGetGroupByIdQuery } from '@/redux/services/groupApi';
import { useGroup } from '@/hooks/useGroup';

const GroupEditor = ({handleOpen,owner,open,idGroup}:{handleOpen:any,owner:string,open:boolean, idGroup:string}) => {
    const [selectedRules, setSelectedRules] = useState<Record<string, boolean>>({});
    const { data:rules } = useGetRulesByOwnerQuery(owner)
    const { data:organizationTree } = useGetOrganizationTreeQuery(owner);
    const {data:group} = useGetGroupByIdQuery(idGroup) ?? {data: { groupAssignments :[]} };
    const {isEnterprise,isPartner,setPartner,setEnterprise} = useGroup(group);
    return (
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
                                    data={rules as Rule[]}
                                    searchable={true}
                                    customColumns={[
                                        {key: "selected", name: "Selected", render: (row: Rule) => (
                                                <Checkbox
                                                    name={"assignedRuleIds"}
                                                    value={row.ruleCode}
                                                    checked={selectedRules[row.ruleCode] || false}
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
                        { id: 3, label: "Organizations", value:"Organization", content: <>
                                <Table data={organizationTree || []}
                                       customColumns={[
                                           {key: "organizationTree", name: "Name", render: (row: FlattenOrganization) => (
                                                   <span>{row.organizationTree.name}</span>
                                               )},
                                           {key: "Xpert Partner", name: "Xpert Partner", render: (row: FlattenOrganization) => (
                                                   <Checkbox
                                                       // checked={group && group.groupAssignments.includes({officeId: row.organizationTree.ldapId, assignmentType: 2})}
                                                       checked={isPartner(row.organizationTree) || false}
                                                       name={"groupAssignments"}
                                                       value={JSON.stringify({officeId: row.organizationTree.ldapId, assigmentType: 2})}
                                                       onChange={({target}) => setPartner(target.checked,row.organizationTree)}
                                                       crossOrigin={undefined}
                                                       className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                                   />
                                               )},
                                           {key: "Xpert Enterprise", name: "Xpert Enterprise", render: (row: FlattenOrganization) => (
                                                   <Checkbox
                                                       // checked={group && group.groupAssignments.includes({officeId: row.organizationTree.ldapId, assignmentType: 2})}
                                                       checked={isEnterprise(row.organizationTree) || false}
                                                       name={"groupAssignments"}
                                                       value={JSON.stringify({officeId: row.organizationTree.ldapId, assignmentType: 1})}
                                                       onChange={({target}) => setEnterprise(target.checked,row.organizationTree)}
                                                       crossOrigin={undefined}
                                                       className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                                   />
                                               )},
                                       ]}
                                       columns={[
                                           {key: "depth", name: "Type"},
                                       ]}
                                       title={"Offices"}
                                       perPage={5}
                                />
                            </> },
                        { id: 4, label: "Summary", value:"Precondition", content: <></> },
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
    );
}

export default GroupEditor;