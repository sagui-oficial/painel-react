import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import dashboardRoutes from './dashbordRoutes';
import Login from '../views/Login';

const activeRouters = dashboardRoutes.filter(item => item.active);

const MainRouters = () => (
  <Switch>
    {activeRouters.map(itemList => [
      <Route
        exact
        key={itemList.id}
        path={itemList.path}
        component={itemList.component}
      />,
      itemList.editMode && [
        <Route
          exact
          path={`${itemList.path}/criar`}
          component={itemList.editMode}
        />,
        <Route
          exact
          path={`${itemList.path}/:id`}
          component={itemList.editMode}
        />,
      ],
    ])}

    <Route exact path="/" component={Login} />
    <Route path="/" render={() => (<Redirect to={activeRouters[0].path} />)} />
  </Switch>
);

export default MainRouters;
