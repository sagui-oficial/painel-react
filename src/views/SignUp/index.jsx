import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
} from '@material-ui/core';

import { signup } from '../../actions/login';
import Master from '../../components/Master';
import Loading from '../../components/Loading';
import Message from '../../components/Message';

const styles = theme => ({
  divider: {
    ...theme.divider,
    marginBottom: 0,
  },
  form: {
    marginTop: theme.spacing.unit * 2,
  },
  addBtn: {
    ...theme.roundedBtn,
    marginLeft: '1.5rem',
    '&.footerBtn': {
      marginLeft: 0,
      marginTop: theme.spacing.unit * 5,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0',
      marginTop: '0.5rem',
      width: '100%',
    },
  },
});

class SignUp extends Component {
  state = {
    fullname: String(),
    username: String(),
    password: String(),
    loading: false,
    boxMessage: {
      open: false,
      text: '',
    },
  }

  baseState = this.state

  onHandleSubmit = async (e) => {
    e.preventDefault();

    const {
      fullname,
      username,
      password,
    } = this.state;

    if (
      fullname
      && username
      && password
    ) {
      const { signup: propSignup } = this.props;
      this.setState({ loading: true });
      const { message } = await propSignup({
        name: fullname,
        email: username,
        password,
      });
      await this.setState({ loading: false });
      await this.resetForm();
      await this.onHandleMessage(message);
    } else {
      this.onHandleMessage('Preencha todos os campos.');
    }
  }

  onHandleChange = ({ name, value }) => {
    this.setState({ [name]: value });
  }

  onHandleMessage = (text) => {
    if (typeof text !== 'undefined') {
      this.setState({ boxMessage: { open: true, text } });
    }
  }

  onHandleOnClose = () => {
    const { boxMessage } = this.state;
    const { text } = boxMessage;

    this.setState({
      boxMessage: { open: false, text },
    });
  }

  resetForm() {
    this.setState(this.baseState);
  }

  render() {
    const {
      username,
      password,
      fullname,
      loading,
      boxMessage,
    } = this.state;

    const { profile, title, classes } = this.props;

    if (profile.type && profile.type === 'admin') {
      return (
        <Master title={title}>
          <Fragment>
            <Message
              text={boxMessage.text}
              open={boxMessage.open}
              onHandleOnClose={this.onHandleOnClose}
            />
            <Grid container alignItems="center">
              <Typography variant="h6" color="inherit" noWrap>
                {title}
              </Typography>
            </Grid>
            <Divider className={classes.divider} />
            {!loading ? (
              <form
                onSubmit={e => this.onHandleSubmit(e)}
                className={classes.form}
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      type="text"
                      name="fullname"
                      onChange={e => this.onHandleChange(e.target)}
                      value={fullname}
                      placeholder="Nome do usuário"
                      autoComplete="off"
                      required
                      minLength="3"
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      type="text"
                      name="username"
                      onChange={e => this.onHandleChange(e.target)}
                      value={username}
                      placeholder="E-mail"
                      autoComplete="off"
                      required
                      minLength="3"
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      type="password"
                      name="password"
                      onChange={e => this.onHandleChange(e.target)}
                      value={password}
                      autoComplete="new-password"
                      placeholder="Senha"
                      required
                      minLength="6"
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  size="medium"
                  disabled={loading}
                  className={`${classes.addBtn} footerBtn`}
                  onClick={this.onHandleValidateFields}
                >
                  Sign Up
                </Button>
              </form>
            ) : (
              <Loading />
            )}
          </Fragment>
        </Master>
      );
    }

    return <Redirect to="/" />;
  }
}

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
  profile: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string,
};

SignUp.defaultProps = {
  title: String(),
};

const mapStateToProps = state => ({
  profile: state.firebase.profile,
});

export default connect(mapStateToProps, { signup })(withStyles(styles)(SignUp));
