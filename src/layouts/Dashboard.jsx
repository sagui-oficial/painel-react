import React, { Fragment } from 'react';
import NavBar from '../components/NavBar';
import MainRouters from '../routes';

const DashboardLayout = () => (
  <Fragment>
    <NavBar>
      <MainRouters />
    </NavBar>
  </Fragment>
);

export default DashboardLayout;
