import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getIsAuth } from "../redux/selectors/authSelector";

export const withAuthRedirect = (Component) => {
    const AuthRedirect = (props) => {
        const isAuth = useSelector(getIsAuth);
        return (
            <>
                {!isAuth ? <Redirect to={"/"} />
                    :
                    <Component {...props} />
                }
            </>
        )
    }
    return AuthRedirect;
};
