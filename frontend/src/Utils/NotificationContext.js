import React,{useContext,createContext,useState} from "react";

const NotificationContext = createContext();

export const useNotification=()=> useContext(NotificationContext);

export const NotificationProvider = ({children})=>{
    const [notification,setNotification]=useState(null);

    const showNotification=(message,type='success',duration=3000)=>{
        setNotification({message,type});

        setTimeout(()=>{
            setNotification(null);
        },duration);
    }

    const clearNotification=()=>{
        setNotification(null);
    }

    return (
        <NotificationContext.Provider value={{notification,showNotification,clearNotification}}>
            {children}
        </NotificationContext.Provider>
    );

}
