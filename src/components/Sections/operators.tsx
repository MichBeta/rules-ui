export function Operators(){

    return(
        <div className={"grid grid-cols-4"} >
            <button   className="bg-blue-800 text-white mr-4 border-1 rounded-full py-2"> Delete All</button>
            <button   className="bg-blue-800 text-white mr-4 border-1 rounded-full py-2"> Add</button>
            <button   className="bg-blue-800 text-white mr-4 border-1 rounded-full py-2"> Group with AND </button>
            <button   className="bg-blue-800 text-white mr-4 border-1 rounded-full py-2"> Group with OR</button>
        </div>
    )
}