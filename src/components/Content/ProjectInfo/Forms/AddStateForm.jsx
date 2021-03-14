import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../../../utils/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../../../styles/Device.module.css";
import AddIcon from '@material-ui/icons/Add';
import ErrorIcon from '@material-ui/icons/Error';

export const AddStateForm = ({ states, setStates }) => {
    const schema = yup.object().shape({
        state: yup
            .string()
            .min(2, "State size is less than 2")
            .max(16, "State max size is 16")
            .test('duplicates', 'Found duplicates string in states', (value) => {
                let countError = 0;
                states.map((state) => {
                    if (state === value) {
                        countError += 1;
                        console.log(countError)
                    }
                })
                if (countError > 0) {
                    return false
                } else {
                    return true
                }
            }),
    });

    const { handleSubmit, register, setError, errors } = useForm({
        reValidateMode: "onSubmit",
        defaultValues: {
            "state": "",
        },
        resolver: yupResolver(schema),
    })

    const onError = (e) => {
        setErrorForm(e, setError);
    };

    const onSubmit = (form) => {
        const statesCopy = [...states]
        statesCopy.push(form.state);
        setStates(statesCopy);
    };

    return (
        <>
            <form className={styles.udpateForm} onSubmit={handleSubmit((form) => onSubmit(form), onError)}>

                <input
                    className={styles.addInput}
                    ref={register}
                    name="state"
                    placeholder="Add new state"
                />

                <button className={styles.addIcon}><AddIcon /></button>

            </form >


            {errors.state &&
                <div className={styles.error}>
                    <p>{errors.state.message}</p>
                    <p><ErrorIcon /></p>
                </div>
            }

        </>
    )
}

