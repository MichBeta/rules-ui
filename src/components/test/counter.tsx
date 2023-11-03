import {increment,decrement} from "@/redux/features/counterSlice";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";

export default function Counter() {
    const count = useAppSelector(state => state.counterReducer.counter)
    return(
        <div>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    )
}