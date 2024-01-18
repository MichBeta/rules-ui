import { FlattenOrganization, Group, GroupAssignment, OrganizationTree } from '@/models';
import { AssignmentType } from '@/models';
import { useForm } from '@/hooks/';

const initialGroup:Group = {
    name: '',
    description: '',
    createdOn: new Date(),
    assignedRuleIds: [],
    groupAssignments: [],
    owner: ''
}
export const useGroup = (group:Group= initialGroup) => {
    const {groupAssignments,assignedRuleIds, removeElementListByIndex, addElementList,removeElementList} = useForm(group);
    const isEnterprise =(flatOrg:OrganizationTree): boolean =>{
        return !!(getAssignmentType(flatOrg,AssignmentType.Enterprise) & AssignmentType.Enterprise);
    }
    const setEnterprise =(newValue: boolean,flatOrg:OrganizationTree) =>{
        if (newValue) {
            // removeAssignmentType(flatOrg, AssignmentType.XpertInternal);
            addAssignmentType(flatOrg, AssignmentType.Enterprise);
        } else {
            removeAssignmentType(flatOrg, AssignmentType.Enterprise);
        }
    }
    const isPartner =(flatOrg:OrganizationTree): boolean =>{
        return !!(getAssignmentType(flatOrg,AssignmentType.XpertPartner) & AssignmentType.XpertPartner);
    }

    const setPartner =(newValue: boolean,flatOrg:OrganizationTree) =>{
        if (newValue) {
            // removeAssignmentType(flatOrg, AssignmentType.XpertInternal);
            addAssignmentType(flatOrg, AssignmentType.XpertPartner);
        } else {
            removeAssignmentType(flatOrg, AssignmentType.XpertPartner);
        }
    }
   /* const isInternal= (flatOrg:OrganizationTree): boolean =>{
        return !!(getAssignmentType(flatOrg) & AssignmentType.XpertInternal);
    }

    const setInternal =(newValue: boolean,flatOrg:OrganizationTree) => {
        if (newValue) {
            removeAssignmentType(flatOrg, AssignmentType.Enterprise | AssignmentType.XpertPartner);
            addAssignmentType(flatOrg, AssignmentType.XpertInternal);
        } else {
            removeAssignmentType(flatOrg, AssignmentType.XpertInternal);
        }
    }*/

    const addAssignmentType =(organization: OrganizationTree, assignmentType: AssignmentType): void => {
        if(organization.childOrganizations && organization.childOrganizations.length > 0){
            for (let org of organization.childOrganizations) {
                addAssignmentType(org, assignmentType);
            }
        } else {
            let assignmentIndex = groupAssignments.findIndex(ga => ga.officeId == organization.orgId && ga.assignmentType == assignmentType);
            let assignmentT = 0;
            if (assignmentIndex== -1) {
                assignmentT = assignmentType;
                addElementList({name:"groupAssignments",value:{ officeId:organization.orgId, assignmentType:assignmentT }});
            }

        }
    }
    const removeAssignmentType = (organization: OrganizationTree, assignmentType: AssignmentType)=> {

        if(organization.childOrganizations && organization.childOrganizations.length > 0){
            for (let org of organization.childOrganizations) {
                removeAssignmentType(org, assignmentType);
            }
        }else {
            let index = groupAssignments.findIndex(ga => ga.officeId == organization.orgId && ga.assignmentType == assignmentType);
            if (index != -1) {
                    removeElementListByIndex({name:"groupAssignments"},index);
                let assignment = groupAssignments[index].assignmentType;
                if (assignment.assignmentType != 0) {
                    assignment &= ~assignmentType;
                    // addElementList({name:"groupAssignments",value:{ officeId:organization.orgId, assignmentType:assignment }});
                }
            }
        }
    }

    const getAssignmentType = (organization: OrganizationTree, assignmentType:AssignmentType): AssignmentType =>{
        if (organization.childOrganizations && organization.childOrganizations.length > 0) {
            return organization.childOrganizations.map(o => getAssignmentType(o,assignmentType)).reduce((a, b) => a & b, AssignmentType.All);
        }
            let assignment = groupAssignments.find(ga => ga.officeId == organization.orgId && ga.assignmentType == assignmentType);
            return assignment ? assignment.assignmentType : 0;

    }

    const toggleRule = (entityId:string) => {
        let index = assignedRuleIds.findIndex(id => id == entityId);
        if (index == -1) {
            addElementList({name:"assignedRuleIds",value:entityId});
        } else {
            removeElementList({name:"assignedRuleIds",value:entityId});
        }
    }

    const isRuleAssigned = (entityId:string) => {
        return assignedRuleIds.findIndex(id => id == entityId) != -1;
    }

    return {isEnterprise,setEnterprise,isPartner,setPartner,toggleRule,isRuleAssigned,...group}
}