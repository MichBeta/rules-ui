import {Button} from "@material-tailwind/react";
import React, {useState} from "react";



export const ConditionComponent = () => {

    const [addCondition, setAddCondition]= useState(false);
    const [logicOPt, setLogicOpt] = useState("none");
    const handleAdd = (setterAdd: boolean) =>{

    }

    const assignCondition = (event: any): void =>{
        setLogicOpt(event.target.value);
    }

    return (
        <>
            <div className=" ">
                <select className="px-3 m-4 py-2 rounded-md border-1" onChange={assignCondition}>
                    <option value={"AND"}>AND</option>
                    <option value={"OR"}>OR</option>
                </select>

                <Button className="px-4 py-2 rounded-md" color={"light-blue"} onClick={() => handleAdd(true)}>
                    +
                </Button>
            </div>
            { addCondition


            }
        </>
    )
}