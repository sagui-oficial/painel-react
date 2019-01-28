import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Guias from '../../views/Guias/List';

describe('View Guias', () => {
  it('Should render component', () => {
    expect(withStyles(<Guias />)).toHaveLength(1);
  });
});
