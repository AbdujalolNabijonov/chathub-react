import React, { ReactNode, useState } from "react"
import { GlobalContext } from "../hooks/useGlobals";
import Cookies from "universal-cookie";
import { Member } from "../../libs/types/member";

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const member = localStorage.getItem("member") ? JSON.parse(localStorage.getItem("member") as string) : null
    const [authMember, setAuthMember] = useState<Member | null>(member);
    const cookie = new Cookies()
    if (!cookie.get("accessToken")) localStorage.removeItem("member")

    return (
        <GlobalContext.Provider value={{ authMember, setAuthMember }}>
            {children}
        </GlobalContext.Provider>
    )
}