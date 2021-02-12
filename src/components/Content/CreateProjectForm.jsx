import React from "react";
import styles from "../../styles/Content.module.css";
import { InputController } from "../utils/InputСontroller";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../utils/SetErrorForm";
import AddIcon from '@material-ui/icons/Add';


export const CreateProjectForm = (props) => {
    const { token, username, page, projectLength, createProjectThunkCreator } = props;
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

            <button><AddIcon /></button>
        </form >
    )
}