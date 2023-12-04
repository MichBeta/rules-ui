"use client";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {decrement, increment} from "@/redux/features/counterSlice";
import {setRuleCode, clearRuleCode} from "@/redux/features/ruleCodeSlice";
import {Rule} from "@/components/test/rule";
import {Parts} from "@/components/test/part";
import {AxnClaimViewer} from "@/components/test/axnClaimViewer";
import {Predicate} from "@/components/test/predicate";
import {ClaimFields} from "@/components/test/claimField";
import {Enumerations} from "@/components/test/enumeration";
import {Validator} from "@/components/test/validator";
import {Group} from "@/components/test/group";
import TabsComponent from "@/components/tabs";
import React from "react";
import {useGetRulesQuery} from "@/redux/services/ruleApi";

const data = [
    { id: 1, label: "Predicate", value:"predicate", content: <Predicate /> },
    { id: 2, label: "Claim Fields", value:"claimFields", content: <ClaimFields /> },
    { id: 3, label: "Enumerations", value:"enumerations", content: <Enumerations /> },
    { id: 3, label: "Validator", value:"validator", content: <Validator/> },
    { id: 4, label: "Parts", value:"parts", content: <Parts/> },
    { id: 5, label: "AxnClaimViewer", value:"axnClaimViewer", content: <AxnClaimViewer/> },
]

function TestPage() {
    const count = useAppSelector(state => state.counterReducer.counter)
    //const rules = useGetRulesQuery(null)
    const dispatch = useAppDispatch()
    return (
        <TabsComponent data={data}/>
    )
    return (
        <div className={"flex flex-col items-center justify-center h-screen"}>
            <h1 className={"text-4xl"}>Redux Examples</h1>
            <h2 className={"text-2xl"}>Counter: {count}</h2>
            <div className={"flex flex-row space-x-4"}>
                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} onClick={() => dispatch(increment())}>
                    Increment
                </button>

                <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} onClick={() => dispatch(decrement())}>
                    Decrement
                </button>
            </div>
            <h2 className={"text-2xl mt-2"}>Rule</h2>
            <form className={"flex flex-col space-y-4 bg-zinc-800 p-4 m-2 rounded-md"} onSubmit={(e) => {
                e.preventDefault();
                const ruleCode = e.currentTarget.ruleCode.value;
                dispatch(setRuleCode(ruleCode));
            } }>
                <div className={"flex flex-row space-x-4 items-center"}>
                    <div className={"font-bold text-center"}>Rule Code:</div>
                    <input className={"rounded-md border border-black"} type={"text"} name={"ruleCode"} />
                    <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} >
                        Submit
                    </button>
                </div>
            </form>
            <Rule/>
        </div>
    )
}

export default TestPage;