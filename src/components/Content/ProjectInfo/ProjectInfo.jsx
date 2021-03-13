import React, { useEffect, useState } from "react";
import styles from "../../../styles/Project.module.css";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPage, getThings } from "../../../redux/selectors/thingsSelector";
import { getUserToken } from "../../../redux/selectors/authSelector";
import { getThingsPageThunkCreator, setInitialStateActionCreator } from "../../../redux/reducers/thingsReducer";
import { Modal } from "../../utils/Modal"
import { CreateDeviceForm } from "./Forms/CreateDeviceForm"
import { Device } from "./Device/Device";
import { deleteProjectThunkCreator, getProjectThunkCreator, setInitialProjectViewedActionCreator } from "../../../redux/reducers/projectsReducer";
import { getProjectViewed } from "../../../redux/selectors/projectsSelector";
import SettingsIcon from '@material-ui/icons/Settings';
import { UpdateProjectForm } from "../Dashboard/Forms/UpdateProjectForm";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { withAuthRedirect } from "../../../HOC/withAuthRedirect";

export const ProjectInfo = withAuthRedirect(withRouter((props) => {

    let id = props.match.params.projectId;

    const dispatch = useDispatch()
    const devicePage = useSelector(getPage)
    const token = useSelector(getUserToken)
    const things = useSelector(getThings)
    const project = useSelector(getProjectViewed)

    useEffect(() => {
        dispatch(getThingsPageThunkCreator(id, devicePage, token))
        dispatch(getProjectThunkCreator(id, token))

        return () => {
            dispatch(setInitialStateActionCreator())
            dispatch(setInitialProjectViewedActionCreator())
        }
    }, []);

    // Состояние модального окна Create Device 
    const [isCreateDevice, setCreateDevice] = useState(false);

    // Состояние модального окна Update Project
    const [isUpdateProject, setUpdateProject] = useState(false);

    const deleteProject = (id, token) => {
        dispatch(deleteProjectThunkCreator(id, token))
    }

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
                                    deleteProject(id, token)
                                }}>
                                    <DeleteIcon />
                                    <div>Delete</div>
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
}));



