import React, { useEffect, useState } from "react";
import styles from "../../../styles/Device.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteDeviceThunkCreator, setStateDeviceThunkCreator } from "../../../redux/reducers/thingsReducer";
import { getUserToken } from "../../../redux/selectors/authSelector";
import { getProjectViewed, getActivePage } from "../../../redux/selectors/projectsSelector";
import { Modal } from "../../utils/Modal"
import { UpdateDeviceForm } from "./Forms/UpdateDeviceForm"
import { lastActive } from "../../utils/lastActive"
import CloseIcon from '@material-ui/icons/Close';

export const Device = React.memo(({ thing }) => {

    // Состояние модального окна
    const [isUpdateDevice, setUpdateDevice] = useState(false);

    const dispatch = useDispatch();
    const project = useSelector(getProjectViewed).id;
    const page = useSelector(getActivePage); // page of project
    const token = useSelector(getUserToken);

    const deleteDevice = (id) => {
        dispatch(deleteDeviceThunkCreator(id, page, project, token))
    }

    const lastSeen = lastActive(thing.entity.activity)

    const setState = (state) => {
        dispatch(setStateDeviceThunkCreator(state, thing.entity.token))
    }

    return (
        <div className={styles.device}>
            <div className={styles.deviceInfo}>

                <button className={styles.btnClose} onClick={() => deleteDevice(thing.entity.id)}>
                    <CloseIcon />
                </button>

                <div className={styles.name}>
                    {thing.entity.name}
                </div><hr />


                <div className={styles.state}>
                    <div style={{ "font-size": "18px" }}>{thing.entity.state}</div>
                    <div style={{ "display": "flex" }}>
                        {
                            thing.entity.states.map((state) => {
                                return (
                                    <div>
                                        <button style={{ "padding": "3px", "margin": "3px", "font-size": "18px", "font-weight": "700" }} key={state} onClick={() => { setState(state) }}>{state}</button>
                                    </div>)
                            })
                        }
                    </div>
                </div>
                <div className={styles.lastSeen}>
                    {lastSeen}
                </div>

                <Modal isModal={isUpdateDevice} setModal={setUpdateDevice} title="Update Device">
                    <UpdateDeviceForm
                        id={thing.entity.id}
                        project={project}
                        defaultValues={{
                            "name": thing.entity.name,
                            "state": thing.entity.state,
                            "states": thing.entity.states
                        }}
                    />
                </Modal>

            </div>
        </div>
    );
});
