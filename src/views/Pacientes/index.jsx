import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = {
  mainContainer: {
    textAlign: 'left',
  },
};

const Pacientes = (props) => {
  const { classes } = props;

  return (
    <div className={classes.mainContainer}>
      <Typography variant="title" color="inherit">
        Pacientes
      </Typography>
    </div>
  );
};

Pacientes.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(Pacientes);
