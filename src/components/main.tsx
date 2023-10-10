"use client";
import Sidebar from "@/components/sidebar";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";

export function Main({children}: { children: React.ReactNode }) {
    const isExpanded = useAppSelector(state => state.sidebarReducer.isExpanded);
    return <div className="flex h-[calc(100vh-40px)]">
        <div className={`transition-all duration-500 ease-in-out ${isExpanded?"w-16":"w-64"} bg-[rgb(27,30,39)]`}>
            <Sidebar/>
        </div>
        <div className="flex flex-col flex-grow p-6 bg-gray-100">
            {children}
        </div>
    </div>;
}