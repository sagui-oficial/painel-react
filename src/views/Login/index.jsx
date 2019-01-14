import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = {
  mainContainer: {
    textAlign: 'left',
  },
};

const Login = (props) => {
  const { classes } = props;

  return (
    <div className={classes.mainContainer}>
      <Typography variant="title" color="inherit">
        Login
      </Typography>
    </div>
  );
};

Login.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(Login);
