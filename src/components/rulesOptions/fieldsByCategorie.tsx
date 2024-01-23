
import { metadata } from "@/data/metadata";
import { useGetClaimFieldsQuery } from "@/redux/services/claimFieldApi";
import { Button, Textarea } from "@material-tailwind/react";
import React, {useEffect, useState} from "react";


export function FieldsByCategorie({ fieldToMatch = "Select" }) {

    interface Field {
        values: {
            name: string;
            code: string;
        }[];
        name: string;
        compareOperators: {
            name: string;
            code: string;
        }[];
        code: string;
        type: string;

    }

    const { data, error, isLoading, isFetching } = useGetClaimFieldsQuery(null);
    const fieldsForCastegories = metadata.find(item => item.name.toLowerCase() === fieldToMatch.toLowerCase())?.fields;
    const [capt, setCapt] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const options =["Current","Previous", "Original"];
    function draw(e: React.ChangeEvent<HTMLSelectElement> ){
        setSelectedValue(e.target.value)
    }

    function estType(modelT:string){
        setCapt(modelT);
        console.log(modelT)
    }
    useEffect(() => {

    }, [capt, selectedValue]);

    return (
        <div className="overflow-auto">
            {data ?
                <div>
                    <br />
                    <div className="grid grid-cols-3">
                        {
                            options.map(
                                (modelT, index) =>( 
                                <Button color="blue" 
                                className="bg-blue-800 text-white mr-4 border-1 rounded-full py-3" 
                                id={"btnOpt"} 
                                onClick={ ()=> estType(modelT)} key={index}
                                >{modelT}</Button>)
                            )
                        }
                    </div>
                    <hr />
                    <br />
                    <div>
                        <select id="field-Took" name="disValues" className="color=gray border-2 border-gray-300 rounded-md p-2 ml-1.5" onChange={ (e) => draw(e)}>
                            {
                                fieldsForCastegories?.map(
                                    (field, index) => (
                                        <option key={index} value={field.name} >{field.name}</option>
                                    )
                                )
                            }
                        </select>
                    </div>
                    {data !== null ?
                        < div className=" ml-px-500 align-content-center p-2" >
                            <Textarea id="fieldG" className="object-center w-8 h-1" readOnly value={`${capt}(${selectedValue})`}>

                            </Textarea>
                        </div >
                        : null
                    }
                </div>
                : null
            }
        </div>
    )
}