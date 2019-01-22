import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Dashboard from '../../views/Dashboard';

describe('View Dashboard', () => {
  it('Should render component', () => {
    expect(withStyles(<Dashboard />)).toHaveLength(1);
  });
});
