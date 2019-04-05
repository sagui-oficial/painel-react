import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component, auth, title, ...rest
}) => (
  <Route
    {...rest}
    render={
      props => (auth ? (
        <Component {...props} title={title} />
      ) : (
        <Redirect to="/" />
      ))
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.string,
  title: PropTypes.string,
};

PrivateRoute.defaultProps = {
  auth: String(),
  title: String(),
};

export default PrivateRoute;
