/* global window */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Helmet } from 'react-helmet';

import {
  CssBaseline,
  Hidden,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  SwipeableDrawer,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import AddToPhotos from '@material-ui/icons/AddToPhotos';

import logo from '../../assets/images/logo.svg';
import dashboardRoutes from '../../routes/dashbordRoutes';
import Logout from '../Logout';

const drawerWidth = 240;

const styles = theme => ({
  logo: {
    width: '100%',
    display: 'block',
    margin: 'auto',
  },
  root: {
    display: 'flex',
  },
  linkLogo: {
    width: '100%',
    maxWidth: '120px',
    display: 'block',
    fontSize: '0',
  },
  boxProfile: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: '1',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    left: drawerWidth,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      left: '0',
    },
  },
  activeListItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    '&:active, &:focus, &:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
  },
  toolbarContainer: {
    background: 'none',
    boxShadow: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuTitle: {
    padding: '0 15px',
    textAlign: 'center',
  },
  toolbar: theme.mixins.toolbar,
  toolbarLogo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& a': {
      display: 'inline-block',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingBottom: '60px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexGrow: 'unset',
    },
  },
  mainContainer: {
    marginTop: theme.spacing.unit * 8,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 6,
    },
  },
});

class NavBar extends Component {
  state = {
    menu: {
      type: 'permanent',
      open: false,
    },
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeFunction);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction);
  }

  handleDrawerToggle = () => {
    const { menu } = this.state;
    this.setState({
      menu: {
        open: !menu.open,
      },
    });
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({
        menu: {
          type: 'permanent',
          open: true,
        },
      });
    } else {
      this.setState({
        menu: {
          type: 'temporary',
          open: false,
        },
      });
    }
  }

  render() {
    const { menu } = this.state;
    const {
      classes, children, title, profile,
    } = this.props;

    const { type: typeAccount } = profile;

    return (
      <div className={classes.root}>
        <Helmet>
          <title>
            {title || 'Sagui'}
          </title>
        </Helmet>

        <CssBaseline />

        {/* DESKTOP SIDEBAR */}
        <Hidden smDown implementation="css">
          <SwipeableDrawer
            className={classes.drawer}
            variant={menu.type}
            anchor="left"
            open={menu.open}
            onClose={this.handleDrawerToggle}
            onOpen={this.handleDrawerToggle}
            disableSwipeToOpen
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={`${classes.toolbar} ${classes.toolbarLogo}`}>
              <Link to="/" className={classes.linkLogo}>
                <img src={logo} className={classes.logo} alt="logo" />
              </Link>
            </div>
            <Divider />
            <List>
              <Typography className={classes.menuTitle} variant="overline" color="textSecondary">
                Navegação
              </Typography>
              {dashboardRoutes.map(itemList => (
                itemList.active && (
                  <ListItem
                    button
                    key={itemList.id}
                    to={itemList.path}
                    onClick={this.resizeFunction}
                    activeClassName={classes.activeListItem}
                    component={NavLink}
                  >
                    <ListItemIcon>
                      <itemList.icon />
                    </ListItemIcon>
                    <ListItemText primary={itemList.menuText} />
                  </ListItem>
                )
              ))}
            </List>
            <Divider />
            {typeAccount === 'admin' && (
              <List>
                <Typography className={classes.menuTitle} variant="overline" color="textSecondary">
                  Configurações
                </Typography>
                <ListItem
                  button
                  to="/signup"
                  onClick={this.resizeFunction}
                  activeClassName={classes.activeListItem}
                  component={NavLink}
                >
                  <ListItemIcon>
                    <AddToPhotos />
                  </ListItemIcon>
                  <ListItemText primary="Novo usuário" />
                </ListItem>
              </List>
            )}
          </SwipeableDrawer>
        </Hidden>
        <main className={classes.content}>
          <AppBar position="fixed" color="inherit" className={classes.appBar}>
            <Toolbar className={classes.toolbarContainer}>
              <Hidden mdUp implementation="css">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Hidden mdUp implementation="css">
                <Link to="/" className={classes.linkLogo}>
                  <img src={logo} className={classes.logo} alt="logo" />
                </Link>
              </Hidden>
              <div className={classes.boxProfile}>
                <Logout />
              </div>
            </Toolbar>
          </AppBar>
          <div className={classes.mainContainer}>
            {children && (children)}
          </div>
        </main>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
};

NavBar.defaultProps = {
  title: String(),
  children: null,
};

const mapStateToProps = state => ({
  profile: state.firebase.profile,
});

export default connect(mapStateToProps)(withStyles(styles)(NavBar));
