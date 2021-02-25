import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDeviceThunkCreator } from "../../../redux/reducers/deviceReducer";
import { getUserToken } from "../../../redux/selectors/authSelector";
import { getProjectViewed, getActivePage } from "../../../redux/selectors/projectSelector";
import { Modal } from "../../utils/Modal"
import { UpdateDeviceForm } from "./Forms/UpdateDeviceForm"

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
    debugger
    return (
        <div>
            <div>{thing.type}</div>
            <div>{thing.entity.id}</div>
            <div>{thing.entity.name}</div>
            <button onClick={() => deleteDevice(thing.entity.id)}>DELETE</button>

            <button onClick={() => setUpdateDevice(true)}>Update</button>
            <Modal isModal={isUpdateDevice} setModal={setUpdateDevice} title="Update Device">
                <UpdateDeviceForm id={thing.entity.id} project={project} />
            </Modal>
        </div>
    );
});
