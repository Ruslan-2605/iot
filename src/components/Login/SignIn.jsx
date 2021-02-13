import React from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/Form.module.css";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { setErrorForm } from "../utils/SetErrorForm";
import { InputController } from "../utils/FormСontrollers";
import { signInThunkCreator } from "../../redux/reducers/authReducer";
import { connect } from "react-redux";

export const SignInForm = ({ signInThunkCreator }) => {

    const schema = yup.object().shape({
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

    const { handleSubmit, control, errors, setError } = useForm({
        defaultValues: {
            "password": "",
            "username": "",
        },
        resolver: yupResolver(schema),
    })

    const onSubmit = (authData, setError) => {
        signInThunkCreator(authData, setError);
    };

    const onError = (e) => {
        setErrorForm(e, setError)
    };

    return (
        <form onSubmit={handleSubmit((authData) => onSubmit(authData, setError), onError)} className={styles.form}>

            <InputController control={control} type="text" name="username" placeholder="Username" error={errors.username} />

            <InputController control={control} type="password" name="password" placeholder="Password" error={errors.password} />

            <div className={styles.error}>{errors.error && errors.error.message}</div>

            <button className={styles.btn}>Sign In</button>
        </form >
    );
}

const mapStateToProps = (state) => {
    return {}
};
export const SignIn = connect(mapStateToProps, {
    signInThunkCreator,
})(SignInForm);

