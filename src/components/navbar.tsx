"use client";
import {useState} from 'react';
import {FaBars, FaHome, FaUser, FaEnvelope, FaRegNewspaper} from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image'
import {FiPower} from "react-icons/fi";
import {RiMessage2Line} from "react-icons/ri";
import {BiBookBookmark} from "react-icons/bi";
import { useRouter } from 'next/navigation'
import axios from "axios";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {toggleSidebar} from "@/redux/features/sidebarSlice";

export default function Navbar() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const logout = async () => {
        try{
            const response = await axios.post("/api/auth/logout");
            if (response.status === 200){
                router.push("/login");
            }
        }catch (error){
            console.log(error);
        }
    }
    return (
        <div className="relative h-[40px] bg-gradient-to-r from-[rgb(50,37,94)] to-[rgb(104,54,139)]">
            <button className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white" onClick={() => dispatch(toggleSidebar())}>
                <FaBars />
            </button>
            <button className="absolute top-4 right-60 transform -translate-y-1/2 text-white hover:top-0 hover:animate-bounce">
                <Image src="/help-center.png" width={118} height={32} alt={"Help Center"} />
            </button>
            <div className="grid grid-cols-4 gap-4 absolute top-5 right-9 transform -translate-y-1/2 text-white text-lg">
                <button>
                    <RiMessage2Line />
                </button>
                <button>
                    <BiBookBookmark />
                </button>
                <button>
                    <FaRegNewspaper />
                </button>
                <button onClick={logout}>
                    <FiPower />
                </button>
            </div>
            <h1 className="absolute top-1/2 left-16 transform -translate-y-1/2 text-white text-2xl font-stolzl">Qapter Compliance</h1>
        </div>
    )
}

