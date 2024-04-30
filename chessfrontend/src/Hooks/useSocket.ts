import { useEffect, useState } from "react";

export const useSocket = () =>{
    const WS_URL = "ws://localhost:8080";
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() =>{
        const ws = new WebSocket(WS_URL);
        ws.onopen = () =>{
            // console.log("connected");
            setSocket(ws);
        }

        ws.onclose = () =>{
            // console.log("disconnected");
            setSocket(null);
        }

        return ()=>{ws.close();}
    },[])


    return socket;
};