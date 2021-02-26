import React from "react";
import { Input, Textarea } from "../../../utils/FormСontrollers";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../../../utils/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../../../styles/Form.module.css";
import { getProjectViewed } from "../../../../redux/selectors/projectSelector";
import { getUserToken } from "../../../../redux/selectors/authSelector";
import { useDispatch, useSelector } from "react-redux";
import { updateDeviceThunkCreator } from "../../../../redux/reducers/deviceReducer";

export const UpdateDeviceForm = ({ id, defaultValues }) => {

    const dispatch = useDispatch();

    const project = useSelector(getProjectViewed).id;
    const token = useSelector(getUserToken);


    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Name is a required field"),
        state: yup
            .string(),
        states: yup
            .string()
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

    const onSubmit = (deviceForm) => {
        dispatch(updateDeviceThunkCreator(deviceForm, token, project, id, setError))
    };

    return (
        <form onSubmit={handleSubmit((deviceForm) => onSubmit(deviceForm), onError)}>

            <Input register={register} type="text" placeholder="Name" name="name" error={errors.name} />

            <Input register={register} type="text" placeholder="Default state" name="state" error={errors.state} />

            <Textarea register={register} type="text" placeholder="States" name="states" error={errors.states} />

            <button className={styles.btn}>Update</button>
        </form >
    )
}

