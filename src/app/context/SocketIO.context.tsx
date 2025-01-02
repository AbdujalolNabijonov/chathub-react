import React, { ReactNode } from "react";
import { io } from "socket.io-client";
import { API_URL, TCP_URL } from "../../libs/config";
import { SocketContext } from "../hooks/useSocket";

export const SocketContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const socket = io(TCP_URL);
    console.log("=== SOCKET CONNECTION ===")
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}