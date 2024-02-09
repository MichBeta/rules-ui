
import {ConditionComponent} from "@/components/sections/conditionComponent";
import {Operators} from "@/components/sections/operators";
import React, {useEffect, useState} from "react";
import {metadata} from "@/data/metadata";

import {useGetClaimFieldsQuery} from "@/redux/services/claimFieldApi";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Textarea,
    Typography
} from "@material-tailwind/react";


export function RulesPallete() {
    let operatorControl: boolean;
    const {data, error, isLoading, isFetching} = useGetClaimFieldsQuery(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedField, setSelectedField] = useState<string>('');
    const [operator, setOperator] = useState<string>('');
    const claimFieldType = data?.filter(item => item.name.toLowerCase() === selectedField.toLowerCase())[0]?.type;

    const [modalOpen, setModalOpen] = useState(false);
    const [fieldSelected, setFieldSelected] = useState("Select one field");
    const fieldsForCategories = metadata.find(item => item.name.toLowerCase() === selectedCategory.toLowerCase())?.fields;
    const [capt, setCapt] = useState("");
    const options = ["Current", "Previous", "Original"];

    const selectedCategoryFields = metadata.find(item => item.name.toLowerCase() === selectedCategory.toLowerCase())?.fields;
    const parser = new DOMParser();
    const selectedCompareOperators = selectedCategoryFields?.find(item => item.name.toLowerCase() === selectedField.toLowerCase())?.compareOperators.map(item => {
        const encodedString = item.name;
        const dom = parser.parseFromString('<!doctype html><body>' + encodedString, 'text/html').body.textContent;
        return {code: item.code, name: dom};
    })
    const [showD, setShowD] = useState(false)
    const exp:string[] = [];
    const [contentExp, setContentExp] = useState(exp)
    const [customValue, setCustomValue] = useState('');
    const [dialogParts, setDialogParts] = useState(false);
    const handlerDialog=()=>{
        setShowD(!showD)
    }


    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setSelectedField(''); // Reset selected field when category changes
        setOperator(''); // Reset operator when category changes
    };

    useEffect(() => {
        setCategories(metadata.map(item => item.name));
    }, []);

    const revOpen = () => {
        setModalOpen(!modalOpen);
    }
    function draw(e: React.ChangeEvent<HTMLSelectElement> ){
        setSelectedField(e.target.value)
    }

    useEffect(() => {
        if (selectedCategory === "Damage" && selectedField === "Part"){
            setDialogParts(true)
        }
    }, [selectedField,selectedCategory]);
    const displaySelected=()=>{
        if(capt !== "" && selectedField !== "")
        {
            setFieldSelected(`${capt}(${selectedField})`);
        }
        console.log("Data for field selected");
        revOpen()
    }
    function estType(modelT:string){
        setCapt(modelT);
        console.log(modelT)
    }
    const handlePredicateSelect = (event : React.ChangeEvent<HTMLSelectElement>) =>{
        setOperator(event.target.value);
    }
    useEffect(() => {

    }, [capt, selectedField]);

    const saveExpression= (e : React.ChangeEvent<any>)=>{
        setContentExp(contentExp.concat(e.target.value))
        setShowD(false)
    }


    useEffect(() => {

    }, [customValue]);

    const fieldVersion=(version: string ) =>{
        setCustomValue(customValue.concat(version))
    }

    const handleValidation=()=>{
        
    }

    return (
        <>
        <div className="dropdown-menu grid grid-cols-4 gap-5 py-0">
            <select className="border-2 border-gray-900 rounded-md p-1  ml-2 "
                    onChange={handleCategoryChange}>
                <option value={"Select Category"} className="">Select Category</option>
                {categories.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
            {selectedCategory && (
                <>
                <Textarea color="blue" onClick={revOpen} rows={1} resize={true} placeholder="Calculate"
                          className="min-h-full !border-1 focus:border-transparent" value={fieldSelected} readOnly>
                </Textarea>
                    <Dialog open={modalOpen} handler={revOpen} className="align-middle h-screen">
                        <DialogHeader>
                            <Typography color="white"  className="-ml-3">Show Fields</Typography>
                                <h3>Choose Field</h3>
                        </DialogHeader>
                        <DialogBody className="align-center">
                            <div className="overflow-auto">
                            {data ?
                            <div>
                                <br/>
                                <div className="grid grid-cols-3">
                                    {
                                        options.map(
                                            (modelT, index) => (
                                                <Button color="blue"
                                                        className="bg-blue-800 text-white mr-4 border-1 rounded-full py-3"
                                                        id={"btnOpt"}
                                                        onClick={() => estType(modelT)} key={index}
                                                >{modelT}</Button>)
                                        )
                                    }
                                </div>
                                    <hr/>
                                    <br/>
                                <div>
                                    <select id="field-Took" name="disValues"
                                            className="border-2 border-gray-900 rounded-md p-1  ml-2 "
                                            onChange={(e) => draw(e)}>
                                        {
                                            fieldsForCategories?.map(
                                                (field, index) => (
                                                    <option key={index} value={field.name}>{field.name}</option>
                                                )
                                            )
                                        }
                                    </select>
                                </div>
                                {data !== null ?
                                    < div className=" ml-px-500 align-content-center p-2">
                                        <Textarea id="fieldG" className="object-center w-8 h-1" readOnly
                                                  value={`${capt}(${selectedField})`}>
                                        </Textarea>
                                    </div>
                                    : null
                                }
                        </div>
                        : null
                    }
                </div>

                </DialogBody>
                <DialogFooter className="grid grid-cols-2  gap-9">
                    <Button color="blue" type={"submit"} ripple={true} onClick={displaySelected}>
                        Save
                    </Button>
                    <Button color="red" ripple={true} onClick={revOpen}>
                        Cancel
                    </Button>
                </DialogFooter>
        </Dialog>
                </>
            )}
            {
                selectedCategory && (
                    <select
                        className="border-2 border-gray-900 rounded-md p-1  ml-2 "
                        onChange={handlePredicateSelect}
                    >
                        <option value={""}>Select Operator</option>
                        {selectedCompareOperators?.map( (item:any, index:number) => (
                            <option key={index} value={item.code}>{item.name}</option>
                        ))}
                    </select>
                )
            }
            { selectedCategory && (claimFieldType === "money" || claimFieldType === "Price" || claimFieldType === "Numeric") &&
               !dialogParts && (
                <div>
                    <Textarea rows={1} resize={true} placeholder="Calculate"
                              className="min-h-full !border-1 focus:border-transparent" onClick={handlerDialog} value={customValue}
                    />
                    <Dialog open={showD} handler={handlerDialog} size={"xl"} className="h-screen">
                        <DialogHeader className="grid-cols-3 gap-96 gap-x-11">
                            <Typography color="blue-gray" className="px-36 align-middle">Calculate Expression</Typography>

                            <Button color="light-blue" className="px-20 ml-40" onClick={ev => saveExpression(ev)}>Save</Button>

                            <Button onClick={() => setShowD(false)} color="red" className="px-20 ml-3">Cancel</Button>
                        </DialogHeader>
                        <DialogBody>
                            <div className="pb-4">
                                <form>
                                    <Input
                                        value={customValue}
                                        crossOrigin="anonymous"
                                        readOnly={false}
                                        onChange={ev => setCustomValue(ev.target.value)}
                                        onBlur={handleValidation}
                                    />
                                </form>
                            </div>
                            <div className="grid grid-cols-10 gap-5 grid-rows-1 px-1">
                                <Button className={"py-1 px-4 bg-blue-gray-600"}
                                        onClick={()=>fieldVersion("Current")}>Current</Button>
                                <Button className={" py-1 px-4 bg-blue-gray-600"}
                                        onClick={()=>fieldVersion("Previous")}>Previous</Button>
                                <Button className={" py-1 px-4 bg-blue-gray-600"}
                                        onClick={()=>fieldVersion("Original")}>Original</Button>

                                <Button
                                    className={"text-2xl py-1 px-4 border-1 outline: 2px solid black; outline-offset: 3px"}
                                    color="blue"
                                    onClick={()=> setCustomValue(customValue.concat("("))} >(</Button>
                                <Button className={"text-2xl py-1 px-4"} color="blue"
                                        onClick={()=> setCustomValue(customValue.concat(")"))} > ) </Button>
                                <Button className={"text-2xl py-1 px-4"} color="blue"
                                        onClick={()=> setCustomValue(customValue.concat("+"))} >+</Button>
                                <Button className={"text-2xl py-1 px-4"} color="blue"
                                        onClick={()=> setCustomValue(customValue.concat("-"))} >-</Button>
                                <Button className={"text-2xl py-1 px-4"} color="blue"
                                        onClick={()=> setCustomValue(customValue.concat("/"))} >/</Button>
                                <Button className={"text-2xl py-1 px-4"} color="blue"
                                        onClick={()=> setCustomValue(customValue.concat("%"))} >%</Button>
                                <Button className={"text-2xl py-1 px-4"} color="blue"
                                        onClick={()=> setCustomValue(customValue.concat("*"))} >*</Button>
                            </div>
                            <hr/>
                            <div className="grid items-end gap-1.5 py-2 grid-cols-5">
                                {
                                    fieldsForCategories?.map(
                                        (field, index) => (
                                            <div key={index}>
                                    <span
                                        className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-blue-500 py-1 px-2 font-sans text-xs font-bold uppercase text-white"
                                        onClick={()=> setCustomValue(customValue.concat(`[${field.name}]`))}
                                    >
                                        {field.name}
                                    </span>
                                            </div>
                                        ))
                                }
                            </div>
                        </DialogBody>
                    </Dialog>
                </div>
            )
            }
        </div>
            <ConditionComponent/>
            <div className={"ml-4"}>
                <Operators/>
            </div>
        </>
    )
}