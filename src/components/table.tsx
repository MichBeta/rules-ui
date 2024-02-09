import React, {useState} from 'react';
import Pagination from "@/components/pagination";
import {AiOutlineEdit, AiOutlineDelete} from "react-icons/ai";
import {BiArchiveIn} from "react-icons/bi";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {setId} from "@/redux/features/tableRowIdSlice";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";

interface TableProps {
    data: any[];
    searchable?: boolean;
    columns: any[];
    customColumns?: any[];
    title: string;
    perPage: number;
    actions?: boolean;
    columnID?: string;
}

export const Table: React.FC<TableProps> = ({data, searchable , columns, customColumns , title, perPage,actions,columnID}) => {
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState(data.slice(0, perPage));

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

    return (
        <div className="h-full w-full">
            <div className="overflow-auto">
                {searchable ?
                    <div className="rounded-none">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="w-full md:w-72 py-2">
                                <input
                                    /*label="Search"
                                    crossOrigin={undefined}
                                    icon={<FaMagnifyingGlass/>}*/
                                    onChange={onSearch}
                                />
                            </div>
                        </div>
                    </div>
                    : null}
                <table className="h-full w-full" key={currentPage}>
                    <thead>
                    <tr >
                        {customColumns ? customColumns.map((head) => (
                            <th
                                key={head.key}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <div
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head.name}
                                </div>
                            </th>
                        )) : null}
                        {columns.map((head) => (
                            <th
                                key={head.key}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <div
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head.name}
                                </div>
                            </th>
                        ))}
                        {actions ?
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <div
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                            >
                                Actions
                            </div>
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
                            {columns.map((col) => (
                                <td key={col.key} className="p-4">
                                    <div color="blue-gray"
                                                className="font-normal">{row[col.key]}</div>
                                </td>
                            ))}
                            {actions ?
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <button
                                        className="p-2 rounded-full bg-blue-gray-100 hover:bg-blue-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-gray-500"
                                        aria-label="Edit"
                                    >
                                        <AiOutlineEdit/>
                                    </button>
                                    <button
                                        className="p-2 rounded-full bg-blue-gray-100 hover:bg-blue-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-gray-500"
                                        aria-label="Delete"
                                    >
                                        <AiOutlineDelete/>
                                    </button>
                                    <button
                                        className="p-2 rounded-full bg-blue-gray-100 hover:bg-blue-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-gray-500"
                                        aria-label="Archive"
                                    >
                                        <BiArchiveIn/>
                                    </button>
                                </div>
                            </td>
                            : null}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
            </div>
        </div>
    );
}

export default Table;