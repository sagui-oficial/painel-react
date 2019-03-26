import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => (auth ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    ))
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.string,
};

PrivateRoute.defaultProps = {
  auth: String(),
};

export default PrivateRoute;
