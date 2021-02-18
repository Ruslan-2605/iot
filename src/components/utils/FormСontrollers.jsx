import React, { useState } from "react";
import styles from "../../styles/Form.module.css";

export const Input = ({ register, name, type, value = "blabla", placeholder = null, error = null }) => {
    debugger

    const [state, setState] = useState(value);

    const onChange = (e) => {
        setState(e.target.value);
    };

    return (
        <div>
            <input className={styles.input}
                ref={register}
                value={state}
                onChange={onChange}
                type={type}
                name={name}
                placeholder={placeholder}
            />
            <div className={styles.error}>{error && error.message}</div>
        </div >
    )
}

export const Textarea = ({ register, name, type, placeholder = null, error = null }) => {

    // const [state, setState] = useState(value);

    // const onChange = (e) => {
    //     setState(e.target.value);
    // };

    return (
        <div>
            <textarea className={styles.textarea}
                ref={register}
                type={type}
                name={name}
                placeholder={placeholder}
            // value={state}
            // onChange={onChange}
            />
            <div className={styles.error}>{error && error.message}</div>
        </div >
    )
}