import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import dashboardRoutes from './dashbordRoutes';
import Login from '../views/Login';

import GuiaDetail from '../views/Guias/Detail';
import Pacientes from '../views/Pacientes';

import GuiaForm from '../views/Guias/Form';
import PlanoForm from '../views/Planos/Form';
import ProcedimentoForm from '../views/Procedimentos/Form';

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
    <Route exact path="/guias/criar" component={GuiaForm} />
    <Route exact path="/guias/:id" component={GuiaDetail} />

    {/* PACIENTES */}
    <Route exact path="/pacientes/criar" component={Pacientes} />
    <Route exact path="/pacientes/:id" component={Pacientes} />

    {/* PLANOS */}
    <Route exact path="/planos/criar" component={PlanoForm} />
    <Route exact path="/planos/:id" component={PlanoForm} />

    {/* PROCEDIMENTOS */}
    <Route exact path="/procedimentos/criar" component={ProcedimentoForm} />
    <Route exact path="/procedimentos/:id" component={ProcedimentoForm} />

    {/* 404 */}
    <Route path="/" render={() => (<Redirect to="/dashboard" />)} />
  </Switch>
);

export default MainRouters;
