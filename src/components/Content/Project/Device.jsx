import React, { useEffect, useState } from "react";
import styles from "../../../styles/Device.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteDeviceThunkCreator, setStateDeviceThunkCreator } from "../../../redux/reducers/deviceReducer";
import { getUserToken } from "../../../redux/selectors/authSelector";
import { getProjectViewed, getActivePage } from "../../../redux/selectors/projectSelector";
import { Modal } from "../../utils/Modal"
import { UpdateDeviceForm } from "./Forms/UpdateDeviceForm"
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

    // const kaz = Date.now()
    // const uf = new Date().getTimezoneOffset() * 60
    // const fff = kaz + uf
    const [editMode, setEditMode] = useState(false);
    const [state, setState] = useState(thing.entity.state)

    useEffect(() => {
        setState(thing.entity.state)
    }, [thing.entity.state])

    const deActivateEdit = () => {
        setEditMode(false)
        dispatch(setStateDeviceThunkCreator(state, token))
    };

    const onStateChange = (e) => {
        setState(e.currentTarget.value);
    };

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
                    {!editMode && (
                        <div>
                            <span onDoubleClick={() => setEditMode(true)}>{thing.entity.state}</span>
                        </div>
                    )}
                    {editMode && (
                        <div>
                            <input
                                onChange={onStateChange}
                                autoFocus={true}
                                onBlur={deActivateEdit}
                                value={state}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.lastSeen}>
                    2 minutes ago
                </div>

                {/* <button onClick={() => setUpdateDevice(true)}>
                    Update
                </button> */}

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
