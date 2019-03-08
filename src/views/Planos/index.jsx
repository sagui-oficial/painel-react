import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import { Divider, Typography } from '@material-ui/core';

const styles = theme => ({
  mainContainer: {
    textAlign: 'left',
  },
  divider: {
    ...theme.divider,
  },
});

const Planos = (props) => {
  const { classes } = props;

  return (
    <div className={classes.mainContainer}>
      <Typography variant="h6" color="inherit">
        Planos
      </Typography>
      <Divider className={classes.divider} />
    </div>
  );
};

Planos.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(Planos);
