import { Dialog, DialogHeader, Typography, DialogBody, DialogFooter, Button, Input } from "@material-tailwind/react";
import { useState } from "react"
import { FieldsByCategorie } from "./fieldsByCategorie";


export function RuleModalHook({selectedCategory=""}) {

    const [modalOpen, setModalOpen] = useState(false);

    const revOpen = () => {
        setModalOpen(!modalOpen)
    }

    const displaySelected=()=>{
        console.log("Data for field selected")
    }

    return (
        <>
        <Button color="blue" onClick={revOpen}>
        <Typography color="white" className="-ml-3">Show Fields</Typography>
        </Button>   
            <Dialog open={modalOpen} handler={revOpen} className="align-middle">
                <DialogHeader>
                    <Typography color="white"  className="-ml-3">Show Fields</Typography>
                    <h3>Choose Field</h3>
                </DialogHeader>
                <DialogBody className="align-center">
                    
                        <FieldsByCategorie fieldToMatch={selectedCategory}/>
                    
                </DialogBody>
                <DialogFooter className="grid grid-cols-2  gap-9">
                    <Button color="blue" type={"submit"} ripple={true} onClick={displaySelected}>
                        Save
                    </Button>
                    <Button color="red" ripple={true} onClick={revOpen}>
                        Cancel
                    </Button>
                </DialogFooter>

            </Dialog>
            </>
    );
}