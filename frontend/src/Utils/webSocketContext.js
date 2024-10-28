import React,{useContext,createContext} from "react";
import useWebsocket from "react-use-websocket";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({userId,children}) => {
    const socketUrl = `ws://localhost:4000?userId=${userId}`;
    const {sendMessage,lastMessage} = useWebsocket(socketUrl,{
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        onClose: (event) => {
            console.log('WebSocket connection closed:', event);
        },
        onError: (event) => {
            console.log('WebSocket error:', event);
        },
        shouldReconnect: (closeEvent) => true,
    });

    return (
        <WebSocketContext.Provider value={{sendMessage,lastMessage}}>
            {children}
        </WebSocketContext.Provider>
    );
}

export const useWebSocket= () => useContext(WebSocketContext);