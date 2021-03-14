import React from "react";
import styles from "../../../../styles/Device.module.css";
import CloseIcon from '@material-ui/icons/Close';
import { AddStateForm } from '../Forms/AddStateForm'

export const DeviceInfoEditMode = ({ thing, states, setStates }) => {

    const activeState = thing.entity.state;
    const length = states.length;

    const deleteState = (state) => {
        const statesCopy = [...states]
        statesCopy.map((item, index) => {
            if (item === state) {
                statesCopy.splice(index, 1);
                setStates(statesCopy);
            }

        })
    }

    return (
        <div className={styles.states}>

            {
                states.map((state) => {
                    return (
                        <State
                            key={state}
                            state={state}
                            activeState={activeState}
                            length={length}
                            deleteState={deleteState}
                        />
                    )
                })
            }
            {
                length < 10
                &&
                <AddStateForm states={states} setStates={setStates} />
            }
        </div>
    )
}

export const State = ({ state, activeState, deleteState }) => {

    return (
        <>
            {
                state !== activeState
                &&
                <div className={styles.state}>
                    <p>{state}</p>
                    <p onClick={() => deleteState(state)}><CloseIcon /></p>
                </div>
            }
        </>
    )
}

