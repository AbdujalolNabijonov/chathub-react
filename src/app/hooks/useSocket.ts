import { createContext, useContext } from "react";


interface SocketInterface {
    socketRef: any,
    socketRoom: string
    setSocketRoom: any
}

export const SocketContext = createContext<SocketInterface | undefined>(undefined);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if(!context) throw new Error("Socket within Provider")
    return context
}