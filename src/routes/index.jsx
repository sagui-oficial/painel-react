import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PrivateRoute from '../components/PrivateRoute';
import dashboardRoutes from './dashbordRoutes';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import withRoot from '../withRoot';

const activeRouters = dashboardRoutes.filter(item => item.active);

// eslint-disable-next-line no-console
/* console.log(`${'%c'}

  ███████╗ █████╗  ██████╗ ██╗   ██╗██╗
  ██╔════╝██╔══██╗██╔════╝ ██║   ██║██║
  ███████╗███████║██║  ███╗██║   ██║██║
  ╚════██║██╔══██║██║   ██║██║   ██║██║
  ███████║██║  ██║╚██████╔╝╚██████╔╝██║
  ╚══════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝

  Sistema para gestão de guias odontológicas
`, 'font-family:monospace;color:#5b02c1;font-size:12px'); */

const MainRouters = ({ auth }) => (
  <BrowserRouter>
    <Switch>
      {activeRouters.map(itemList => [
        <PrivateRoute
          exact
          key={itemList.id}
          path={itemList.path}
          component={itemList.component}
          title={itemList.menuText}
          auth={auth}
        />,
        itemList.editMode && [
          <PrivateRoute
            exact
            path={`${itemList.path}/cadastrar`}
            component={itemList.editMode}
            title="Cadastrar"
            auth={auth}
          />,
          <PrivateRoute
            exact
            path={`${itemList.path}/:id`}
            component={itemList.editMode}
            title="Editar"
            auth={auth}
          />,
        ],
      ])}

      <PrivateRoute
        exact
        path="/signup"
        component={SignUp}
        title="Criar novo usuário"
        auth={auth}
      />

      <Route
        exact
        path="/"
        render={() => (
          <Login homeRoute={activeRouters[0].path} />
        )}
      />
    </Switch>
  </BrowserRouter>
);

MainRouters.propTypes = {
  auth: PropTypes.string,
};

MainRouters.defaultProps = {
  auth: String(),
};

const mapStateToProps = state => ({
  auth: state.firebase.auth.uid,
});

export default connect(mapStateToProps)(withRoot(MainRouters));
