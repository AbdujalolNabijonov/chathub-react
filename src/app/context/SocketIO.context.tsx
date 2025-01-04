import React, { ReactNode, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { TCP_URL } from "../../libs/config";
import { SocketContext } from "../hooks/useSocket";
import { useGlobals } from "../hooks/useGlobals";
import Cookies from "universal-cookie";

export const SocketContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const socketRef = useRef<Socket | null>(null)
    const initialSocketRoom = localStorage.getItem("socketRoom") ? JSON.parse(localStorage.getItem("socketRoom") as string) : ""
    const [socketRoom, setSocketRoom] = useState<string>(initialSocketRoom)
    const [updateSocket, setUpdateSocket] = useState<Date>(new Date())
    const cookie = new Cookies()

    useEffect(() => {
        const token = cookie.get("accessToken")
        socketRef.current = io(TCP_URL, { extraHeaders: token ? { authorization: `Barear ${token}` } : { authoraztion: '' } })
        console.log("=== SOCKET CONNECTION ===")
        return () => {
            socketRef.current?.disconnect()
        }
    }, [updateSocket])
    return (
        <SocketContext.Provider value={{ socket: socketRef.current as Socket, socketRoom, setSocketRoom, setUpdateSocket }}>
            {children}
        </SocketContext.Provider>
    )
}