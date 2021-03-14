import React from "react";
import { Input, Textarea } from "../../../utils/FormСontrollers";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../../../utils/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../../../styles/Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProjectViewed } from "../../../../redux/selectors/projectsSelector";
import { getUserToken } from "../../../../redux/selectors/authSelector";
import { createDeviceThunkCreator } from "../../../../redux/reducers/thingsReducer";


export const CreateDeviceForm = ({ thingsLength }) => {

    const dispatch = useDispatch();

    const token = useSelector(getUserToken);
    const project = useSelector(getProjectViewed).id;

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Name is a required field")
            .min(2, "Name size is less than 2")
            .max(16, "Name max size is 16"),
        state: yup
            .string()
            .min(2, "State size is less than 2")
            .max(16, "State max size is 16"),
        states: yup
            .string()
    });

    const { handleSubmit, register, setError, errors } = useForm({
        reValidateMode: "onSubmit",
        defaultValues: {
            "name": "",
            "state": "",
            "states": ""
        },
        resolver: yupResolver(schema),
    })

    const onError = (e) => {
        setErrorForm(e, setError);
    };

    const onSubmit = (deviceForm) => {
        dispatch(createDeviceThunkCreator(deviceForm, project, token, thingsLength, setError))
    };

    return (
        <form onSubmit={handleSubmit((deviceForm) => onSubmit(deviceForm), onError)}>

            <Input register={register} type="text" placeholder="Name" name="name" error={errors.name} />

            <Input register={register} type="text" placeholder="Default state" name="state" error={errors.state} />

            <Textarea register={register} type="text" placeholder="States" name="states" error={errors.states} />

            <button className={styles.btn}>Create</button>
        </form >
    )
}

