import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useNotification } from "../contex/notificationContex";


export const NotificationSnackBar: React.FC = () => {

    const {open, severity, message, closeNotification} = useNotification();


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if(reason === 'clickaway'){
            return;
        }
        closeNotification();
    }
    return(
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={5000}
            onClose={closeNotification}
            >
                <Alert
                onClose={handleClose}
                variant={'filled'}
                severity={severity}
                sx={{
                    width: '100%',
                }}
                >
                    {message}
                </Alert>
            </Snackbar>
    )
}