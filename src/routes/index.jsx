import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import dashboardRoutes from './dashbordRoutes';
import Login from '../views/Login';

import GuiaDetail from '../views/Guias/Detail';
import GuiaCreate from '../views/Guias/Form';

import Pacientes from '../views/Pacientes';

import Procedimentos from '../views/Procedimentos';
import ProcedimentoCreate from '../views/Procedimentos/Form';

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

    {/* PROCEDIMENTOS */}
    <Route exact path="/procedimentos/criar" component={ProcedimentoCreate} />
    <Route exact path="/procedimentos/:id" component={Procedimentos} />

    {/* 404 */}
    <Route path="/" render={() => (<Redirect to="/dashboard" />)} />
  </Switch>
);

export default MainRouters;
