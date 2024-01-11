import React, {useEffect, useState} from 'react';
import Pagination from "@/components/pagination";
import {Card, CardBody, CardHeader, CardFooter, Tooltip, Typography, Input, Tabs, Chip, TabsHeader, Tab, IconButton, Button} from "@material-tailwind/react";
import {AiOutlineEdit, AiOutlineDelete} from "react-icons/ai";
import {BiArchiveIn} from "react-icons/bi";
import {FaMagnifyingGlass} from "react-icons/fa6";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaPlus, FaEye, FaFilePdf } from "react-icons/fa";
import {setId} from "@/redux/features/tableRowIdSlice";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {ClaimRow} from "@/models/claimField";
import {claimColumnToClaimName} from "@/app/utils";
import { Toaster, toast } from "sonner";

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
    view?: number;
    setView: (value: number) => void;
    sortBy?: string;
    sortAscending?: boolean;
}

const TABS = [
    {
        label: "Enterprise Results",
        value: 0,
    },
    {
        label: "Status",
        value: 1,
    },
    {
        label: "Insurance Office",
        value: 2,
    },
    {
        label: "Appraisal Resource",
        value: 3,
    },
];

const WorklistTable: React.FC<TableProps> = ({data, searchable , columns, customColumns , showColumns, title, perPage,actions,columnID, view, setView, sortBy, sortAscending}) => {
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState(data.slice(0, perPage));
    const [currentColumns, setCurrentColumns] = useState(columns);
    const [srtBy, setSrtBy] = useState(sortBy);
    const [srtAscending, setSrtAscending] = useState(sortAscending);

    console.log("currentData", currentData);
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


    useEffect(() => {
        if (showColumns){
            let objCopy: any[] = [];
            let columnsCopy: any[] = [];
            data.map(rows => {
                const subset = getSubsetOfProperties(rows, showColumns);
                if (columnsCopy.length === 0) {
                    // iterate subset and push keys and names to columnsCopy
                    showColumns.map(value => {
                        if (Object.keys(subset).includes(value)) {
                            columnsCopy.push({key: value, name: claimColumnToClaimName(value)});
                        }
                    });

                }
                //console.log(Array.from(columnsCopy).flat());
                objCopy.push(subset);
            });
            setCurrentData(objCopy.slice(0, perPage));
            setCurrentPage(1);
            setCurrentColumns(Array.from(columnsCopy).flat());
        }
    }, [showColumns]);
    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button variant="outlined" size="sm">
                            Columns
                        </Button>
                        <Button className="flex items-center gap-3" size="sm">
                            <FaPlus strokeWidth={2} className="h-4 w-4" /> Download
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value} onClick={() => setView(value)}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            crossOrigin={undefined}
                            label="Search"
                            icon={<FaMagnifyingGlass className="h-5 w-5" />}
                            onChange={onSearch}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {currentColumns.map((head, index) => (
                            <th
                                key={head.key}
                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                onClick={() => {
                                    if (srtBy === head.key) {
                                        setSrtAscending(!srtAscending);
                                    } else {
                                        setSrtBy(head.key);
                                        setSrtAscending(true);
                                    }
                                }
                                }
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                >
                                    {head.name}{" "}
                                    {index !== currentColumns.length && (
                                        <LuChevronsUpDown strokeWidth={2} className="h-4 w-4" />
                                    )}
                                </Typography>
                            </th>
                        ))}
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                            >
                                Actions
                            </Typography>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.sort((a, b) => {
                        if (srtBy) {
                            if (srtAscending) {
                                return a[srtBy] < b[srtBy] ? -1 : 1;
                            } else {
                                return a[srtBy] > b[srtBy] ? -1 : 1;
                            }
                        } else {
                            return 0;
                        }
                    }).map((row, index) => {
                        const isLast = index === currentData.length - 1;
                        const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";
                        return (
                            <tr key={row[columnID??'id']} className="even:bg-blue-gray-50/50" onClick={()=>dispatch(setId(row[columnID??'id']))}>
                            {
                                currentColumns.map((col) => {
                                return (
                                <td key={col.key} className={classes}>
                                    <div className="flex items-center gap-3">
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {row[col.key]}
                                            </Typography>
                                        </div>
                                    </div>
                                </td>
                        )
                    })}
                                <td className={classes}>
                                    {customColumns ? customColumns.map((col) => (
                                        <td key={col.key} className="p-4">
                                            {col.render(row)}
                                        </td>
                                    )) : null}
                                </td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
            </CardFooter>
            <Toaster />
        </Card>
    );
}

export default WorklistTable;