import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import dashboardRoutes from './dashbordRoutes';
import Login from '../views/Login';
import GuiaDetail from '../views/Guias/Detail';
import GuiaCreate from '../views/Guias/Create';
import Pacientes from '../views/Pacientes';

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

    {/* AUTH */}
    <Route exact path="/login" component={Login} />

    {/* GUIAS */}
    <Route exact path="/guias/criar" component={GuiaCreate} />
    <Route exact path="/guias/:id" component={GuiaDetail} />

    {/* PACIENTES */}
    <Route exact path="/pacientes/criar" component={Pacientes} />
    <Route exact path="/pacientes/:id" component={Pacientes} />

    {/* 404 */}
    <Route path="/" render={() => (<Redirect to="/guias" />)} />
  </Switch>
);

export default MainRouters;
