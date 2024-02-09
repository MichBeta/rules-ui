import { useAppSelector } from "@/redux/hooks";
import { useGetSectionsQuery } from "@/redux/services/sectionApi";
import { useGetPartsBySectionCodeQuery } from "@/redux/services/partApi";
import React, { useState, useEffect  } from 'react';
import {GiSteeringWheel} from "react-icons/gi";
import {TbNewSection} from "react-icons/tb";
import {GiCarWheel} from "react-icons/gi";
import { Toaster, toast } from "sonner";
import { Part } from "@/models/part";

export function Parts() {
    const { data, error, isLoading, isFetching } = useGetSectionsQuery(null);
    const [sectionCode, setSectionCode] = useState("");
    const { data: parts, error: partsError, isLoading: partsIsLoading, isFetching: partsIsFetching } = useGetPartsBySectionCodeQuery(sectionCode);
    const [activeStep, setActiveStep] = React.useState(0);
    const [filteredSection, setFilteredSection] = useState<any[]>([]);
    const [selectedParts, setSelectedParts] = useState<string[]>([]);
    useEffect(() => {
            if(selectedParts.length > 0){
            } else {
                // Disable Stepper so user can't go to next step or previous step
            }
        }
        , [selectedParts]);
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>No parts found</div>

    const sectionFilterHandler = (isCar:boolean) => {
        if (data) { // Check if data is defined
            if (isCar === true) {
                const filteredSection = data.filter((item) => !item.DescText.includes("(MC)"));
                setFilteredSection(filteredSection);
                setActiveStep(1)
            } else {
                const filteredSection = data.filter((item) => item.DescText.includes("(MC)"));
                setFilteredSection(filteredSection);
                setActiveStep(1)
            }
        }
    }

    const partHandler = (sectionCode:string) => {
        setSectionCode(sectionCode)
        setActiveStep(selectedParts.length > 0?activeStep:2)
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, sectionPageCode: string) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedParts((prevSelectedParts) => [...prevSelectedParts, sectionPageCode]);
        } else {
            setSelectedParts((prevSelectedParts) =>
                prevSelectedParts.filter((code) => code !== sectionPageCode)
            );
        }
    };


    return (
        <div className="w-full px-24 py-4">
            {/*<Stepper
                activeStep={activeStep}
            >
                <Step onClick={() => setActiveStep(selectedParts.length > 0?activeStep:0)}>
                    <GiSteeringWheel className="h-5 w-5" />
                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                        <div
                            color={activeStep === 0 ? "blue-gray" : "gray"}
                        >
                            Vehicle Type
                        </div>
                        <div
                            color={activeStep === 0 ? "blue-gray" : "gray"}
                            className="font-normal"
                        >
                            Select your vehicle type.
                        </div>
                    </div>
                </Step>
                <Step onClick={() => setActiveStep(filteredSection.length>1?selectedParts.length > 0?activeStep:1:activeStep)}>
                    <TbNewSection className="h-5 w-5" />
                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                        <div
                            color={activeStep === 1 ? "blue-gray" : "gray"}
                        >
                            Part Section
                        </div>
                        <div
                            color={activeStep === 1 ? "blue-gray" : "gray"}
                            className="font-normal"
                        >
                            Select your part section or check the part sections you want to include.
                        </div>
                    </div>
                </Step>
                <Step onClick={() => setActiveStep(parts !== undefined?selectedParts.length > 0?activeStep:2:activeStep)}>
                    <GiCarWheel className="h-5 w-5" />
                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                        <div
                            color={activeStep === 2 ? "blue-gray" : "gray"}
                        >
                            Part
                        </div>
                        <div
                            color={activeStep === 2 ? "blue-gray" : "gray"}
                            className="font-normal"
                        >
                            Check the parts you want to include.
                        </div>
                    </div>
                </Step>
            </Stepper>*/}
            <div className="mt-32">
                {activeStep === 0 && (
                    <div className={"overflow-auto"} style={{ maxHeight: "80vh" }}>
                        {/*<List>
                            <ListItem className={`font-bold`} onClick={() => sectionFilterHandler(true)}>
                                Passenger Car & Truck
                            </ListItem>
                            <ListItem className={`font-bold`} onClick={() => sectionFilterHandler(false)}>
                                Motorcycle
                            </ListItem>
                        </List>*/}
                    </div>
                )}
                {activeStep === 1 && filteredSection ? (
                    <div className={"overflow-auto"} style={{ maxHeight: "80vh" }}>
                        {/*<List>
                            {filteredSection?.map((item, index) => (
                                <ListItem key={index} className={"bg-white font-bold"} >
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-gray-600 cursor-pointer"
                                        value={item.SectionPageCode}
                                        onChange={(e) => handleCheckboxChange(e, item.SectionPageCode)}
                                    />
                                    <div className="ml-2 w-full h-full"
                                                onClick={() => {
                                                    toast.success("Success",{
                                                        description: `${item.SectionCode}: ${item.SectionPageCode}`,
                                                    })
                                                    partHandler(item.SectionCode)
                                                }}>{item.DescText}</div>
                                </ListItem>
                            ))}
                        </List>*/}
                    </div>
                ) : null}
                {activeStep === 2 && Array.isArray(parts) ? (
                    <div className={"overflow-auto"} style={{ maxHeight: "80vh" }}>
                        {/*<List>
                            {parts && [...parts].sort((a: Part, b: Part) => (a.DescText > b.DescText) ? 1 : -1).map((item, index) => (
                                <ListItem key={index} className={"bg-white font-bold"}>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-gray-600 cursor-pointer"
                                        value={item.SectionPageCode}
                                        onChange={(e) => handleCheckboxChange(e, item.SectionPageCode)}
                                    />
                                    <div
                                        className="ml-2 w-full h-full"
                                        onClick={() => toast.success("Success",{
                                            description: item.SectionPageCode,
                                        })
                                            }
                                    >{item.DescText}</div>
                                </ListItem>
                            ))}
                        </List>*/}
                    </div>
                ) : null}
            </div>
            <Toaster />
        </div>
    )
}
