import React, {useState} from 'react';
import Pagination from "@/components/pagination";
import {Card, CardBody, CardFooter, Tooltip, Typography} from "@material-tailwind/react";
import {AiOutlineEdit, AiOutlineDelete} from "react-icons/ai";
import {BiArchiveIn} from "react-icons/bi";

interface TableProps {
    data: any[];
    columns: any[];
    title: string;
    perPage: number;
    actions?: boolean;
}

const Table: React.FC<TableProps> = ({data, columns, title, perPage,actions}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState(data.slice(0, perPage));

    const totalPages = Math.ceil(data.length / perPage);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        const start = (page - 1) * perPage;
        const end = start + perPage;
        setCurrentData(data.slice(start, end));
    };

    return (
        <Card className="h-full w-full overflow-auto">
            <CardBody>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {columns.map((head) => (
                            <th
                                key={head.key}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head.name}
                                </Typography>
                            </th>
                        ))}
                        {actions ?
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                            >
                                Actions
                            </Typography>
                        </th>
                        : null}
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((row) => (
                        <tr key={row.id} className="even:bg-blue-gray-50/50">
                            {columns.map((col) => (
                                <td key={col.key} className="p-4">
                                    <Typography variant="small" color="blue-gray"
                                                className="font-normal">{row[col.key]}</Typography>
                                </td>
                            ))}
                            {actions ?
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <Tooltip
                                        placement="top"
                                        color="lightBlue"
                                        content="Edit"
                                        size="regular"
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }}
                                    >
                                    <button
                                        className="p-2 rounded-full bg-blue-gray-100 hover:bg-blue-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-gray-500"
                                        aria-label="Edit"
                                    >
                                        <AiOutlineEdit/>
                                    </button>
                                    </Tooltip>
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
                                        <AiOutlineDelete/>
                                    </button>
                                    </Tooltip>
                                    <Tooltip
                                        placement="top"
                                        color="lightBlue"
                                        content="Archive"
                                        size="regular"
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }}
                                    >
                                    <button
                                        className="p-2 rounded-full bg-blue-gray-100 hover:bg-blue-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-gray-500"
                                        aria-label="Archive"
                                    >
                                        <BiArchiveIn/>
                                    </button>
                                    </Tooltip>
                                </div>
                            </td>
                            : null}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
            </CardFooter>
        </Card>
    );
}

export default Table;