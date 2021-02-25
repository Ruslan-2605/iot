import React, { useEffect } from "react";
import styles from "../../styles/Navbar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import '../../index.css';
import { connect } from "react-redux";
import { getIsAuth } from "../../redux/selectors/authSelector";
import { logout } from "../../redux/reducers/authReducer"
import { setIconActionCreator } from "../../redux/reducers/projectReducer"
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';
import { getIconSelected } from "../../redux/selectors/projectSelector";
import * as queryString from "query-string";

export const NavbarComponent = ({ isAuth, iconSelected, logout, setIconActionCreator }) => {

    return (
        <div className={styles.navbar}>
            {isAuth ?
                // Если пользователь зарегистрирован
                <div className={styles.icons}>
                    <NavLink data-title="Logout"
                        className={styles.icon} onClick={() => { logout(["username", "token"]) }} to="#">
                        <ExitToAppIcon />
                    </NavLink>
                    <NavLink data-title="Dashboard"
                        className={iconSelected === 1 ? styles.icon + " " + styles.iconSelected : styles.icon}
                        onClick={() => setIconActionCreator(1)} to="/dashboard">
                        <DashboardIcon />
                    </NavLink>
                </div>
                :
                // Если пользователь не зарегистрирован
                <div className={styles.icons}>
                    <NavLink data-title="Info"
                        className={iconSelected === 1 ? styles.icon + " " + styles.iconSelected : styles.icon}
                        onClick={() => setIconActionCreator(1)} to="#">
                        <InfoSharpIcon />
                    </NavLink>
                    <NavLink data-title="Tutorial"
                        className={iconSelected === 2 ? styles.icon + " " + styles.iconSelected : styles.icon}
                        onClick={() => setIconActionCreator(2)} to="#">
                        <PersonalVideoIcon />
                    </NavLink>
                </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: getIsAuth(state),
        iconSelected: getIconSelected(state),
    }
};
export const NavbarContainer = connect(mapStateToProps, {
    logout, setIconActionCreator
})(NavbarComponent);
