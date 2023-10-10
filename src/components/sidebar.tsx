"use client";
import Link from "next/link";
import {FaHome, FaUser} from "react-icons/fa";
import {IoSettingsSharp} from "react-icons/io5";
import {BiTestTube} from "react-icons/bi";
import {usePathname} from "next/navigation";
import React from "react";
import {useAppSelector} from "@/redux/hooks";
import Cookies from "js-cookie";

export default function Sidebar() {
    const isExpanded = useAppSelector(state => state.sidebarReducer.isExpanded);
    // ensure that the component is being hydrated correctly on the client side
    const [user, setUser] = React.useState<string>("");
    React.useEffect(() => {
        setUser(Cookies.get("credentials")?.split("|")[1] || "");
    }
    , []);
    return(
        <div className={`bg-[rgb(27,30,39)] `}>
            <ul>
                <li className="bg-[rgb(25,79,161)] border-b-[.5px] border-b-black">
                    <Link href="/" className="text-gray-400 flex items-center space-x-2 p-3 hover:text-white ml-3">
                        <FaUser />
                        <span className={`${isExpanded?'hidden':'inline-block'} text-white`}>{user}</span>
                    </Link>
                </li>
                <SidebarItem href="/">
                    <FaHome />
                    <span className={`${isExpanded?'hidden':'inline-block'}`}>Work List</span>
                </SidebarItem>
                <SidebarItem href="/settings">
                    <IoSettingsSharp />
                    <span className={`${isExpanded?'hidden':'inline-block'}`}>Settings</span>
                </SidebarItem>
                <SidebarItem href="/test">
                    <BiTestTube />
                    <span className={`${isExpanded?'hidden':'inline-block'}`}>Test</span>
                </SidebarItem>
            </ul>
        </div>
    )
}

function SidebarItem({href: href, children: children}: {href: string, children: React.ReactNode}) {
    const routerPathname = usePathname();
    return (
        <li className={`${routerPathname == href?"bg-[rgb(68,72,84)] border-s-[6px] border-s-[rgb(105,155,232)]":""} border-b-[.5px] border-b-black`}>
            <Link href={href} className={`${routerPathname == href?"ml-2":"ml-3"} text-gray-400 flex items-center space-x-2 p-3 hover:text-white`}>
                {children}
            </Link>
        </li>
    )
}