import React, { useState } from "react";
import { SignUpReactHookForm } from "./SignUpReactHookForm";
import { SignInReactHookForm } from "./SignInReactHookForm";
import styles from "../../styles/Login.module.css";
import { signInThunkCreator, signUpThunkCreator } from "../../redux/authReducer";
import { connect } from "react-redux";

export const LoginForm = (props) => {
    const [isSignUp, setSignUp] = useState(false)
    return (
        <div className={styles.login}>
            {isSignUp ? <SignUpReactHookForm signUpThunkCreator={props.signUpThunkCreator}
                setSignUp={setSignUp} /> : <SignInReactHookForm signInThunkCreator={props.signInThunkCreator} setSignUp={setSignUp} />}
        </div>
    );
};
let mapStateToProps = (state) => {
    return {}
};

export const Login = connect(mapStateToProps, {
    signInThunkCreator,
    signUpThunkCreator,
})(LoginForm);



