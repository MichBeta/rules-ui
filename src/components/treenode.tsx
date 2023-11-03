import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {Organization} from "@/models/organization";
import {setChildNodes} from "@/redux/features/treeSlice";
import {Card, List, ListItem, ListItemSuffix, ListItemPrefix, Chip, Checkbox, Collapse} from "@material-tailwind/react";
import {FcExpand} from "react-icons/fc";

interface TreeNodeProps {
    node: Organization;
}

const TreeNode: React.FC<TreeNodeProps> = ({node}) => {
    const dispatch = useAppDispatch();
    const childNodes = useAppSelector((state) => state.treeReducer.nodes);
    const [expanded, setExpanded] = useState(false);
    const [checked, setChecked] = useState([]);
    const hasChildren = node.childOrganizations && node.childOrganizations.length > 0;

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nodeid = e.target.value;
        const isChecked = e.target.checked;

        // Function to recursively check/uncheck child nodes
        const updateChildNodes = (parentId: string, isChecked: boolean) => {
            const updatedChecked = checked.map(([id, checked]) => (id.startsWith(parentId) ? [id, isChecked] : [id, checked]));
            setChecked(updatedChecked);

            // Recursively update children
            const children = childNodes.filter(child => child.id.startsWith(parentId));
            children.forEach(child => {
                updateChildNodes(child.id, isChecked);
            });
        };

        // Update checked state for the current node
        setChecked(prevState => {
            const newState = [...prevState];
            const index = newState.findIndex((item) => item[0] === nodeid);
            if (index === -1) {
                newState.push([nodeid, isChecked]);
            } else {
                newState[index][1] = isChecked;
            }

            // If the node has children, recursively update them
            const node = childNodes.find(child => child.id === nodeid);
            if (node && node.childOrganizations && node.childOrganizations.length > 0) {
                updateChildNodes(nodeid, isChecked);
            }

            return newState;
        });
    };



    return (
        <Card className="w-96">
            <List>
                <ListItem>
                    <ListItemPrefix>
                        <Checkbox
                            checked={node.isChecked}
                            value={node.id}
                            onChange={(e) => handleCheckboxChange(e)}
                            crossOrigin={undefined}
                            className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                        />
                    </ListItemPrefix>
                    {hasChildren && (expanded ? (
                        <FcExpand size={20} onClick={() => setExpanded(!expanded)}/>
                    ) : (
                        <FcExpand size={20} style={{ transform: 'rotate(-90deg)' }} onClick={() => setExpanded(!expanded)}/>
                    ))}
                    {node.name}

                    {hasChildren && (
                        <ListItemSuffix>
                            <Chip
                                value={node.childOrganizations?.length}
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                            />
                        </ListItemSuffix>
                    )}
                </ListItem>
                {expanded && hasChildren && (
                    <Collapse open={expanded}>
                        {node.childOrganizations?.map((child) => (
                            <TreeNode key={child.id} node={child} />
                        ))}
                    </Collapse>
                )}
            </List>
        </Card>
);
};

export default TreeNode;
