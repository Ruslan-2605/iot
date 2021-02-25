import React from "react";
import { Input, Textarea } from "../../../utils/FormСontrollers";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../../../utils/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../../../styles/Form.module.css";

export const UpdateProjectForm = ({ updateProjectThunkCreator, token, id, defaultValues }) => {

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

    const { handleSubmit, register, setError, errors } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            ...defaultValues
        },
        resolver: yupResolver(schema),
    })

    const onError = (e) => {
        setErrorForm(e, setError);
    };

    const onSubmit = (projectData) => {
        updateProjectThunkCreator(projectData, token, id, setError);
    };

    return (
        <form onSubmit={handleSubmit((projectData) => onSubmit(projectData), onError)}>

            <Input register={register} type="text" placeholder="Name" name="name" error={errors.name} />

            <Textarea register={register} type="text" placeholder="Title" name="title" error={errors.title} />

            <button className={styles.btn}>Update</button>
        </form >
    )
}