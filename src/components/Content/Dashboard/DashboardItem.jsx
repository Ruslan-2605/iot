import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../../styles/Dashboard.module.css";
import { Modal } from "../../utils/Modal"
import { UpdateProjectForm } from "./UpdateProjectForm";

export const DashboardItem = (props) => {

    const { project, token, page, username, deleteProjectThunkCreator, updateProjectThunkCreator } = props;

    // Состояние модального окна
    const [isUpdateProject, setUpdateProject] = useState(false);

    return (
        <div className={styles.project}>
            <div className={styles.name}>{project.name}</div>
            <div className={styles.title}>
                {project.title.length > 15 ? project.title.slice(0, 15) + "..." : project.title}
            </div>
            <div className={styles.btn}>
                <NavLink to={"/project/" + project.id}>View</NavLink>

                <button onClick={() => setUpdateProject(true)}>Update</button>

                <button onClick={() => deleteProjectThunkCreator(project.id, token, username, page)}>Delete</button>
            </div>
            <Modal isModal={isUpdateProject} setModal={setUpdateProject} title="Update Project">
                <UpdateProjectForm
                    updateProjectThunkCreator={updateProjectThunkCreator}
                    token={token}
                    id={project.id}
                />
            </Modal>
        </div>
    );
};


