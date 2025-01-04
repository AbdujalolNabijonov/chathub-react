import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";


interface SocketInterface {
    socket: Socket,
    socketRoom: string
    setSocketRoom: any
    setUpdateSocket: any
    updateSocket:Date
}

export const SocketContext = createContext<SocketInterface | undefined>(undefined);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error("Socket within Provider")
    return context
}