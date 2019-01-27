/* global window */
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MATERIAL IMPORTS
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

// MATERIAL ICONS
import MenuIcon from '@material-ui/icons/Menu';

// LOCAL IMPORTS
import logo from '../assets/images/logo.svg';
import dashboardRoutes from '../routes/dashbordRoutes';

const drawerWidth = 240;

const styles = theme => ({
  logo: {
    maxWidth: '120px',
    width: '100%',
  },
  root: {
    display: 'flex',
  },
  appBar: {
    width: '100%',
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  activeListItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  toolbarContainer: {
    background: 'none',
    boxShadow: 'none',
    display: 'flex',
    justifyContent: 'space-between',
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
    position: 'relative',
    overflow: 'hidden',
    // height: '100vh',
  },
  mainContainer: {
    marginTop: '70px',
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.resizeFunction = this.resizeFunction.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeFunction);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction);
  }

  handleDrawerToggle() {
    const { mobileOpen } = this.state;
    this.setState({ mobileOpen: !mobileOpen });
  }

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  render() {
    const { mobileOpen } = this.state;
    const { classes, children } = this.props;
    const { location } = window;

    return (
      <div className={classes.root}>
        <CssBaseline />

        {/* MOBILE SIDEBAR */}
        <Hidden mdUp implementation="css">
          <Drawer
            className={classes.drawer}
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.handleDrawerToggle}
              onKeyDown={this.handleDrawerToggle}
            >
              <div className={`${classes.toolbar} ${classes.toolbarLogo}`}>
                <Typography variant="title" color="inherit">
                  <Link to="/dashboard">
                    <img src={logo} className={classes.logo} alt="logo" />
                  </Link>
                </Typography>
              </div>
              <Divider />
              <List>
                {dashboardRoutes.map(itemList => (
                  itemList.active && (
                    <ListItem
                      button
                      key={itemList.id}
                      to={itemList.path}
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
              <List>
                <Typography className={classes.menuTitle} variant="overline" color="textSecondary">
                  Configurações
                </Typography>
                <ListItem button>
                  <ListItemIcon>
                    <MenuIcon />
                  </ListItemIcon>
                  <ListItemText primary="Usuários" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <MenuIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dentistas" />
                </ListItem>
              </List>
            </div>
          </Drawer>
        </Hidden>

        {/* DESKTOP SIDEBAR */}
        <Hidden smDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={`${classes.toolbar} ${classes.toolbarLogo}`}>
              <Typography variant="title" color="inherit">
                <Link to="/dashboard">
                  <img src={logo} className={classes.logo} alt="logo" />
                </Link>
              </Typography>
            </div>
            <Divider />
            <List>
              {dashboardRoutes.map(itemList => (
                itemList.active && (
                  <ListItem
                    button
                    key={itemList.id}
                    to={itemList.path}
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
            <List>
              <Typography className={classes.menuTitle} variant="overline" color="textSecondary">
                Configurações
              </Typography>
              <ListItem button>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText primary="Usuários" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText primary="Dentistas" />
              </ListItem>
            </List>
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <AppBar position="absolute" color="inherit" className={classes.appBar}>
            <Toolbar className={classes.toolbarContainer}>
              {/* <Typography variant="title" color="inherit">
                <Link to="/dashboard">
                  <img src={logo} className={classes.logo} alt="logo" />
                </Link>
              </Typography> */}
              <Typography variant="title" color="inherit">
                {dashboardRoutes.map(itemList => (
                  itemList.path === location.pathname ? itemList.pageTitle : ''
                ))}
              </Typography>
              <Hidden mdUp implementation="css">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
            </Toolbar>
          </AppBar>
          <div className={classes.mainContainer}>
            {children}
          </div>
        </main>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(NavBar);
