import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Views/Pages
import HomePage from '../views/HomePage';
import Dashboard from '../views/Dashboard';
import Guias from '../views/Guias';
import NotFoundPage from '../views/NotFoundPage';

const MainRouters = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/guias" component={Guias} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default MainRouters;
