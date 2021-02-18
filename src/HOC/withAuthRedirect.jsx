import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getIsAuth } from "../redux/selectors/authSelector";

const mapStateToProps = (state) => ({
    isAuth: getIsAuth(state),
});

export const withAuthRedirect = (Component) => {
    const AuthRedirect = (props) => {
        return (
            <>
                {!props.isAuth ? <Redirect to={"/"} />
                    :
                    <Component {...props} />
                }
            </>
        )
    }
    const authRedirectComponent = connect(
        mapStateToProps,
        {}
    )(AuthRedirect);
    return authRedirectComponent;
};
