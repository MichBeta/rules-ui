"use client";
import {Provider} from "react-redux";
import {store} from "./store";
import Navbar from "@/components/navbar";
import {usePathname} from 'next/navigation';
import {Main} from "@/components/main";
import {ThemeProvider} from "@material-tailwind/react";

export function Providers({children}: { children: React.ReactNode }) {
    const router = usePathname()
    const isLoginPage = router.includes("login")
    return <Provider store={store}>
        <ThemeProvider>
            {!isLoginPage && <>
                <Navbar/>
                <Main>
                    {children}
                </Main>
            </>
            }
            {isLoginPage && children}
        </ThemeProvider>
    </Provider>;
}