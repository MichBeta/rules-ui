import {useGetEnumerationsQuery} from "@/redux/services/enumerationApi";
import {useState} from "react";
import {List, ListItem} from "@material-tailwind/react";


export function Enumerations() {
    const {data, error, isLoading, isFetching} = useGetEnumerationsQuery(null)
    const [enumeration, setEnumeration] = useState("")
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No enumerations found</div>
    return (
        <div className={"overflow-auto"}>
            {Object.entries({data}).map(([keys, values]) => (
                <div key={keys}>
                    {values ?
                        <div>
                            <select
                                className={"border border-gray-300 rounded-md p-2"}
                                onChange={(e) => setEnumeration(e.target.value)}
                                value={enumeration}
                            >
                                <option value={""}>Select Enumeration</option>
                                {Object.entries(values).map(([key, value]) => (
                                    <option key={key} value={key}>{key}</option>
                                ))}
                            </select>
                            {enumeration ?
                                <div className={"overflow-auto bg-[#1B1E27]"} style={{maxHeight: "80vh"}}>
                                    <List>
                                        {Object.entries(values[enumeration]).map(([key, value]) => (
                                            <ListItem key={key} className={"bg-white font-bold"}>
                                                {key}: {value}
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                                : null}
                        </div>
                        : null}
                </div>
            ))}
        </div>
    )
}