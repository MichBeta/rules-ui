import { Rule, useGetRuleByIdQuery, useGetRuleByRuleCodeQuery } from '@/redux/services/ruleApi';
import { DialogBody, DialogHeader, Textarea, Typography, Dialog, DialogFooter, Button } from "@material-tailwind/react"
import { useState } from "react";


interface HandlerRule {
    rulecode : any;
    modalOpt: boolean;
}


export function EditComponent({ rulecode, modalOpt }: HandlerRule) {

    const rulesByCode = useGetRuleByRuleCodeQuery(rulecode);
    const [closeDialog, setCloseDialog] = useState(false);
    const handleEditOpen = () => {
        setCloseDialog(!closeDialog)
        modalOpt = false;
    }
    const dataR:(Rule | undefined) = rulesByCode.data;
    console.log(typeof rulesByCode.data);
    console.log(rulesByCode.data?.name)

    if (dataR !== null) {
        return (
            <Dialog open={modalOpt} size="xl" handler={handleEditOpen}>
                <DialogHeader>
                    <Typography color="blue-gray">Edit</Typography>
                </DialogHeader>
                <DialogBody>
                    <Textarea value={dataR?.name} readOnly></Textarea>
                    <Textarea value={dataR?.code} readOnly></Textarea>
                    <Textarea value={dataR?.description} readOnly></Textarea>
                    <Textarea value={dataR?.violationMessage} readOnly></Textarea>
                </DialogBody>

                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleEditOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleEditOpen}>
                        <span>Save</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        )
        
    }
    else { return (<p>No rule Code Provide</p>) }
}

export default EditComponent;