import React from "react";
import styles from "../../styles/Header.module.css";
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { getIsAuth, getUserName } from "../../redux/selectors/authSelector";
import { connect } from "react-redux";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupSharpIcon from '@material-ui/icons/GroupSharp';
import { NavLink } from "react-router-dom";

export const HeaderComponent = ({ isAuth, username }) => {
    return (
        <div className={styles.header}>

            <div className={styles.title}>
                <div className={styles.logo}><HomeWorkIcon /></div>
                <div className={styles.text}>IOT</div>
            </div>

            {isAuth ?
                <div className={styles.content}>
                    <div className={styles.username}>{username}</div>
                    <GroupSharpIcon className={styles.profileLogo} />
                </div> :
                <div className={styles.content}>
                    <NavLink className={styles.login} to="/signIn">Sign In</NavLink>
                    <NavLink className={styles.login} to="/signUp">Sign Up</NavLink>
                    <ExitToAppIcon />
                </div>
            }
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        isAuth: getIsAuth(state),
        username: getUserName(state),
    }
};
export const HeaderContainer = connect(mapStateToProps, {})(HeaderComponent);


