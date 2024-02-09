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
        <button color="blue" onClick={revOpen}>
        <div color="white" className="-ml-3">Show Fields</div>
        </button>
            {/*<Dialog open={modalOpen} handler={revOpen} className="align-middle">
                <DialogHeader>
                    <div color="white"  className="-ml-3">Show Fields</div>
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

            </Dialog>*/}
            </>
    );
}