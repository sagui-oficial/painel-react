import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import dashboardRoutes from './dashbordRoutes';
import Login from '../views/Login';
import GuiaDetail from '../views/Guias/Detail';
import GuiaCreate from '../views/Guias/Create';

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
    <Route exact path="/guias/criar" component={GuiaCreate} />
    <Route exact path="/guias/:Id" component={GuiaDetail} />
    <Route path="/" render={() => (<Redirect to="/guias" />)} />
  </Switch>
);

export default MainRouters;
