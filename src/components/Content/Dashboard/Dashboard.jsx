import React, { useEffect, useMemo, useState } from "react";
import styles from "../../../styles/Dashboard.module.css";
import {
    createProjectThunkCreator, getProjectPageThunkCreator,
    deleteProjectThunkCreator, updateProjectThunkCreator, getCountPageThunkCreator
} from "../../../redux/reducers/projectReducer";
import { connect } from "react-redux";
import { getUserName, getUserToken } from "../../../redux/selectors/authSelector";
import { getActivePage, getProjects } from "../../../redux/selectors/projectSelector";
import { DashboardItem } from "./DashboardItem";
import { Modal } from "../../utils/Modal"
import { withAuthRedirect } from "../../../HOC/withAuthRedirect";
import { CreateProjectForm } from "./Forms/CreateProjectForm";
import { Pagination } from "./Pagination";

export const Dashboard = (props) => {
    const {
        username, token, page, projects,
        deleteProjectThunkCreator, updateProjectThunkCreator,
        createProjectThunkCreator, getProjectPageThunkCreator,
    } = props;

    // Состояние модального окна
    const [isCreateProject, setCreateProject] = useState(false);

    useEffect(() => {
        getProjectPageThunkCreator(username, token, page)
    }, [username, token, page]);

    return (

        <div className={styles.dashboard}>

            <Pagination />

            {/* Projects */}
            <div className={styles.projects}>

                {/* Create Project Card */}
                <div onClick={() => setCreateProject(true)} className={styles.project + " " + styles.creator}>
                    <div className={styles.name}>Create project</div>
                </div>

                {projects.map((project) =>
                    <DashboardItem
                        key={project.id}
                        project={project}
                        token={token}
                        page={page}
                        username={username}
                        deleteProjectThunkCreator={deleteProjectThunkCreator}
                        updateProjectThunkCreator={updateProjectThunkCreator}
                    />
                )}

                <Modal isModal={isCreateProject} setModal={setCreateProject} title="Create Project">
                    <CreateProjectForm
                        createProjectThunkCreator={createProjectThunkCreator}
                        token={token}
                        projectsLength={projects.length}
                    />
                </Modal>
            </div>
        </div >
    );
};

const mapStateToProps = (state) => {
    return {
        username: getUserName(state),
        token: getUserToken(state),
        projects: getProjects(state),
        page: getActivePage(state)
    }
};
export const DashboardContainer = withAuthRedirect(connect(mapStateToProps, {
    getProjectPageThunkCreator,
    createProjectThunkCreator,
    deleteProjectThunkCreator,
    updateProjectThunkCreator,
    getCountPageThunkCreator
})(Dashboard));


