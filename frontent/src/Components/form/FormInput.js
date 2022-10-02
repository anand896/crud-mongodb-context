import React, { useRef } from "react";
import { Form } from "react-bootstrap";

const TxtInput = ({
    type,
    defaultValue,
    name,
    placeholder,
    onChange,
    error,
    className,
    disabled = false
}) => {
    return(
        <>
            <Form.Control
                type={type}
                defaultValue={defaultValue}
                name={name}
                className={className}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
            />
            { error ? <p>{error}</p> : '' }
        </>
    )
}


export {
    TxtInput
}