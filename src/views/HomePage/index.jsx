import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import logo from '../../assets/images/logo.svg';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import ResponsiveDialog from '../../components/ResponsiveDialog';

const style = {
  grid: {
    margin: '0 !important',
    width: 'unset',
  },
};

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <Grid container spacing={16} className={classes.grid}>
          <Grid item sm={6}>
            <Button variant="contained" color="secondary" to="/dashboard" component={Link}>
              Entrar
            </Button>
          </Grid>
          <Grid item sm={6}>
            <Button onClick={this.handleOpen}>Open Modal</Button>
          </Grid>
        </Grid>
        <ResponsiveDialog fullScreen={false} open={open} onClose={this.handleClose} />
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(HomePage);
