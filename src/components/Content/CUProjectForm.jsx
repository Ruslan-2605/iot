import React from "react";
import { InputController, TextareaController } from "../utils/FormСontrollers";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../utils/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../styles/Form.module.css";

export const CUProjectForm = (props) => {

    const { onSubmit, btnText } = props;

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Name is a required field")
            .min(5, "Name size is less than 5")
            .max(16, "Name max size is 16"),
        title: yup
            .string()
            .max(128, "Title max size is 128")
    });

    const { handleSubmit, control, setError, errors } = useForm({
        defaultValues: {
            "name": "",
            "title": "",
        },
        resolver: yupResolver(schema),
    })

    const onError = (e) => {
        setErrorForm(e, setError);
    };

    return (
        <form onSubmit={handleSubmit((projectData) => onSubmit(projectData, setError), onError)}>

            <InputController control={control} type="text" placeholder="Name" name="name" error={errors.name} />

            <TextareaController control={control} type="text" placeholder="Title" name="title" error={errors.title} />

            <button className={styles.btn}>{btnText}</button>
        </form >
    )
}