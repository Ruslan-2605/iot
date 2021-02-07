import React from "react";
import styles from "../../styles/Content.module.css";
import { InputController } from "../utils/InputСontroller";
import { useForm } from "react-hook-form";
import { Button } from 'antd';
import { setErrorForm } from "../utils/SetErrorForm";

export const UpdateProjectForm = ({ token, username, id, page, updateProjectThunkCreator, setIsUpdate }) => {

    const { handleSubmit, control, setError, errors } = useForm({
        defaultValues: {
            "name": "",
            "title": "",
        },
    })

    const onSubmit = (projectData) => {
        updateProjectThunkCreator(projectData, token, id, username, page, setError);
    };

    const onError = (e) => {
        setErrorForm(e, setError);
    };

    return (
        <form onSubmit={handleSubmit((projectData) => onSubmit(projectData), onError)}>
            <b>Update Project</b><br />

            <b>Name: </b><br />
            <InputController control={control} type="text" name="name" inputError={errors.name} />

            <b>Title: </b><br />
            <InputController control={control} type="text" name="title" inputError={errors.title} />

            <Button type="primary" htmlType="submit">Update</Button>
            <Button type="primary" onClick={() => setIsUpdate(false)}>Close</Button>
        </form >
    )
}