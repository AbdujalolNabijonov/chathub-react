import { createContext, useContext } from "react";
import { Member } from "../../libs/types/member";

interface GlobalInterface {
    authMember: Member | null,
    setAuthMember: any
}

export const GlobalContext = createContext<GlobalInterface | undefined>(undefined);

export const useGlobals = () => {
    const context = useContext(GlobalContext)
    if(!context) throw new Error("Within Provider")
    return context
}