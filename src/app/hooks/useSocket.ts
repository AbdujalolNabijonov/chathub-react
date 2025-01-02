import { createContext,useContext } from "react";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket|undefined>(undefined);

export const useSocket = ()=>{
    const context = useContext(SocketContext);
    if(!context) throw new Error("Context within Provider");
    return context
}