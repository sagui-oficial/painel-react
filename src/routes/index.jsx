import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import dashboardRoutes from './dashbordRoutes';
import Login from '../views/Login';

const MainRouters = () => (
  <Switch>
    {dashboardRoutes.map(itemList => (
      itemList.active && (
        <Route
          exact
          path={itemList.path}
          component={itemList.component}
          key={itemList.id}
        />
      )
    ))}
    <Route exact path="/login" component={Login} />
    <Route path="/" render={() => (<Redirect to="/dashboard" />)} />
    {/* <Route component={NotFoundPage} /> */}
  </Switch>
);

export default MainRouters;
