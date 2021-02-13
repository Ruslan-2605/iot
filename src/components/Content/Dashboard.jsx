import React, { useEffect, useState } from "react";
import styles from "../../styles/Content.module.css";
import {
    createProjectThunkCreator, getProjectPageThunkCreator,
    deleteProjectThunkCreator, updateProjectThunkCreator
} from "../../redux/reducers/projectReducer";
import { connect } from "react-redux";
import { getUserName, getUserToken } from "../../redux/selectors/authSelector";
import { getCountPage, getProjects } from "../../redux/selectors/projectSelector";
import { Project } from "./Project";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Modal } from "../utils/Modal"
import { CUProjectForm } from "./CUProjectForm";

export const Dashboard = ({ username, token, page, projects, ...props }) => {

    // Состояние модального окна
    const [isCreateProject, setCreateProject] = useState(false);

    useEffect(() => {
        props.getProjectPageThunkCreator(username, token, page)
    }, []);

    const createProjectSubmit = (projectData, setError) => {
        props.createProjectThunkCreator(projectData, token, username, page, projects.length, setError);
    };

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
                {projects.map((project, key) => <Project
                    project={project}
                    key={key}
                    token={token}
                    page={page}
                    username={username}
                    deleteProjectThunkCreator={props.deleteProjectThunkCreator}
                    updateProjectThunkCreator={props.updateProjectThunkCreator}
                />)}
                {/* Create Project Card */}
                <div onClick={() => setCreateProject(true)} className={styles.project + " " + styles.creator}>
                    <div className={styles.name}>Create project</div>
                </div>
                <Modal isModal={isCreateProject} setModal={setCreateProject} title="Create Project">
                    <CUProjectForm
                        onSubmit={createProjectSubmit}
                        btnText="Create"
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
        page: getCountPage(state),
        projects: getProjects(state)
    }
};
export const DashboardContainer = connect(mapStateToProps, {
    getProjectPageThunkCreator,
    createProjectThunkCreator,
    deleteProjectThunkCreator,
    updateProjectThunkCreator
})(Dashboard);


