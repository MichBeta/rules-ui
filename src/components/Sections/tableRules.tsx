import TabsComponent from "@/components/tabs";
import React, { useEffect, useState } from "react";
import { metadata } from '@/data/metadata'
import { useGetClaimFieldsQuery } from "@/redux/services/claimFieldApi";
import { Operators } from "@/components/Sections/operators";
import { RuleModalHook } from "../rulesOptions/ruleModal";



export function TableRules() {
    const { data, error, isLoading, isFetching } = useGetClaimFieldsQuery(null);
    const [check, setCheck] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedField, setSelectedField] = useState<string>('');
    const [operator, setOperator] = useState<string>('');
    const [midHelp, setMidHelp] = useState(false)
    const selectedCategoryFields = metadata.find(item => item.name.toLowerCase() === selectedCategory.toLowerCase())?.fields;

    const parser = new DOMParser();
    const selectedCompareOperators = selectedCategoryFields?.find(item => item.name.toLowerCase() === selectedField.toLowerCase())?.compareOperators.map(item => {
        const encodedString = item.name;
        const dom = parser.parseFromString('<!doctype html><body>' + encodedString, 'text/html').body.textContent;
        return { code: item.code, name: dom };
    })

    const metadataType = selectedCategoryFields?.find(item => item.name.toLowerCase() === selectedField.toLowerCase())?.type;
    const claimFieldType = data?.filter(item => item.name.toLowerCase() === selectedField.toLowerCase())[0]?.type;
    const claimFieldxPath = data?.filter(item => item.name.toLowerCase() === selectedField.toLowerCase())[0]?.xpath;
    const handOpen = () => {
        setCheck(!check)
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setSelectedField(''); // Reset selected field when category changes
        setOperator(''); // Reset operator when category changes
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedField(e.target.value);
        setOperator(''); // Reset operator when field changes
    };

    useEffect(() => {
        setCategories(metadata.map(item => item.name));
    }, []);

    const handlePredicateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOperator(e.target.value);
    }


    return (
        <div>
            <TabsComponent data={[
                {
                    id: 1, label: "Description", value: "description", content: <>
                        <div className={"grid grid-cols-2 gap-6 "}>
                            <input className={"inp-main"}  type="text"
                                required={true} />

                            <input className={"inp-sec"} type="text"
                                required={true} />
                            <br />
                        </div>

                        <div className="dropdown-menu grid grid-cols-3 gap-5">
                            <select  className="border-2 border-gray-300 rounded-md p-3  ml-2 "
                                onChange={handleCategoryChange}>
                                <option value={""} className="">Select Category</option>
                                {categories.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            {selectedCategory && (
                                
                                <RuleModalHook selectedCategory={selectedCategory}/>
                            )}
                            {selectedField && selectedCompareOperators && (
                                <select  onChange={handlePredicateChange}>
                                    <option value={""}>Select Operator</option>
                                    {selectedCompareOperators.map((item, index) => (
                                        <option key={index} value={item.code}>{item.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div className={"m-4"}>
                            <Operators />
                        </div>

                        <br />
                        {/*<Textarea
                            size={"lg"}
                            label={"Description"}
                            required={true}
                        />
                        <hr />
                        <Textarea
                            size={"lg"}
                            label={"Violation message"}
                            required={true}
                        />*/}
                    </>
                },
                {
                    id: 2, label: "Groups", value: "groups", content: <></>
                },
                { id: 3, label: "Summary", value: "summary", content: <></> }
            ]} />
        </div>
    )

}

