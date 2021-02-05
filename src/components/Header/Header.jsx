import React from "react";
import styles from "../../styles/Header.module.css";
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import '../../index.css';

const { Header } = Layout;

export const HeaderComponent = (props) => {
    return (
        <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => props.toggle(prev => !prev),
            })}

        </Header>
    );
};


