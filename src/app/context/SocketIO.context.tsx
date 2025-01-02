import React, { ReactNode, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { TCP_URL } from "../../libs/config";
import { SocketContext } from "../hooks/useSocket";
import { useGlobals } from "../hooks/useGlobals";
import Cookies from "universal-cookie";

export const SocketContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const socketRef = useRef<Socket | null>(null)
    const [socketRoom, setSocketRoom] = useState<string>("")
    const { authMember } = useGlobals()
    const cookie = new Cookies()

    useEffect(() => {
        console.log("authenticated")
        const headers = { authorization: cookie.get("accessToken") ?? null }
        socketRef.current = io(TCP_URL, { extraHeaders: headers })
        console.log("=== SOCKET CONNECTION ===")
        return () => {
            socketRef.current?.disconnect()
        }
    }, [authMember,socketRoom])
    return (
        <SocketContext.Provider value={{ socketRef, socketRoom, setSocketRoom }}>
            {children}
        </SocketContext.Provider>
    )
}