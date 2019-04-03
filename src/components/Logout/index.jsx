import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  IconButton, Card, CardHeader, Avatar,
  Grow, ClickAwayListener, Paper, Popper, CardActions, Button,
} from '@material-ui/core';

import { logout } from '../../actions/login';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  card: {
    maxWidth: 400,
  },
  avatar: {
    backgroundColor: '#3d3d3d',
  },
  avatar2: {
    backgroundColor: theme.roundedBtn.borderColor,
    display: 'none',
  },
});

class MenuListComposition extends Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes, logout: propLogout, profile } = this.props;
    const { open } = this.state;
    const { name, email } = profile;

    return (
      <div className={classes.root}>
        <IconButton
          buttonRef={(node) => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'material-appbar' : undefined}
          aria-haspopup="true"
          color="inherit"
          onClick={this.handleToggle}
          disableRipple
        >
          <Avatar aria-label={name} className={classes.avatar}>
            {name && name.substring(0, 1).toUpperCase()}
          </Avatar>
        </IconButton>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          style={{ zIndex: 1102 }}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <Card className={classes.card}>
                    <CardHeader
                      style={{ paddingBottom: '0' }}
                      titleTypographyProps={{ style: { fontSize: '16px' } }}
                      subheaderTypographyProps={{ style: { fontSize: '14px' } }}
                      title={name}
                      subheader={email}
                    />
                    <CardActions>
                      <Button
                        onClick={propLogout}
                        component={NavLink}
                        to="/"
                        size="small"
                        color="default"
                      >
                        Sair
                      </Button>
                    </CardActions>
                  </Card>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.firebase.profile,
});

export default connect(mapStateToProps, { logout })(withStyles(styles)(MenuListComposition));
