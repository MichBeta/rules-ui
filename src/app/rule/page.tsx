"use client"
import {TableRules} from "@/components/sections/tableRules";
import {Button} from "@material-tailwind/react";
import {useRouter} from "next/navigation";

function rule(){
    const router = useRouter();
    const handleExit =()=>{
        router.push('/settings')
    }

    return(
        <>
        <TableRules editEnable={false}></TableRules>
        <div className="grid grid-cols-3 gap-44">
            <Button color="blue">Save</Button>
            <span></span>
            <Button color="red" onClick={handleExit}>Cancel</Button>
        </div>
        </>
    )
}

export default rule;