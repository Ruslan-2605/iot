import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../styles/Switch.module.css";
import { setStateDeviceThunkCreator } from "../../redux/reducers/thingsReducer";

export const Switch = ({ state, token, defaultIsActive }) => {

    const dispatch = useDispatch();

    const [isActive, setActive] = useState(defaultIsActive);

    const onClick = async () => {
        if (!isActive) {
            const status = await dispatch(setStateDeviceThunkCreator(state, token))
            if (status === 204) {
                setActive(true);
            }
        }
    }

    return (
        <label className={styles.switch}>
            <input name="hello" type="radio" checked={isActive} onClick={onClick} />
            <span className={styles.slider + " " + styles.round}></span>
        </label >
    );
}
