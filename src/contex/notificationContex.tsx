import { AlertColor } from "@mui/material";
import { createContext, useContext, useState } from "react";


interface NotificationContextType {
    message: string;
    severity: AlertColor;
    open: boolean;
    showNotification: (message: string, severity: AlertColor) => void;
    closeNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType|undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification context undefined');
    }
    return context;
}

interface NotificaionProviderProps {
    children: React.ReactNode;
}

export const NotificaionProvider: React.FC<NotificaionProviderProps> = ({children}) => {

    const [notification, setNotification] = useState<{message: string, severity: AlertColor, open: boolean}>({
        message: "",
        severity: 'warning',
        open: false,
    });
    const showNotification = (message: string, severity: AlertColor) => {
        setNotification(prevState => ({message: message, severity: severity, open: true}));
    }
    const closeNotification = () => {
        setNotification(prevState => ({
            ...prevState,
            open: false,
        }));
    }

    return(
        <NotificationContext.Provider value={{...notification, showNotification, closeNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}
