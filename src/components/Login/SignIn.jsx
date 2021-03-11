import React from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/Form.module.css";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { setErrorForm } from "../utils/SetErrorForm";
import { Input } from "../utils/FormСontrollers";
import { signInThunkCreator } from "../../redux/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";


export const SignIn = ({ setSignIn }) => {

    const dispatch = useDispatch();
    const history = useHistory();

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

    const { handleSubmit, register, errors, setError } = useForm({
        reValidateMode: "onChange",
        defaultValues: {
            "password": "",
            "username": "",
        },
        resolver: yupResolver(schema),
    })

    const onSubmit = async (authData) => {
        const status = await dispatch(signInThunkCreator(authData, setError));
        if (status === 200) {
            history.push("/dashboard");
            setSignIn(false);
        }
    };

    const onError = (e) => {
        setErrorForm(e, setError)
    };

    return (
        <form onSubmit={handleSubmit((authData) => onSubmit(authData), onError)} className={styles.form}>

            <Input register={register} type="text" name="username" placeholder="Username" error={errors.username} />

            <Input register={register} type="password" name="password" placeholder="Password" error={errors.password} />

            <div className={styles.error}>{errors.error && errors.error.message}</div>

            <button className={styles.btn}>Sign In</button>
        </form >
    );
}
