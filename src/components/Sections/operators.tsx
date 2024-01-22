import {Button} from "react-bootstrap";

export function Operators(){

    return(
        <div className={"grid grid-cols-4"} >
            <Button   className="bg-blue-800 text-white mr-4 border-1 rounded-full py-2"> Delete All</Button>
            <Button   className="bg-blue-800 text-white mr-4 border-1 rounded-full py-2"> Add</Button>
            <Button   className="bg-blue-800 text-white mr-4 border-1 rounded-full py-2"> Group with AND </Button>
            <Button   className="bg-blue-800 text-white mr-4 border-1 rounded-full py-2"> Group with OR</Button>
        </div>
    )
}