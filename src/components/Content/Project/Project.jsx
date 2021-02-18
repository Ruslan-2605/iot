import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../../HOC/withAuthRedirect";
import styles from "../../../styles/Project.module.css";


export const Project = (props) => {

    useEffect(() => {
        console.log(props.match.params.projectId)
    }, [props.match.params.projectId])

    return (
        <div>
            Project
        </div>
    );
};

const mapStateToProps = (state) => {
    return {

    }
};
export const ProjectContainer = compose(
    connect(mapStateToProps, {}),
    withRouter,
    withAuthRedirect
)(Project);
