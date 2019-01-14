import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = {
  mainContainer: {
    textAlign: 'left',
  },
};

const Procedimentos = (props) => {
  const { classes } = props;

  return (
    <div className={classes.mainContainer}>
      <Typography variant="title" color="inherit">
        Procedimentos
      </Typography>
    </div>
  );
};

Procedimentos.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(Procedimentos);
