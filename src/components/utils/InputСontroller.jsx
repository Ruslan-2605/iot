import React from "react";
import { Controller } from "react-hook-form";
import { Alert } from '@material-ui/lab';
import styles from "../../styles/Login.module.css";
import { Input } from 'antd';

export const InputController = ({ control, name, type, inputError = null }) => {
    return (
        <div>
            <Controller
                control={control}
                name={name}
                render={({ onChange, onBlur, value }) => (
                    <Input
                        type={type}
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                    />
                )}
            />
            {inputError &&
                <Alert severity="error">
                    {inputError.message}
                </Alert>
            }
        </div >
    )
}
