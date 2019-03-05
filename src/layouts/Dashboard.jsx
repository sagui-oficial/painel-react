import React, { Fragment } from 'react';
import NavBar from '../components/NavBar';
import MainRouters from '../routes';

import withRoot from '../withRoot';

const DashboardLayout = () => (
  <Fragment>
    <NavBar>
      <MainRouters />
    </NavBar>
  </Fragment>
);

export default withRoot(DashboardLayout);
