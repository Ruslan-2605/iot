import React, { useState } from "react";
import styles from "../../../../styles/Device.module.css";
import { useDispatch } from "react-redux";
import { setStateDeviceThunkCreator } from "../../../../redux/reducers/thingsReducer";
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import fetching from "../../../../images/fetching.gif"

export const DeviceInfo = (thing) => {

    const states = thing.thing.entity.states;
    const activeState = thing.thing.entity.state;
    const token = thing.thing.entity.token;


    return (
        <div className={styles.states}>
            {
                states.map((state) => {
                    return (
                        <State key={state} state={state} activeState={activeState} token={token} />
                    )
                })
            }
        </div>
    )
}

export const State = ({ state, activeState, token }) => {

    const dispatch = useDispatch();
    const [isFetching, setFethcing] = useState(false);

    const onClick = async () => {
        if (state !== activeState) {
            setFethcing(true);
            const status = await dispatch(setStateDeviceThunkCreator(state, token));
            setFethcing(false);
            //При клике на активный стэйт вывести ошибку
        }
        // Если 404 ошибка нужно добавить вывод еррор
    }

    return (
        <div className={styles.state} onClick={onClick}>
            <p>{state}</p>
            <p>{state === activeState && <CheckOutlinedIcon />}</p>
            {isFetching && <p><img src={fetching} /></p>}
        </div>
    )
}

