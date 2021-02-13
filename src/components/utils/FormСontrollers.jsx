import React from "react";
import { Controller } from "react-hook-form";
import styles from "../../styles/Form.module.css";

export const InputController = ({ control, name, type, placeholder = null, error = null }) => {
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
            <div className={styles.error}>{error && error.message}</div>
        </div >
    )
}

export const TextareaController = ({ control, name, type, placeholder = null, error = null }) => {
    return (
        <div>
            <Controller
                control={control}
                name={name}
                render={({ onChange, onBlur, value }) => (
                    <textarea className={styles.textarea}
                        type={type}
                        placeholder={placeholder}
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                    />
                )}
            />
            <div className={styles.error}>{error && error.message}</div>
        </div >
    )
}