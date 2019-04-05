import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import {
  withStyles, Grid, TextField, Button,
} from '@material-ui/core';

import { loginSubmit } from '../../actions/login';
import logo from '../../assets/images/logo.svg';
import background from '../../assets/images/bg-login.jpg';

const styles = theme => ({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom center',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  logo: {
    maxWidth: '120px',
    width: '100%',
    margin: '0 auto 20px',
  },
  form: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 2,
    width: '100%',
    maxWidth: '340px',
    height: '100%',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    fontSize: '11px',
    color: '#555',
    marginBottom: '0',
    marginTop: '5px',
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
      errorMessage: String(),
      loading: false,
    };

    this.baseState = this.state;
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  onHandleChange({ name, value }) {
    this.setState({
      [name]: value,
      errorMessage: '',
    });
  }

  async onHandleSubmit(e) {
    e.preventDefault();

    this.setState({ loading: true });

    const { username, password } = this.state;
    const { loginSubmit: propLoginSubmit } = this.props;

    const { type, message } = await propLoginSubmit(username, password);

    if (type === 'error') {
      this.setState({
        errorMessage: message,
        loading: false,
        password: '',
      });
    }
  }

  render() {
    const {
      username, password, errorMessage, loading,
    } = this.state;
    const { classes, auth, homeRoute } = this.props;

    if (auth) {
      return (
        <Redirect to={homeRoute} />
      );
    }

    return (
      <div className={classes.container}>
        <Helmet>
          <title>
            {'Sagui - Login'}
          </title>
        </Helmet>
        <form onSubmit={this.onHandleSubmit} className={classes.form}>
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
                placeholder="••••••"
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
          <p className={classes.small}>{errorMessage || 'Preencha todos os campos.'}</p>
          <Grid container justify="center" style={{ marginTop: '20px' }}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              style={{ textTransform: 'none' }}
              disabled={loading}
            >
              { loading ? 'Carregando...' : 'Entrar' }
            </Button>
          </Grid>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  loginSubmit: PropTypes.func.isRequired,
  homeRoute: PropTypes.string.isRequired,
  auth: PropTypes.string,
};

Login.defaultProps = {
  auth: String(),
};

const mapStateToProps = state => ({
  auth: state.firebase.auth.uid,
});

export default connect(mapStateToProps, { loginSubmit })(withStyles(styles)(Login));
