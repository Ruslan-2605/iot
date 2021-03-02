import React from "react";
import styles from "../../styles/Navbar.module.css";
import { NavLink } from "react-router-dom";
import '../../index.css';
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth } from "../../redux/selectors/authSelector";
import { logout } from "../../redux/reducers/authReducer"
import { setIconActionCreator } from "../../redux/reducers/projectsReducer"
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';
import { getIconSelected } from "../../redux/selectors/projectsSelector";

export const NavbarComponent = (props) => {
    return (
        <div className={styles.navbar}>
            <NavbarIcons />
        </div >
    );
};

export const NavbarIcons = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth);
    const iconSelected = useSelector(getIconSelected);

    const setIcon = (icon) => {
        dispatch(setIconActionCreator(icon))
    }
    return (
        <>
            {isAuth ?
                <NavbarIfAuthTrue iconSelected={iconSelected} setIcon={setIcon} />
                :
                <NavbarIfAuthFalse iconSelected={iconSelected} setIcon={setIcon} />
            }
        </>
    )
}

export const NavbarIfAuthTrue = ({ iconSelected, setIcon }) => {
    const dispatch = useDispatch();
    return (
        <div className={styles.icons}>
            <NavLink data-title="Logout"
                className={styles.icon} onClick={() => dispatch(logout())} to="#">
                <ExitToAppIcon />
            </NavLink>
            <NavLink data-title="Dashboard"
                className={iconSelected === 1 ? styles.icon + " " + styles.iconSelected : styles.icon}
                onClick={() => setIcon(1)} to="/dashboard">
                <DashboardIcon />
            </NavLink>
        </div>
    )
}

export const NavbarIfAuthFalse = ({ iconSelected, setIcon }) => {
    return (
        <div className={styles.icons}>
            <NavLink data-title="Info"
                className={iconSelected === 1 ? styles.icon + " " + styles.iconSelected : styles.icon}
                onClick={() => setIcon(1)} to="#">
                <InfoSharpIcon />
            </NavLink>
            <NavLink data-title="Tutorial"
                className={iconSelected === 2 ? styles.icon + " " + styles.iconSelected : styles.icon}
                onClick={() => setIcon(2)} to="#">
                <PersonalVideoIcon />
            </NavLink>
        </div>
    )
}