import React from 'react';
import { getIsAuth } from './redux/selectors/authSelector'
import { setCookie } from './redux/reducers/authReducer'
import { connect } from 'react-redux';
import Cookies from 'js-cookie'
import "./App.css"
import { HeaderContainer } from './components/Header/Header';
import { NavbarContainer } from './components/Navbar/Navbar';
import { DashboardContainer } from './components/Content/Dashboard';
import { Route } from 'react-router-dom';
import { SignIn } from './components/Login/SignIn';
import { SignUp } from './components/Login/SignUp';

export const App = (props) => {
  // Устанавливаю куки в стэйт если они присутствуют
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

  return (
    <div className="wrapper">
      <HeaderContainer />
      <NavbarContainer />
      <div className="wrapper-content">
        <Route path="/signIn" render={() => <SignIn />} />
        <Route path="/signUp" render={() => <SignUp />} />
        <Route path="/dashboard" render={() => <DashboardContainer />} />
      </div>
    </div>
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


