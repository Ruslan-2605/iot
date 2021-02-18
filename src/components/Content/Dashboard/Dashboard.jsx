import React, { useEffect, useState } from "react";
import styles from "../../../styles/Dashboard.module.css";
import {
    createProjectThunkCreator, getProjectPageThunkCreator,
    deleteProjectThunkCreator, updateProjectThunkCreator
} from "../../../redux/reducers/projectReducer";
import { connect } from "react-redux";
import { getUserName, getUserToken } from "../../../redux/selectors/authSelector";
import { getActivePage, getProjects } from "../../../redux/selectors/projectSelector";
import { DashboardItem } from "./DashboardItem";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Modal } from "../../utils/Modal"
import { withAuthRedirect } from "../../../HOC/withAuthRedirect";
import { CreateProjectForm } from "./CreateProjectForm";

export const Dashboard = (props) => {
    const { username, token, page, projects,
        deleteProjectThunkCreator, updateProjectThunkCreator,
        createProjectThunkCreator, getProjectPageThunkCreator } = props;

    // Состояние модального окна
    const [isCreateProject, setCreateProject] = useState(false);

    useEffect(() => {
        getProjectPageThunkCreator(username, token, page)
    }, []);

    return (

        <div className={styles.dashboard}>
            {/* Pagination */}
            <div className={styles.paginator}>
                <button><ArrowBackIcon /></button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button><ArrowForwardIcon /></button>
            </div>
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
        page: getActivePage(state),
        projects: getProjects(state)
    }
};
export const DashboardContainer = withAuthRedirect(connect(mapStateToProps, {
    getProjectPageThunkCreator,
    createProjectThunkCreator,
    deleteProjectThunkCreator,
    updateProjectThunkCreator
})(Dashboard));


