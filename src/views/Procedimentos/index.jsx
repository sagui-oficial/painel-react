import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

const styles = theme => ({
  mainContainer: {
    textAlign: 'left',
  },
  divider: {
    ...theme.divider,
  },
});

const Procedimentos = (props) => {
  const { classes } = props;

  return (
    <div className={classes.mainContainer}>
      <Typography variant="h6" color="inherit">
        Procedimentos
      </Typography>
      <Divider className={classes.divider} />
    </div>
  );
};

Procedimentos.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(Procedimentos);
