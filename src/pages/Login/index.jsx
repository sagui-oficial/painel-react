import React, { Component, Fragment } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;
    return (
      <Fragment>
        { !loading
          && (
            <div>Login...</div>
          )
        }
        { loading
          && (
            <div>You already are loged.</div>
          )
        }
      </Fragment>
    );
  }
}

export default Login;
