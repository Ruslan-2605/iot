import React from "react";
import style from "../../styles/Navbar.module.css";
import { NavLink } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import '../../index.css';
import { Dashboard } from "@material-ui/icons";
const { Sider } = Layout;


export const NavbarComponent = (props) => {
    return (
        <Sider trigger={null} collapsible collapsed={props.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['']}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <NavLink to="/login"> LOGIN </NavLink>
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

