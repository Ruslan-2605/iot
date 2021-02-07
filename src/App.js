import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { HeaderComponent } from './components/Header/Header';
import { NavbarContainer } from './components/Navbar/Navbar';
import './index.css';
import { Redirect, Route } from 'react-router-dom';
import { DashboardContainer } from './components/Content/Dashboard';
import { SignIn } from './components/Login/SignIn';
import { SignUp } from './components/Login/SignUp';
import { getIsAuth } from './redux/selectors/authSelector'
import { setCookie } from './redux/reducers/authReducer'
import { connect } from 'react-redux';
import Cookies from 'js-cookie'

const { Content } = Layout;

export const App = (props) => {

  if (!props.isAuth) {
    const authCookie = Cookies.get();
    if (authCookie.username && authCookie.token) {
      props.setCookie(
        {
          "username": authCookie.username,
          "token": authCookie.token,
          "isAuth": true
        })
    }
  }

  let [collapsed, toggle] = useState(false);

  return (
    <Layout>
      <NavbarContainer collapsed={collapsed} />
      <Layout className="site-layout">
        <HeaderComponent toggle={toggle} collapsed={collapsed} />
        <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 280, }}>
          <Route path="/">
            {!props.isAuth ? <Redirect to="/login/signIn" /> : <Redirect to="/dashboard" />}
          </Route>
          <Route path="/login/signIn" render={() => <SignIn />} />
          <Route path="/login/signUp" render={() => <SignUp />} />
          <Route path="/dashboard" render={() => <DashboardContainer />} />
        </Content>
      </Layout>
    </Layout>
  );
};


const mapStateToProps = (state) => {
  return {
    isAuth: getIsAuth(state),
  }
};

export const AppContainer = connect(mapStateToProps, {
  setCookie,
})(App);


