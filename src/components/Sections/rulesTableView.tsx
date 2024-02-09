
import {
    Card,
    CardBody,
    Typography,
    CardFooter,
    Dialog,
    DialogHeader,
    DialogBody, DialogFooter, Button, Tooltip
} from "@material-tailwind/react";
import Pagination from "../pagination";
import { useState,  useEffect} from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";
import EditComponent from "./editRule";
import { Rule } from "@/redux/services/ruleApi";
import { TableRules } from "./tableRules";

interface RuleData {
    data: Rule[];
    perPage: number;
}

export const RulesTableView: React.FC<RuleData> = ({ data, perPage } ) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentDataRule, setCurrentDataRule] = useState(data.slice(0, perPage));
    const totalPages = Math.ceil(data.length / perPage);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        const start = (page - 1) * perPage;
        const end = start + perPage;
        setCurrentDataRule(data.slice(start, end));
    };
    
    const [getValRule, setGetValRule]= useState("")
    const [dialOpenEdit, setDialOpenEdit] = useState(false);

    const handleEditOpen = (ruleCode: string) => {
        setDialOpenEdit(true);
        setGetValRule(ruleCode);
    }


    const i = [Math.random(), Math.random(), Math.random()]
    const rowName = ["Rule Name", "Code", "Actions"]

    if (data) {
        console.log(data)
        return (
            <div className={"flex flex-col space-y-4 content-start"}>
            <Card className="h-full w-full">
                <CardBody className="overflow-auto">
                    <table className="h-full w-full" key={currentPage}>
                        <thead>
                            <tr className="content-start">
                                {i.map((ind, index) => (
                                    <th key={ind}
                                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-3 content-start "
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70 text-left"
                                        >
                                            {rowName[index]}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentDataRule.map((row, index) => (
                                <tr key={row.code} 
                                className="even:bg-blue-gray-50/50"
                                >    
                                    <td key={row.entityId} className=" content-start text-left">
                                        <Typography variant="small" color="blue-gray"  className="font-normal leading-none opacity-100 text-rigth">
                                                {row.name}
                                            </Typography>
                                    </td>
                                    <td key={row.entityId +1} className=" content-start text-left">
                                        <Typography variant="small" color="blue-gray"  className="font-normal leading-none opacity-100 text-rigth"
                                            >
                                                {row.ruleCode}
                                            </Typography>
                                    </td>
                                    <td key={index} className={"p-1 text-left"}>
                                    <Tooltip
                                                placement="top"
                                                color="lightBlue"
                                                content="Edit"
                                                size="regular"
                                                transition-opacity
                                                duration-500
                                                animate={{
                                                    mount: { scale: 1, y: 0 },
                                                    unmount: { scale: 0, y: 25 },
                                                }}
                                            >
                                                <button
                                                    className="p-1 rounded-full bg-blue-gray-100 hover:bg-blue-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-gray-500"
                                                    aria-label="Edit"
                                                    onClick={() =>handleEditOpen(row.ruleCode)}
                                                >
                                                    <AiOutlineEdit />
                                                </button>
                                    </Tooltip>
                                                <Dialog open={dialOpenEdit} handler={() =>handleEditOpen} size={"md"} className="opacity-70">
                                                    <DialogHeader>
                                                    <Typography color="blue-gray" > Edit Rule </Typography>
                                                    </DialogHeader>
                                                    <DialogBody>
                                                         <div className="flex flex-col gap-6">
                                                         <TableRules editEnable={true} rulecode={getValRule}/>
                                                        </div>
                                                    </DialogBody>
                                                    <DialogFooter className="grid grid-cols-2 grid-gap-x-9">
                                                      <Button color="blue" type={"submit"} ripple={true}>
                                                          Save
                                                      </Button>
                                                       <Button color="red" ripple={true} onClick={() =>setDialOpenEdit(false)}>
                                                          Cancel
                                                      </Button>
                                                    </DialogFooter>
                                                </Dialog>

                                            <span> </span>
                                            <Tooltip
                                                placement="top"
                                                color="lightBlue"
                                                content="Delete"
                                                size="regular"
                                                animate={{
                                                    mount: { scale: 1, y: 0 },
                                                    unmount: { scale: 0, y: 25 },
                                                }}
                                            >
                                                <button
                                                    className="p-2 rounded-full bg-blue-gray-100 hover:bg-blue-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-gray-500"
                                                    aria-label="Delete"
                                                >
                                                    <AiOutlineDelete />
                                                </button>
                                            </Tooltip>
                                            <span> </span>
                                            <Tooltip
                                                placement="top"
                                                color="lightBlue"
                                                content="Archive"
                                                size="regular"
                                                className="mr-25"
                                                animate={{
                                                    mount: { scale: 1, y: 0 },
                                                    unmount: { scale: 0, y: 25 },
                                                }}
                                            >
                                                <button
                                                    className="p-2 rounded-full bg-blue-gray-100 hover:bg-blue-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-gray-500 mr-25"
                                                    aria-label="Archive"
                                                >
                                                    <BiArchiveIn />
                                                </button>
                                            </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                </CardFooter>
            </Card>
            </div>
        )
    } else {
        return (<p>Data is empty</p>)
    }
}