import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { HeaderComponent } from './components/Header/Header';
import { NavbarComponent } from './components/Navbar/Navbar';
import './index.css';
import { Route } from 'react-router-dom';
import { Dashboard } from './components/Content/Dashboard';
import { SignIn } from './components/Login/SignIn';
import { SignUp } from './components/Login/SignUp';


const { Content } = Layout;

export const App = () => {
  let [collapsed, toggle] = useState(false);

  return (
    <Layout>
      <NavbarComponent collapsed={collapsed} />
      <Layout className="site-layout">
        <HeaderComponent toggle={toggle} collapsed={collapsed} />
        <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 280, }}>
          <Route path="/login/signIn" render={() => <SignIn />} />
          <Route path="/login/signUp" render={() => <SignUp />} />
          <Route path="/dashboard" render={() => <Dashboard />} />
        </Content>
      </Layout>
    </Layout>
  );

};
