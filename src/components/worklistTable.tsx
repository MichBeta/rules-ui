import React, {useEffect, useState} from 'react';
import Pagination from "@/components/pagination";
import {FaMagnifyingGlass} from "react-icons/fa6";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaFileDownload  } from "react-icons/fa";
import {setId} from "@/redux/features/tableRowIdSlice";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {ClaimRow} from "@/models/claimField";
import {claimColumnToClaimName} from "@/app/utils";
import { Toaster, toast } from "sonner";
import {Console} from "inspector";

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
    const [claimsPerPage, setClaimsPerPage] = useState(perPage);
    const [activeTab, setActiveTab] = useState<string>(data[0].value);
    const [isOpen, setIsOpen] = useState(false);
    const totalPages = Math.ceil(data.length / claimsPerPage);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        const start = (page - 1) * claimsPerPage;
        const end = start + claimsPerPage;
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
        setCurrentData(filteredData.slice(0, claimsPerPage));
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

    const columnCheckboxHandler = (columnKey: string) => {
        setCurrentColumns((prevColumns) => {
            let newColumns;
            if (prevColumns.some((val) => val.key === columnKey)) {
                newColumns = prevColumns.filter((val) => val.key !== columnKey);
            } else {
                const columnToAdd = columns.find((val) => val.key === columnKey);
                newColumns = columnToAdd ? [...prevColumns, columnToAdd] : prevColumns;
            }
            updateCurrentData(data, newColumns);
            return newColumns;
        });
    };

    const updateCurrentData = (allData: any[], newColumns: any[]) => {
        let newData = allData.map(row => {
            return getSubsetOfProperties(row, newColumns.map(col => col.key));
        });
        setCurrentData(newData.slice(0, claimsPerPage));
    }

    const tabChangeHandler = (tab: number) => {
        setActiveTab(tab.toString());
        setView(tab);
    }


    useEffect(() => {
        if (showColumns){
            let objCopy: any[] = [];
            let columnsCopy: any[] = [];
            data.map(rows => {
                const subset = getSubsetOfProperties(rows, showColumns as (keyof ClaimRow)[]);
                if (columnsCopy.length === 0) {
                    // iterate subset and push keys and names to columnsCopy
                    showColumns?.map(value => {
                        if (Object.keys(subset).includes(value)) {
                            columnsCopy.push({key: value, name: claimColumnToClaimName(value)});
                        }
                    });

                }
                objCopy.push(subset);
            });
            setCurrentData(objCopy.slice(0, claimsPerPage));
            setCurrentPage(1);
            setCurrentColumns(Array.from(columnsCopy).flat());
        }
    }, [showColumns,claimsPerPage]);
    return (
        <div className="h-full w-full">
            <div className="rounded-none overflow-visible">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <div className="relative inline-block text-left">
                            <div>
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                                    id="menu-button"
                                    aria-expanded="true"
                                    aria-haspopup="true"
                                    onClick={()=>setIsOpen(!isOpen)}
                                >
                                    Columns
                                    {/* Icono de flecha hacia abajo o algún indicador de que es un menú desplegable */}
                                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div className={`${isOpen? 'block' : 'hidden'} origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                                <div className="py-1" role="none">
                                    {/* Iterar sobre cada columna */}
                                    {columns.map((col) => (
                                        <div key={col.key} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id={col.key}>
                                            <label htmlFor={`checkbox-${col.key}`} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`checkbox-${col.key}`}
                                                    className="form-checkbox text-indigo-600 h-4 w-4"
                                                    checked={currentColumns.some((val) => val.key === col.key)}
                                                    onChange={() => { columnCheckboxHandler(col.key) }}
                                                />
                                                {col.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className="flex items-center gap-3">
                            <FaFileDownload strokeWidth={2} className="h-4 w-4" /> Export
                        </button>
                    </div>
                    <div className="w-72">
                        <select value={(parseInt(((perPage+9)/10).toString())*10).toString()} onChange={(e) => {
                            if(e === undefined) return;
                            setClaimsPerPage(parseInt(e.target.value));
                        }}>
                            <option value={"10"}>10</option>
                            <option value={"20"}>20</option>
                            <option value={"30"}>30</option>
                            <option value={"40"}>40</option>
                            <option value={"50"}>50</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div
                        className={"grid"}
                    >
                        <div >
                            {TABS.map(tab => (
                                <button
                                    key={tab.value}
                                    className={`px-4 py-2 text-sm font-semibold text-gray-600 ${activeTab === tab.value.toString() ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                                    onClick={() => tabChangeHandler(tab.value)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div >
                    </div >
                    <div className="w-full md:w-72">
                        <input
                            /*crossOrigin={undefined}
                            label="Search"
                            icon={<FaMagnifyingGlass className="h-5 w-5" />}*/
                            onChange={onSearch}
                        />
                    </div>
                </div>
            </div>
            <div className="overflow-scroll px-0">
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
                                <div
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                >
                                    {head.name}{" "}
                                    {index !== currentColumns.length && (
                                        <LuChevronsUpDown strokeWidth={2} className="h-4 w-4" />
                                    )}
                                </div>
                            </th>
                        ))}
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <div
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                            >
                                Actions
                            </div>
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
                                            <div
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {row[col.key]}
                                            </div>
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
            </div>
            <div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
            </div>
            <Toaster />
        </div>
    );
}

export default WorklistTable;