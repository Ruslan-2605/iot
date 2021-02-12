import React, { useState } from "react";
import styles from "../../styles/Navbar.module.css";
import { NavLink } from "react-router-dom";
import '../../index.css';
import { connect } from "react-redux";
import { getIsAuth } from "../../redux/selectors/authSelector";
import { logout } from "../../redux/reducers/authReducer"
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';

export const NavbarComponent = ({ isAuth, logout }) => {
    const [icon, setIcon] = useState(null);
    return (
        <div className={styles.navbar}>
            {isAuth ?
                <div className={styles.icons}>
                    <NavLink data-title="Logout"
                        className={styles.icon} onClick={() => { logout(["username", "token"]) }} to="#">
                        <ExitToAppIcon />
                    </NavLink>
                    <NavLink data-title="Dashboard"
                        className={icon === 1 ? styles.icon + " " + styles.iconSelected : styles.icon} onClick={() => setIcon(1)} to="/dashboard">
                        <DashboardIcon />
                    </NavLink>
                </div>
                :
                <div className={styles.icons}>
                    <NavLink data-title="Info"
                        className={icon === 3 ? styles.icon + " " + styles.iconSelected : styles.icon} onClick={() => setIcon(3)} to="#">
                        <InfoSharpIcon />
                    </NavLink>
                    <NavLink data-title="Tutorial"
                        className={icon === 4 ? styles.icon + " " + styles.iconSelected : styles.icon} onClick={() => setIcon(4)} to="#">
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
    }
};
export const NavbarContainer = connect(mapStateToProps, {
    logout
})(NavbarComponent);
