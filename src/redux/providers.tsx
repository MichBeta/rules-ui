"use client";
import {Provider} from "react-redux";
import {store} from "./store";
import Navbar from "@/components/navbar";
import {usePathname} from 'next/navigation';
import {Main} from "@/components/main";

export function Providers({children}: { children: React.ReactNode }) {
    const router = usePathname()
    const isLoginPage = router.includes("login")
    return <Provider store={store}>
        <div>
            {!isLoginPage && <>
                <Navbar/>
                <Main>
                    {children}
                </Main>
            </>
            }
            {isLoginPage && children}
        </div>
    </Provider>;
}