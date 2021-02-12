import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/Content.module.css";

export const Project = (props) => {

    const { project, key, token, page, username, deleteProjectThunkCreator, updateProjectThunkCreator } = props;

    return (
        <div className={styles.project}>
            <div className={styles.name}>{project.name}</div>
            <div className={styles.title}>{project.title}</div>
            <div className={styles.btn}>
                <button>Update</button>
                <button>Delete</button>
                <NavLink to="#">View</NavLink>
            </div>
        </div>
    );
};


