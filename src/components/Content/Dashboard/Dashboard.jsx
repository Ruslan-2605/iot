import React, { useEffect, useState } from "react";
import styles from "../../../styles/Dashboard.module.css";
import {
    getProjectPageThunkCreator,
} from "../../../redux/reducers/projectsReducer";
import { useDispatch, useSelector } from "react-redux";
import { getUserName, getUserToken } from "../../../redux/selectors/authSelector";
import { getActivePage, getProjects } from "../../../redux/selectors/projectsSelector";
import { DashboardItem } from "./DashboardItem";
import { Modal } from "../../utils/Modal"
import { withAuthRedirect } from "../../../HOC/withAuthRedirect";
import { CreateProjectForm } from "./Forms/CreateProjectForm";
import { Pagination } from "./Pagination";

export const Dashboard = withAuthRedirect(() => {

    const dispatch = useDispatch();
    const username = useSelector(getUserName);
    const token = useSelector(getUserToken);
    const page = useSelector(getActivePage);

    useEffect(() => {
        dispatch(getProjectPageThunkCreator(username, token, page))
    }, [username, token, page]);

    return (

        <div className={styles.dashboard}>
            <Pagination />
            <Projects />
        </div >
    );
});

export const Projects = () => {

    const projects = useSelector(getProjects);

    // Состояние модального окна
    const [isCreateProject, setCreateProject] = useState(false);

    return (
        <div className={styles.projects}>

            <CreateProjectCard setCreateProject={setCreateProject} />

            {projects.map((project) =>
                <DashboardItem
                    key={project.id}
                    project={project}
                />
            )}

            <Modal isModal={isCreateProject} setModal={setCreateProject} title="Create Project">
                <CreateProjectForm />
            </Modal>
        </div>
    )
}

export const CreateProjectCard = ({ setCreateProject }) => {
    return (
        <div onClick={() => setCreateProject(true)} className={styles.project + " " + styles.creator}>
            <div className={styles.name}>Create project</div>
        </div>
    )
}