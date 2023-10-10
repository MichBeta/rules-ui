"use client";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {decrement, increment} from "@/redux/features/counterSlice";
import {setRuleCode, clearRuleCode} from "@/redux/features/ruleCodeSlice";
import {setGroupCode, clearGroupCode} from "@/redux/features/groupCodeSlice";
import {Rule} from "@/components/rule";
import {Group} from "@/components/group";

function TestPage() {
    const count = useAppSelector(state => state.counterReducer.counter)
    const dispatch = useAppDispatch()

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
                    <div className={"font-bold text-white text-center"}>Rule Code:</div>
                    <input className={"rounded-md"} type={"text"} name={"ruleCode"} />
                    <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} >
                        Submit
                    </button>
                </div>
            </form>
            <Rule/>

            <h2 className={"text-2xl mt-2"}>Group</h2>
            <form className={"flex flex-col space-y-4 bg-zinc-800 p-4 m-2 rounded-md"} onSubmit={(e) => {
                e.preventDefault();
                const GroupCode = e.currentTarget.ruleCode.value;
                dispatch(setGroupCode(GroupCode));
            } }>
                <div className={"flex flex-row space-x-4 items-center"}>
                    <div className={"font-bold text-white text-center"}>Rule Code:</div>
                    <input className={"rounded-md"} type={"text"} name={"ruleCode"} />
                    <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} >
                        Submit
                    </button>
                </div>
            </form>
            <Group/>

        </div>
    )
}

export default TestPage;