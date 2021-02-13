import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/Content.module.css";
import { Modal } from "../utils/Modal"
import { CUProjectForm } from "./CUProjectForm";

export const Project = (props) => {

    // Состояние модального окна
    const [isUpdateProject, setUpdateProject] = useState(false);

    const { project, token, page, username, deleteProjectThunkCreator, updateProjectThunkCreator } = props;

    const updateProjectSubmit = (projectData, setError) => {
        updateProjectThunkCreator(projectData, token, project.id, username, page, setError);
    };

    return (
        <div className={styles.project}>
            <div className={styles.name}>{project.name}</div>
            <div className={styles.title}>{project.title}</div>
            <div className={styles.btn}>
                <NavLink to="#">View</NavLink>

                <button onClick={() => setUpdateProject(true)}>Update</button>

                <button onClick={() => deleteProjectThunkCreator(project.id, token, username, page)}>Delete</button>
            </div>
            <Modal isModal={isUpdateProject} setModal={setUpdateProject} title="Update Project">
                <CUProjectForm
                    onSubmit={updateProjectSubmit}
                    btnText="Update"
                />
            </Modal>
        </div>
    );
};


