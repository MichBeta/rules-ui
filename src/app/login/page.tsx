"use client";
import Image from "next/image";
import {FaRegUser} from "react-icons/fa";
import {BiLockAlt} from "react-icons/bi";
import {setUsername, setPassword} from "@/redux/features/credentialSlice";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import React from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
import {Toaster, toast} from "sonner";
import {MdNoEncryptionGmailerrorred} from "react-icons/md";

function LoginPage() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const credential = useAppSelector(state => state.credentialReducer)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post('/api/auth/login', credential).then(res => {
            if (res.status === 200) {
                router.push('/')
            }
        }).catch(err => {
            console.log(err)
            toast.error("Error", {
                description: err.response.data,
                position: "top-center",
                icon: <MdNoEncryptionGmailerrorred className="text-red-500"/>,
            })
        })
    }

    const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        if (name === 'username') {
            dispatch(setUsername(value))
        } else if (name === 'password') {
            dispatch(setPassword(value))
        }
    }

    return (
        <div className="flex h-screen">
            <div className="w-4/12 h-full bg-white-500">
                <div className="flex flex-col h-full">
                    <div className="flex flex-col pl-14 pt-5 justify-center">
                        <div className="text-6xl font-stolzl">Qapter Compliance</div>
                        <div className="text-gradient pt-11 text-4xl font-bold">
                            Vehicle Estimation, Smarter and Faster
                        </div>
                        <form className="flex flex-col space-y-4 p-4 m-2" onSubmit={handleSubmit}>
                            <div className="flex items-center border-gray-300 border">
                                <span className="bg-white px-3 py-3 rounded-l-md text-gray-500"><FaRegUser/></span>
                                <input
                                    type="text"
                                    className="block w-full border-gray-300 focus:border-blue-500 rounded-r-md p-2 bg-[#E8F0FE]"
                                    placeholder="username"
                                    name="username"
                                    onChange={handleCredentialChange}
                                />
                            </div>

                            <div className="flex items-center border-gray-300 border">
                                <span className="bg-white px-3 py-3 rounded-l-md text-gray-500"><BiLockAlt/></span>
                                <input
                                    type="password"
                                    className="block w-full border-gray-300 focus:border-blue-500 rounded-r-md p-2 bg-[#E8F0FE]"
                                    placeholder="password"
                                    name="password"
                                    onChange={handleCredentialChange}
                                />
                            </div>
                            <button className="bg-[#194FA1] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded" >
                                LOG IN
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-full h-full bg-green-500 relative">
                <Image
                    src="/login-image.png"
                    alt="Picture of the author"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <Toaster/>
        </div>
    )
}

export default LoginPage;