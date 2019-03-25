import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Paper, withStyles, Grid, TextField, Button,
} from '@material-ui/core';

import logo from '../../assets/images/logo.svg';
import './index.sass';

const user = {
  username: 'oi@sagui.app',
  password: '123456',
};

const styles = theme => ({
  logo: {
    maxWidth: '120px',
    width: '100%',
    margin: '0 auto 20px',
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit,
    maxWidth: '320px',
    width: '100%',
    margin: '3% auto 0',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: String(),
      password: String(),
      auth: false,
    };

    this.baseState = this.state;
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  onHandleChange({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  onHandleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;

    if (user.username === username
    && user.password === password) {
      this.setState({ auth: true });
    }
  }

  render() {
    const { classes } = this.props;
    const { username, password, auth } = this.state;

    return (
      !auth ? (
        <Paper className={classes.padding}>
          <form onSubmit={this.onHandleSubmit} className={classes.margin}>
            <Grid container spacing={8} alignItems="center">
              <Grid item md sm xs style={{ textAlign: 'center' }}>
                <img src={logo} className={classes.logo} alt="logo" />
              </Grid>
            </Grid>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item md sm xs>
                <TextField
                  name="username"
                  label="E-mail"
                  type="email"
                  placeholder="email@exemplo.com.br"
                  autoComplete="off"
                  value={username}
                  onChange={e => this.onHandleChange(e.target)}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  minLength="3"
                  fullWidth
                  autoFocus
                  required
                />
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item md sm xs>
                <TextField
                  name="password"
                  label="Senha"
                  type="password"
                  placeholder="******"
                  value={password}
                  onChange={e => this.onHandleChange(e.target)}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  minLength="6"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '20px' }}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                style={{ textTransform: 'none' }}
              >
                Entrar
              </Button>
            </Grid>
          </form>
        </Paper>
      ) : (
        <Redirect to="/guias" />
      )
    );
  }
}

Login.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(Login);
