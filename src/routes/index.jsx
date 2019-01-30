import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import dashboardRoutes from './dashbordRoutes';
import Login from '../views/Login';
import FormGuia from '../views/Guias/FormGuia';

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
    <Route exact path="/guias/:id" component={FormGuia} />
    <Route exact path="/login" component={Login} />
    <Route path="/" render={() => (<Redirect to="/guias" />)} />
    {/* <Route component={NotFoundPage} /> */}
  </Switch>
);

export default MainRouters;
