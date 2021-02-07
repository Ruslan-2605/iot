import React from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/Login.module.css";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { setErrorForm } from "../utils/SetErrorForm";
import { InputController } from "../utils/InputСontroller";
import { Alert } from "@material-ui/lab";
import { Button } from 'antd';
import { signUpThunkCreator } from "../../redux/reducers/authReducer";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

export const SignUpForm = ({ signUpThunkCreator }) => {

    const schema = yup.object().shape({
        email: yup
            .string()
            .required("Email is a required field")
            .email("Not valid Email"),
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

    const { control, handleSubmit, errors, setError } = useForm({
        defaultValues: {
            "email": "",
            "password": "",
            "username": "",
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (authData) => {
        signUpThunkCreator(authData, setError)
    }

    const onError = (e) => {
        setErrorForm(e, setError)
    };

    return (
        <form onSubmit={handleSubmit((authData) => onSubmit(authData), onError)} className={styles.form}>
            <b>LOGIN</b><br />

            <b>Email: </b><br />
            <InputController control={control} type="text" name="email" inputError={errors.email} />

            <b>Username: </b><br />
            <InputController control={control} type="text" name="username" inputError={errors.username} />

            <b>Password: </b><br />
            <InputController control={control} type="password" name="password" inputError={errors.password} />
            {errors.error &&
                <Alert severity="error">
                    {errors.error.message}
                </Alert>}<br />
            <Button type="primary" htmlType="submit">SIGN UP</Button>
            <NavLink to="/login/signIn">SIGN IN</NavLink>
        </form >
    );
}

const mapStateToProps = (state) => {
    return {}
};
export const SignUp = connect(mapStateToProps, {
    signUpThunkCreator,
})(SignUpForm);
