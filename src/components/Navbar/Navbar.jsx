import React from "react";
import styles from "../../styles/Navbar.module.css";
import { NavLink } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import '../../index.css';
import { Dashboard } from "@material-ui/icons";
import { connect } from "react-redux";
import { getIsAuth, getUserName } from "../../redux/selectors/authSelector";
import { deleteCookie } from "../../redux/reducers/authReducer"
import { Button } from "@material-ui/core";
const { Sider } = Layout;


export const NavbarComponent = (props) => {
    const logout = () => {
        props.deleteCookie(["username", "token"])
    }
    return (
        <Sider trigger={null} collapsible collapsed={props.collapsed}>
            <div className="logo"><div className={styles.username}>{props.isAuth && props.username}</div></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    {props.isAuth ? <Button style={{ "color": "white" }} onClick={logout}> Logout </Button> : <NavLink to="/login/signIn"> LOGIN </NavLink>}
                </Menu.Item>
                <Menu.Item key="2" icon={<Dashboard />}>
                    <NavLink to="/dashboard"> DASHBOARD </NavLink>
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    <NavLink to="#"> nav 3 </NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: getIsAuth(state),
        username: getUserName(state),
    }
};
export const NavbarContainer = connect(mapStateToProps, {
    deleteCookie
})(NavbarComponent);
