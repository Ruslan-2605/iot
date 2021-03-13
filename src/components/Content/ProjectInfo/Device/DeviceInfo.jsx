import React from "react";
import styles from "../../../../styles/Device.module.css";
import { useDispatch } from "react-redux";
import { setStateDeviceThunkCreator } from "../../../../redux/reducers/thingsReducer";
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

export const DeviceInfo = (thing) => {

    const dispatch = useDispatch();

    const states = thing.thing.entity.states;
    const activeState = thing.thing.entity.state;
    const token = thing.thing.entity.token;

    return (
        <div className={styles.states}>
            {
                states.map((state) => {

                    const onClick = async () => {
                        const status = await dispatch(setStateDeviceThunkCreator(state, token))
                        // Если 404 ошибка нужно добавить вывод еррор
                    }

                    return (
                        <div key={state} className={styles.state} onClick={onClick}>
                            <p>{state}</p>
                            <p>{state === activeState && <CheckOutlinedIcon />}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}