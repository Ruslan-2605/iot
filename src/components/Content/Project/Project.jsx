import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserToken } from "../../../redux/selectors/authSelector";
import { getProjectThunkCreator } from "../../../redux/reducers/projectReducer";
import styles from "../../../styles/Project.module.css";
import { getProjectViewed } from "../../../redux/selectors/projectSelector";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { getThingsThunkCreator } from "../../../redux/reducers/deviceReducer";
import { getThings } from "../../../redux/selectors/deviceSelector";


export const Project = (props) => {

    const { token, getProjectThunkCreator, getThingsThunkCreator, project, things, match } = props;

    let id = match.params.projectId;

    useEffect(async () => {
        await getProjectThunkCreator(id, token);
        await getThingsThunkCreator(id, token);
    }, [id])

    return (
        <div>
            <div>{project.name}</div>
            <div>{project.title}</div>
            <div>{project.id}</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        token: getUserToken(state),
        project: getProjectViewed(state),
        things: getThings(state),
    }
};
export const ProjectContainer = compose(
    connect(mapStateToProps, {
        getProjectThunkCreator,
        getThingsThunkCreator
    }),
    withRouter
)(Project)

