import React from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/Login.module.css";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { setErrorForm } from "../utils/SetErrorForm";
import { InputController } from "../utils/InputСontroller";
import { Alert } from "@material-ui/lab";
import { Button } from 'antd';
import { NavLink } from "react-router-dom";
import { signInThunkCreator } from "../../redux/authReducer";
import { connect } from "react-redux";

export const SignInReactHookForm = ({ signInThunkCreator }) => {

    const schema = yup.object().shape({
        username: yup
            .string()
            .required("Username is a required field")
            .min(5, "Username must be at least 5 characters")
            .max(16, "Username must be at most 16 characters"),
        password: yup
            .string()
            .required("Password is a required field")
            .min(8, "Password must be at least 8 characters")
            .max(32, "Password must be at most 32 characters")
    });

    const { handleSubmit, control, errors, setError } = useForm({
        defaultValues: {
            "password": "",
            "username": "",
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (authData) => {
        signInThunkCreator(authData, setError);
    };

    const onError = (e) => {
        setErrorForm(e, setError)
    };

    return (
        <form onSubmit={handleSubmit((authData) => onSubmit(authData), onError)} className={styles.form}>
            <b>LOGIN</b><br />

            <b>Username: </b><br />
            <InputController control={control} type="text" name="username" inputError={errors.username} />

            <b>Password: </b><br />
            <InputController control={control} type="password" name="password" inputError={errors.password} />
            {errors.error &&
                <Alert severity="error">
                    {errors.error.message}
                </Alert>}<br />
            <Button type="primary" htmlType="submit">SIGN IN</Button>
            <NavLink to="/login/signUp">SIGN UP</NavLink>
        </form >
    );
}

const mapStateToProps = (state) => {
    return {}
};
export const SignIn = connect(mapStateToProps, {
    signInThunkCreator,
})(SignInReactHookForm);

