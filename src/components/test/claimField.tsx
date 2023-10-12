import {useGetClaimFieldsQuery} from "@/redux/services/claimFieldApi";
import React, {useState} from 'react';
import {Card, List, ListItem, Chip} from "@material-tailwind/react";

export function ClaimFields() {
    const {data, error, isLoading, isFetching} = useGetClaimFieldsQuery(null)
    const [claimField, setClaimField] = useState("")
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No claim fields found</div>
    // each claim field has a category, name, type, xpath, and canCalculateVariance property, I want to divide the data into these categories
    const transformedData = data?.reduce((acc, item) => {
        const { category, ...rest } = item;
        if (acc[category]) {
            acc[category].push(rest);
        } else {
            acc[category] = [rest];
        }
        return acc;
    }, {});
    return (
        <div className={"overflow-auto"}>
            {Object.entries({transformedData}).map(([keys, values]) => (
                <div key={keys}>
                    {values ?
                        <div>
                            <select
                                className={"border border-gray-300 rounded-md p-2"}
                                onChange={(e) => setClaimField(e.target.value)}
                                value={claimField}
                            >
                                <option value={""}>Select Enumeration</option>
                                {Object.entries(values).map(([key, value]) => (
                                    <option key={key} value={key}>{key}</option>
                                ))}
                            </select>
                            {claimField ?
                                <Card className={"overflow-auto bg-[#1B1E27]"} style={{maxHeight: "80vh"}}>
                                    <List>
                                        {Object.entries(values[claimField]).map(([key, value]) => (
                                            <ListItem key={key} className={"bg-white font-bold"}>
                                                <Chip color="blue" value="Name:" /> {value.name}, <Chip color="green" value="Type:" /> {value.type}, <Chip color="cyan" value="XPath:" /> {value.xpath}, <Chip color="purple" value="Can Calculate Variance:" /> {value.canCalculateVariance ?
                                                <Chip
                                                    variant="ghost"
                                                    color="green"
                                                    size="sm"
                                                    value="Yes"
                                                    icon={
                                                        <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                                                    }
                                                />:
                                                <Chip
                                                    variant="ghost"
                                                    color="red"
                                                    size="sm"
                                                    value="No"
                                                    icon={
                                                        <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-900 content-['']" />
                                                    }
                                                />}
                                            </ListItem>
                                        ))}
                                    </List>
                                </Card>
                                : null}
                        </div>
                        : null}
                </div>
            ))}
        </div>
    )
}