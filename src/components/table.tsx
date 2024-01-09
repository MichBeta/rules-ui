import React, {useEffect, useState} from 'react';
import Pagination from "@/components/pagination";
import {Card, CardBody, CardHeader, CardFooter, Tooltip, Typography, Input} from "@material-tailwind/react";
import {AiOutlineEdit, AiOutlineDelete} from "react-icons/ai";
import {BiArchiveIn} from "react-icons/bi";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {setId} from "@/redux/features/tableRowIdSlice";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {ClaimRow} from "@/models/claimField";

interface TableProps {
    data: any[];
    searchable?: boolean;
    columns: any[];
    customColumns?: any[];
    showColumns?: Array<keyof ClaimRow>;
    title: string;
    perPage: number;
    actions?: boolean;
    columnID?: string;
}

const Table: React.FC<TableProps> = ({data, searchable , columns, customColumns , showColumns, title, perPage,actions,columnID}) => {
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState(data.slice(0, perPage));
    const [currentColumns, setCurrentColumns] = useState(columns);

    const totalPages = Math.ceil(data.length / perPage);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        const start = (page - 1) * perPage;
        const end = start + perPage;
        setCurrentData(data.slice(start, end));
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        const filteredData = data.filter((row) => {
            return Object.keys(row).some((key) => {
                const cellValue = row[key];
                return cellValue !== null && cellValue.toString().toLowerCase().includes(value);
            });
        });
        setCurrentData(filteredData.slice(0, perPage));
        setCurrentPage(1);
    }

    const getSubsetOfProperties = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
        const subset: Pick<T, K> = {} as Pick<T, K>;

        keys.forEach((key) => {
            if (obj.hasOwnProperty(key)) {
                subset[key] = obj[key];
            }
        });

        return subset;
    };

    if (showColumns){
        useEffect(() => {
        let objCopy: any[] = [];
        let columnsCopy: any[] = [];
        console.log(currentColumns);
        data.map(rows => {
            const subset = getSubsetOfProperties(rows, showColumns);
            if (columnsCopy.length === 0) {
                // iterate subset and push keys and names to columnsCopy
                currentColumns.map(value => {
                    if (Object.keys(subset).includes(value.key)) {
                        columnsCopy.push({key: value.key, name: value.name});
                    }
                });

                console.log(columnsCopy);

            }
            //console.log(Array.from(columnsCopy).flat());
            objCopy.push(subset);
        });
        console.log("unaltered");
        console.log(currentData);
        setCurrentData(objCopy.slice(0, perPage));
        setCurrentPage(1);
        setCurrentColumns(Array.from(columnsCopy).flat());
        console.log(currentColumns);
        console.log("altered");
        console.log(currentData);
        }, [showColumns]);
    }

    return (
        <Card className="h-full w-full">
            <CardBody className="overflow-auto">
                {searchable ?
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="w-full md:w-72 py-2">
                                <Input
                                    label="Search"
                                    crossOrigin={undefined}
                                    icon={<FaMagnifyingGlass/>}
                                    onChange={onSearch}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    : null}
                <table className="h-full w-full">
                    <thead>
                    <tr>
                        {customColumns ? customColumns.map((head) => (
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
                        )) : null}
                        {currentColumns.map((head) => (
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
                        <tr key={row[columnID??'id']} className="even:bg-blue-gray-50/50" onClick={()=>dispatch(setId(row[columnID??'id']))}>
                            {customColumns ? customColumns.map((col) => (
                                <td key={col.key} className="p-4">
                                    {col.render(row)}
                                </td>
                            )) : null}
                            {currentColumns.map((col) => (
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