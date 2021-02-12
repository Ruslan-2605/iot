import React from "react";
import { Controller } from "react-hook-form";
import styles from "../../styles/Login.module.css";

export const InputController = ({ control, name, type, placeholder, inputError = null }) => {
    return (
        <div>
            <Controller
                control={control}
                name={name}
                render={({ onChange, onBlur, value }) => (
                    <input className={styles.input}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                    />
                )}
            />
            <div className={styles.error}>{inputError && inputError.message}</div>
        </div >
    )
}
