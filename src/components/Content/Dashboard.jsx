import React, { useEffect, useState } from "react";
import styles from "../../styles/Content.module.css";
import { createProjectThunkCreator, getProjectPageThunkCreator, deleteProjectThunkCreator, updateProjectThunkCreator } from "../../redux/reducers/projectReducer";
import { connect } from "react-redux";
import { getUserName, getUserToken } from "../../redux/selectors/authSelector";
import { getCountPage, getProjects } from "../../redux/selectors/projectSelector";
import { CreateProjectForm } from "./CreateProjectForm";
import { Project } from "./Project";

export const Dashboard = ({ username, token, page, projects, ...props }) => {

    useEffect(() => {
        props.getProjectPageThunkCreator(username, token, page)
    }, []);

    const [isCreateForm, setCreateForm] = useState(false);

    return (
        <div>
            <button onClick={() => setCreateForm(true)}>+</button>

            {isCreateForm && <CreateProjectForm
                token={token}
                createProjectThunkCreator={props.createProjectThunkCreator}
                page={page}
                username={username}
                setCreateForm={setCreateForm}
                projectLength={projects.length}
            />}

            {projects.map((project, key) => <Project
                project={project}
                key={key}
                token={token}
                page={page}
                username={username}
                deleteProjectThunkCreator={props.deleteProjectThunkCreator}
                updateProjectThunkCreator={props.updateProjectThunkCreator}
            />)}
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


