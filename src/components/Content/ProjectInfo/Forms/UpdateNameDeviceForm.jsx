import React from "react";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../../../utils/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../../../styles/DeviceModalEditMode.module.css";
import AddIcon from '@material-ui/icons/Add';
import ErrorIcon from '@material-ui/icons/Error';
import LoopIcon from '@material-ui/icons/Loop';

export const UpdateNameDeviceForm = ({ name, deviceForm, setDeviceForm }) => {
    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Name is a required field")
            .min(2, "Name size is less than 2")
            .max(16, "Name max size is 16"),
    });

    const { handleSubmit, register, setError, errors } = useForm({
        reValidateMode: "onSubmit",
        defaultValues: {
            "name": name,
        },
        resolver: yupResolver(schema),
    })

    const onError = (e) => {
        setErrorForm(e, setError);
    };

    const onSubmit = (form) => {
        setDeviceForm({ ...deviceForm, "name": form.name })
    };

    return (
        <>
            <form className={styles.udpateNameForm} onSubmit={handleSubmit((form) => onSubmit(form), onError)}>
                <input
                    className={styles.updateNameInput}
                    ref={register}
                    name="name"
                    placeholder="Write new name"
                />
                <button className={styles.updateNameIcon}><LoopIcon /></button>
            </form >


            {errors.name &&
                <div className={styles.error}>
                    <p>{errors.name.message}</p>
                    <p><ErrorIcon /></p>
                </div>
            }

        </>
    )
}

