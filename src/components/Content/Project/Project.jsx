import React, { useEffect, useState } from "react";
import styles from "../../../styles/Project.module.css";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPage, getThings } from "../../../redux/selectors/deviceSelector";
import { getUserName, getUserToken } from "../../../redux/selectors/authSelector";
import { getThingsPageThunkCreator } from "../../../redux/reducers/deviceReducer";
import { Modal } from "../../utils/Modal"
import { CreateDeviceForm } from "./Forms/CreateDeviceForm"
import { Device } from "./Device";
import { deleteProjectThunkCreator, getProjectThunkCreator } from "../../../redux/reducers/projectReducer";
import { getActivePage, getProjectViewed } from "../../../redux/selectors/projectSelector";
import SettingsIcon from '@material-ui/icons/Settings';
import { UpdateProjectForm } from "../Dashboard/Forms/UpdateProjectForm";
import CreateIcon from '@material-ui/icons/Create';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

export const Project = withRouter((props) => {

    let id = props.match.params.projectId;

    const dispatch = useDispatch()
    const devicePage = useSelector(getPage)
    const token = useSelector(getUserToken)
    const things = useSelector(getThings)
    const project = useSelector(getProjectViewed)
    const projectPage = useSelector(getActivePage)
    const username = useSelector(getUserName)


    useEffect(() => {
        dispatch(getThingsPageThunkCreator(id, devicePage, token))
        dispatch(getProjectThunkCreator(id, token))
    }, [id]);

    // Состояние модального окна Create Device 
    const [isCreateDevice, setCreateDevice] = useState(false);

    // Состояние модального окна Update Project
    const [isUpdateProject, setUpdateProject] = useState(false);

    return (

        <div className={styles.project}>

            <div className={styles.projectHeader}>
                <div className={styles.name}>{project.name}</div>

                <nav>
                    <div className={styles.dropdown}>
                        <div className={styles.icon}>
                            <SettingsIcon />
                            <div>Settings</div>
                        </div>
                        <div className={styles.dropdownMenu}>
                            <ul className={styles.submenu}>
                                <li><button onClick={() => {
                                    setCreateDevice(true)
                                }}><AddIcon />
                                    <div>Add</div>
                                </button></li>
                                <li><button onClick={() => {
                                    setUpdateProject(true)
                                }}>
                                    <CreateIcon />
                                    <div>Edit</div>
                                </button></li>
                                <li><button onClick={() => {
                                    dispatch(deleteProjectThunkCreator(id, token, username, projectPage))
                                }}>
                                    <DeleteIcon />
                                    <div>Ilya</div>
                                </button></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <div className={styles.title}>{project.title}</ div >

            <div className={styles.things}>{things.map((thing) => {
                return <Device thing={thing} key={thing.entity.id} />
            })}
            </div>

            <Modal isModal={isCreateDevice} setModal={setCreateDevice} title="Create Device">
                <CreateDeviceForm thingsLength={things.length} />
            </Modal>

            <Modal isModal={isUpdateProject} setModal={setUpdateProject} title="Update Project">
                <UpdateProjectForm />
            </Modal>
        </div >

    );
});



