import React, { useEffect, useState } from "react";
import styles from "../../../styles/Project.module.css";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPage, getThings } from "../../../redux/selectors/deviceSelector";
import { getUserToken } from "../../../redux/selectors/authSelector";
import { getThingsPageThunkCreator } from "../../../redux/reducers/deviceReducer";
import { Modal } from "../../utils/Modal"
import { CreateDeviceForm } from "./Forms/CreateDeviceForm"
import { Device } from "./Device";
import { getProjectThunkCreator } from "../../../redux/reducers/projectReducer";
import { getProjectViewed } from "../../../redux/selectors/projectSelector";

export const Project = (props) => {

    let id = props.match.params.projectId;

    const dispatch = useDispatch()
    const page = useSelector(getPage)
    const token = useSelector(getUserToken)
    const things = useSelector(getThings)
    const project = useSelector(getProjectViewed)

    useEffect(() => {
        dispatch(getThingsPageThunkCreator(id, page, token))
        dispatch(getProjectThunkCreator(id, token))
    }, [id]);

    // Состояние модального окна
    const [isCreateDevice, setCreateDevice] = useState(false);

    return (
        <div>
            <div>{project.name}</div>
            {things.map((thing) => {
                return <Device thing={thing} />
            })}
            <button onClick={() => setCreateDevice(true)}>Create</button>
            <Modal isModal={isCreateDevice} setModal={setCreateDevice} title="Create Device">
                <CreateDeviceForm thingsLength={things.length} />
            </Modal>
        </div>
    );
};

export const ProjectContainer = withRouter(Project)

