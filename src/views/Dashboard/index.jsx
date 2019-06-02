import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
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

const Dashboard = ({ title, classes }) => (
  <Master title={title}>
    <Grid container alignItems="center">
      <Typography variant="h6" color="inherit" noWrap>
        {title}
      </Typography>
    </Grid>
    <Divider className={classes.divider} />
  </Master>
);

Dashboard.propTypes = {
  title: PropTypes.string,
  classes: instanceOf(Object),
};

Dashboard.defaultProps = {
  title: String(),
  classes: {},
};

export default withStyles(styles)(Dashboard);
