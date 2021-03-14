import React from "react";
import { Input, Textarea } from "../../../utils/FormСontrollers";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../../../utils/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../../../styles/Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "../../../../redux/selectors/authSelector";
import { getProjectViewed } from "../../../../redux/selectors/projectsSelector";
import { updateProjectThunkCreator } from "../../../../redux/reducers/projectsReducer";

export const UpdateProjectForm = (props) => {

    const dispatch = useDispatch()
    const token = useSelector(getUserToken)
    const project = useSelector(getProjectViewed)
    const id = project.id

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
        reValidateMode: "onSubmit",
        defaultValues: {
            "name": "",
            "title": ""
        },
        resolver: yupResolver(schema),
    })

    const onError = (e) => {
        setErrorForm(e, setError);
    };

    const onSubmit = (projectData) => {
        dispatch(updateProjectThunkCreator(projectData, token, id, setError));
    };

    return (
        <form onSubmit={handleSubmit((projectData) => onSubmit(projectData), onError)}>

            <Input register={register} type="text" placeholder="Name" name="name" error={errors.name} />

            <Textarea register={register} type="text" placeholder="Title" name="title" error={errors.title} />

            <button className={styles.btn}>Update</button>
        </form >
    )
}