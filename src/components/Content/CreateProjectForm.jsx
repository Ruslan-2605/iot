import React from "react";
import styles from "../../styles/Content.module.css";
import { InputController } from "../utils/InputСontroller";
import { useForm } from "react-hook-form";
import { Button } from 'antd';
import { setErrorForm } from "../utils/SetErrorForm";
import { Alert } from "@material-ui/lab";


export const CreateProjectForm = ({ token, username, page, projectLength, createProjectThunkCreator, setCreateForm }) => {

    const { handleSubmit, control, setError, errors } = useForm({
        defaultValues: {
            "name": "",
            "title": "",
        },
    })

    const onSubmit = (projectData) => {
        createProjectThunkCreator(projectData, token, username, page, projectLength, setError);
    };

    const onError = (e) => {
        setErrorForm(e, setError);
    };

    return (
        <form onSubmit={handleSubmit((projectData) => onSubmit(projectData), onError)}>
            <b>Create Project</b><br />

            <b>Name: </b><br />
            <InputController control={control} type="text" name="name" inputError={errors.name} />

            <b>Title: </b><br />
            <InputController control={control} type="text" name="title" inputError={errors.title} />

            <Button type="primary" htmlType="submit">Create</Button>
            <Button type="primary" onClick={() => setCreateForm(false)}>Close</Button>
        </form >
    )
}