import React from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/Login.module.css";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { setErrorForm } from "../utils/SetErrorForm";
import { InputController } from "../utils/InputСontroller";
import { signUpThunkCreator } from "../../redux/reducers/authReducer";
import { connect } from "react-redux";

export const SignUpForm = ({ signUpThunkCreator }) => {

    const schema = yup.object().shape({
        email: yup
            .string()
            .required("Email is a required field")
            .email("Not valid Email"),
        username: yup
            .string()
            .required("Username is a required field")
            .min(5, "Username size is less than 5")
            .max(16, "Username max size is 16"),
        password: yup
            .string()
            .required("Password is a required field")
            .min(8, "Password size is less than 8")
            .max(32, "Password max size is 32")
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
            <div className={styles.title}>Login</div>

            <InputController control={control} type="text" name="email" placeholder="email" inputError={errors.email} />

            <InputController control={control} type="text" name="username" placeholder="username" inputError={errors.username} />

            <InputController control={control} type="password" name="password" placeholder="password" inputError={errors.password} />

            <div className={styles.error}>{errors.error && errors.error.message}</div>

            <button className={styles.btn}>Sign Up</button>
        </form >
    );
}

const mapStateToProps = (state) => {
    return {}
};
export const SignUp = connect(mapStateToProps, {
    signUpThunkCreator,
})(SignUpForm);
