import {useGetClaimFieldsQuery} from "@/redux/services/claimFieldApi";
import React, {useState, useEffect} from 'react';
import {Card, List, ListItem, Chip, Input} from "@material-tailwind/react";
import {ClaimField} from "@/models/claimField";
import {metadata} from "@/data/metadata";
import {MetaData, Field, CompareOperator, FieldValue} from "@/models/metadata";


export function ClaimFields() {
    const { data, error, isLoading, isFetching } = useGetClaimFieldsQuery(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedField, setSelectedField] = useState<string>('');
    const [operator, setOperator] = useState<string>('');

    useEffect(() => {
        setCategories(metadata.map(item => item.name));
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setSelectedField(''); // Reset selected field when category changes
        setOperator(''); // Reset operator when category changes
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedField(e.target.value);
        setOperator(''); // Reset operator when field changes
    };

    const handlePredicateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOperator(e.target.value);
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No claim fields found</div>
    console.log(data)
    const selectedCategoryFields = metadata.find(item => item.name.toLowerCase() === selectedCategory.toLowerCase())?.fields;
    const parser = new DOMParser();
    const selectedCompareOperators = selectedCategoryFields?.find(item => item.name.toLowerCase() === selectedField.toLowerCase())?.compareOperators.map(item => {
        const encodedString = item.name;
        const dom = parser.parseFromString('<!doctype html><body>' + encodedString, 'text/html').body.textContent;
        return {code: item.code, name: dom};
    })
    const metadataType = selectedCategoryFields?.find(item => item.name.toLowerCase() === selectedField.toLowerCase())?.type;
    const claimFieldType = data?.filter(item => item.name.toLowerCase() === selectedField.toLowerCase())[0]?.type;
    const claimFieldxPath = data?.filter(item => item.name.toLowerCase() === selectedField.toLowerCase())[0]?.xpath;
    return (
        <div className={"overflow-auto"}>
            {data ?
                <>
                    <select className={"border-2 border-gray-300 rounded-md p-2"} onChange={handleCategoryChange}>
                        <option value={""}>Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                    {selectedCategory && (
                        <select className={"border-2 border-gray-300 rounded-md p-2"} onChange={handleFieldChange}>
                            <option value={""}>Select Field</option>
                            {selectedCategoryFields?.map((item, index) => (
                                <option key={index} value={item.name}>{item.name}</option>
                            ))}
                        </select>
                    )}
                    {selectedField && selectedCompareOperators && (
                        <select
                            className={"border-2 border-gray-300 rounded-md p-2"}
                            onChange={handlePredicateChange}
                        >
                            <option value={""}>Select Operator</option>
                            {selectedCompareOperators.map((item, index) => (
                                <option key={index} value={item.code}>{item.name}</option>
                            ))}
                        </select>
                    )}
                    {selectedField && selectedCompareOperators && metadataType && (
                        <Input
                            className="border-2 border-gray-300 rounded-md p-2"
                            size="lg"
                            label={"Metadata Type(Extracted from AXN)"}
                            type={"text"}
                            value={metadataType}
                            onChange={() => {}}
                            crossOrigin={undefined}
                            readOnly={true}
                        />
                    )}
                    {selectedField && selectedCompareOperators && claimFieldType && (
                        <Input
                            className="border-2 border-gray-300 rounded-md p-2"
                            size="lg"
                            label={"ClaimField Type(Qapter Compliance)"}
                            type={"text"}
                            value={claimFieldType}
                            onChange={() => {}}
                            crossOrigin={undefined}
                            readOnly={true}
                        />
                    )}
                    {selectedField && selectedCompareOperators && claimFieldxPath && (
                        <Input
                            className="border-2 border-gray-300 rounded-md p-2"
                            size="lg"
                            label={"ClaimField XPath(Qapter Compliance)"}
                            type={"text"}
                            value={claimFieldxPath}
                            onChange={() => {}}
                            crossOrigin={undefined}
                            readOnly={true}
                        />
                    )}
                </>
                : null}
        </div>
    )
}
