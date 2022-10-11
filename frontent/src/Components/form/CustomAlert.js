import React from "react";
import { Alert } from "react-bootstrap";

const CustomAlert = ({
    className,
    variant,
    alertMsg,
    setAlertMsg,
    error
}) => {
    return(
        <>
            <Alert
            className={className}
            variant={variant}
            onClose={() => setAlertMsg(false)}
            dismissible
            >{alertMsg}</Alert>
        </>
    )
}

export {
    CustomAlert
}