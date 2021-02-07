import React, { useEffect } from "react";
import styles from "../../styles/Content.module.css";
import Box from '@material-ui/core/Box';
import { getProjectPageThunkCreator } from "../../redux/reducers/projectReducer";
import { connect } from "react-redux";
import { getUserName, getUserToken } from "../../redux/selectors/authSelector";
import { getCountPage, getProjects } from "../../redux/selectors/projectSelector";

export const Dashboard = (props) => {
    useEffect(() => {
        props.getProjectPageThunkCreator(props.username, props.token, props.page)
    }, []);

    return (
        <div>
            {props.projects.map((project, key) =>
                <Box key={key} component="span" display="block" p={2} m={1} bgcolor="background.paper">
                    <div>{project.name}</div>
                    <div>{project.title}</div>
                </Box>
            )}
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
})(Dashboard);
