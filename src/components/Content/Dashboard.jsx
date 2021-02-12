import React, { useEffect } from "react";
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
import AddIcon from '@material-ui/icons/Add';

export const Dashboard = ({ username, token, page, projects, ...props }) => {

    useEffect(() => {
        props.getProjectPageThunkCreator(username, token, page)
    }, []);

    return (

        <div className={styles.dashboard}>
            <div className={styles.paginator}>
                <button><ArrowBackIcon /></button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button><ArrowForwardIcon /></button>
            </div>
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
                <div className={styles.project}>
                    <input className={styles.input}></input>
                    <input className={styles.input}></input>
                    <div className={styles.addIcon}>
                        <button><AddIcon /></button>
                    </div>
                </div>
            </div>
        </div>
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


