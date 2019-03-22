import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import dashboardRoutes from './dashbordRoutes';
import Login from '../views/Login';

const MainRouters = () => (
  <Switch>
    {/* AUTH */}
    <Route exact path="/login" component={Login} />

    {dashboardRoutes.map((itemList, index, element) => (
      itemList.active && [
        <Route exact key={itemList.id} path={itemList.path} component={itemList.component} />,
        itemList.editMode && [
          <Route exact path={`${itemList.path}/criar`} component={itemList.editMode} />,
          <Route exact path={`${itemList.path}/:id`} component={itemList.editMode} />,
        ],
        console.dir(element),
      ]
    ))}
    <Route path="/" render={() => (<Redirect to="/guias" />)} />
  </Switch>
);

export default MainRouters;
