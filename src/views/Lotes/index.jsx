import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import Master from '../../components/Master';

const styles = theme => ({
  divider: {
    ...theme.divider,
    marginBottom: 0,
  },
});

const Lotes = ({ title, classes }) => (
  <Master title={title}>
    <Grid container alignItems="center">
      <Typography variant="h6" color="inherit" noWrap>
        {title}
      </Typography>
    </Grid>
    <Divider className={classes.divider} />
  </Master>
);

Lotes.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.instanceOf(Object),
};

Lotes.defaultProps = {
  title: String(),
  classes: {},
};

export default withStyles(styles)(Lotes);
