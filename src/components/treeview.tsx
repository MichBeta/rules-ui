import React from 'react';
import TreeNode from '@/components/treenode';
import {Organization} from "@/models/organization";

interface TreeViewProps {
    data: Organization;
}

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
    return (
        <div>
            <TreeNode node={data} />
        </div>
    );
};

export default TreeView;
