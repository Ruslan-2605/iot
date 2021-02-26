import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../../styles/Dashboard.module.css";
import { Modal } from "../../utils/Modal"
import { UpdateProjectForm } from "./Forms/UpdateProjectForm";
import CloseIcon from '@material-ui/icons/Close';

export const DashboardItem = React.memo((props) => {

    const { project, token, page, username, deleteProjectThunkCreator, updateProjectThunkCreator } = props;

    // Состояние модального окна
    const [isUpdateProject, setUpdateProject] = useState(false);

    return (
        <div className={styles.project}>
            <button className={styles.btnClose}
                onClick={() => deleteProjectThunkCreator(project.id, token, username, page)}><CloseIcon />
            </button>
            <div className={styles.name}>{project.name}</div>
            <div className={styles.title}>
                {project.title.length > 15 ? project.title.slice(0, 15) + "..." : project.title}
            </div>
            <div className={styles.btn}>
                <NavLink to={"/dashboard/project/" + project.id}>View</NavLink>

                <button onClick={() => setUpdateProject(true)}>Update</button>

            </div>
            <Modal isModal={isUpdateProject} setModal={setUpdateProject} title="Update Project">
                <UpdateProjectForm
                    updateProjectThunkCreator={updateProjectThunkCreator}
                    token={token}
                    id={project.id}
                    defaultValues={{
                        "name": project.name,
                        "title": project.title
                    }}
                />
            </Modal>
        </div>
    );
});


