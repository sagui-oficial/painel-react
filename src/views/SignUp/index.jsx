import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../actions/login';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: String(),
      username: String(),
      password: String(),
      loading: false,
    };

    this.baseState = this.state;

    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  async onHandleSubmit(e) {
    e.preventDefault();

    const { fullname, username, password } = this.state;
    const { signup: propSignup } = this.props;

    this.setState({ loading: true });

    const { type, message } = await propSignup({
      name: fullname, email: username, password,
    });

    console.warn(type, message);

    this.setState({ loading: false });

    this.resetForm();
  }

  onHandleChange({ name, value }) {
    this.setState({ [name]: value });
  }

  resetForm() {
    this.setState(this.baseState);
  }

  render() {
    const {
      username, password, fullname, loading,
    } = this.state;

    return (
      <div id="login">
        <div id="box">
          <form onSubmit={e => this.onHandleSubmit(e)}>
            <input
              type="text"
              className="full"
              name="fullname"
              onChange={e => this.onHandleChange(e.target)}
              value={fullname}
              placeholder="name"
              autoComplete="off"
              required
              minLength="3"
            />

            <input
              type="text"
              className="full"
              name="username"
              onChange={e => this.onHandleChange(e.target)}
              value={username}
              placeholder="email"
              autoComplete="off"
              required
              minLength="3"
            />

            <input
              type="password"
              className="full"
              name="password"
              onChange={e => this.onHandleChange(e.target)}
              value={password}
              autoComplete="new-password"
              placeholder="password"
              required
              minLength="6"
            />

            <div id="login-actions">
              <button type="submit" className="blue-theme" disabled={loading}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
};

export default connect(null, { signup })(SignUp);
