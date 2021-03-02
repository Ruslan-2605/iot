import React from 'react';
import { getIsAuth } from './redux/selectors/authSelector'
import { useDispatch, useSelector } from 'react-redux';
import "./App.css"
import { HeaderComponent } from './components/Header/Header';
import { NavbarComponent } from './components/Navbar/Navbar';
import { Dashboard } from './components/Content/Dashboard/Dashboard';
import { Route } from 'react-router-dom';
import { ProjectInfo } from './components/Content/ProjectInfo/ProjectInfo';
import { isAuthSetCookie } from './components/utils/isAuthSetCookie';

export const App = () => {
  // Устанавливаю куки в стэйт если они присутствуют
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  isAuthSetCookie(isAuth, dispatch)

  return (
    <div className="wrapper">
      <HeaderComponent />
      <NavbarComponent />
      <div className="wrapper-content">
        <Route exact path="/dashboard" render={() => <Dashboard />} />
        <Route path="/dashboard/project/:projectId?" render={() => <ProjectInfo />} />
      </div>
    </div>
  );
};
