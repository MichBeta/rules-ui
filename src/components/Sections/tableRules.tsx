import TabsComponent from "@/components/tabs";
import { Input, Textarea, Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { metadata } from '@/data/metadata';
import { useGetClaimFieldsQuery } from "@/redux/services/claimFieldApi";
import { Rule, useGetRuleByRuleCodeQuery } from "@/redux/services/ruleApi";
import {RulesPallete} from "@/components/sections/rulesPallete";
interface rulesTb {
    editEnable?: boolean;
    rulecode?: string;
}

export const TableRules: React.FC<rulesTb> = ({ editEnable, rulecode= "None" }) => {
    const { data, error, isLoading, isFetching } = useGetClaimFieldsQuery(null);
    const rulesByCode = useGetRuleByRuleCodeQuery(rulecode === "None"? "": rulecode);

    const [check, setCheck] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedField, setSelectedField] = useState<string>('');
    const [operator, setOperator] = useState<string>('');
    const [inputValueCode, setInputValueCode] = useState();
    const [inputValueName, setInputValueName] = useState();

    const selectedCategoryFields = metadata.find(item => item.name.toLowerCase() === selectedCategory.toLowerCase())?.fields;

    const parser = new DOMParser();
    const selectedCompareOperators = selectedCategoryFields?.find(item => item.name.toLowerCase() === selectedField.toLowerCase())?.compareOperators.map(item => {
        const encodedString = item.name;
        const dom = parser.parseFromString('<!doctype html><body>' + encodedString, 'text/html').body.textContent;
        return { code: item.code, name: dom };
    })

    const handleInputName = (event: any) => {
        setInputValueName(event.target.value)
    }

    const handlePredicateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOperator(e.target.value);
    }

    console.log("code" + rulesByCode.data?.name);
    if (editEnable === false)
    {
        return (
            <div className="sm: text-center p-1">
                <TabsComponent data={[
                    {
                        id: 1, label: "Description", value: "description", content: <>
                            <div className={"grid grid-cols-2 gap-6 py-0 m-0 row-1"}>
                                <Input className={"inp-main"} label="Code" crossOrigin={undefined} type="text"
                                    required={true} />

                                <Input className={"inp-sec"} label="Name" crossOrigin={undefined} type="text"
                                    required={true} />
                                <br />
                            </div>
                            <div>
                                <RulesPallete />
                            </div>
                            <br />
                            <Textarea
                                size={"lg"}
                                label={"Description"}
                                required={true}
                            />
                            <hr />
                            <Textarea
                                size={"lg"}
                                label={"Violation message"}
                                required={true}
                            />
                        </>
                    },
                    {
                        id: 2, label: "Groups", value: "groups", content: <></>
                    },
                    { id: 3, label: "Summary", value: "summary", content: <></> }
                ]} />
            </div>

        )
    }else {
        return (
            editEnable && rulesByCode.data !== null ?
                <div className="py-0">
                    <TabsComponent data={[
                        {
                            id: 1, label: "Description", value: "description", content: <>
                                <div className={"grid grid-cols-2 gap-6 "}>
                                    <Input className={"inp-main"} label="Code" crossOrigin={undefined} type="text"
                                           required={false} value={rulesByCode.data?.ruleCode}  placeholder={rulesByCode.data?.ruleCode}/>

                                    <Input className={"inp-sec"} label="Name" crossOrigin={undefined} type="text"
                                           required={false} value={inputValueName} onChange={handleInputName} placeholder={rulesByCode.data?.name}/>
                                    <br />
                                </div>
                               <RulesPallete/>
                                <br />
                                <Textarea
                                    size={"lg"}
                                    label={"Description"}
                                    value={rulesByCode.data?.description}
                                    required={true}
                                />
                                <hr />
                                <Textarea
                                    size={"lg"}
                                    label={"Violation message"}
                                    value={rulesByCode.data?.violationMessage}
                                    required={true}
                                />
                            </>
                        },
                        {
                            id: 2, label: "Groups", value: "groups", content: <></>
                        },
                        { id: 3, label: "Summary", value: "summary", content: <></> }
                    ]} />
                </div>
                : null
        )
    }

}

