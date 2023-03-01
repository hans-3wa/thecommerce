import React from "react";
import {Navigate} from "react-router-dom";

export const Authmiddleware = (props) => {
    if (!localStorage.getItem("jwt")) {
        return (
            <Navigate to={"/login"}/>
        );
    }
    return (
        <>
            {props.children}
        </>);
};
