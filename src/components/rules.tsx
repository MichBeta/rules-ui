import {Rule, useGetRulesByOwnerQuery} from "@/redux/services/ruleApi";
import {
    Spinner,
    Button,
    Typography,
    DialogHeader,
    DialogBody,
    DialogFooter, Dialog, Tooltip, IconButton
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import {Children, PropsWithChildren, useState} from "react";
import {metadata} from "@/data/metadata";
import { TableRules } from "./sections/tableRules"
import { FaEye } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa";
import { RulesTableView } from "./sections/rulesTableView";
import { ruleApi } from '../redux/services/ruleApi';
import {redirect, useRouter} from "next/navigation";


export function Rules() {
    const owner = Cookies.get("credentials")?.split("|")[2] || "";
    const {data, error, isLoading, isFetching} = useGetRulesByOwnerQuery(Cookies.get("credentials")?.split("|")[2] || "")
    const router = useRouter();
    const dataForField = metadata.map( categories => categories.code); // use in case we can filter the categories

    const handleOpen = () => {
        router.push('/rule')
    };


    console.log(data)
    if (isLoading) return (
        <div className={"flex flex-col space-y-4 items-center justify-center"}>
            <Spinner className="h-16 w-16 text-gray-900/50"/>
        </div>
    )
    if (error) return <div>No rules found</div>
    // return a table with the rules
    return (
        <div className={"flex flex-col space-y-2 m-0 p-0"}>
            {data
                ?
                <>
                    <div className={"flex flex-row-reverse items-center gap-2 "}>
                        <Button color="blue" className="flex items-center gap-3 p-3" onClick={handleOpen}>
                            <Typography color="white">Add Rule</Typography>
                        </Button >
                    </div>
                    <RulesTableView 
                    data={data} perPage={7}
                    />
                </>
                : null}
        </div>
    )
}