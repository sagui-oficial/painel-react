import React, { Component } from 'react';

import {
  Button,
} from '@material-ui/core';

class PaidButton extends Component {
  PaidButton = React.createRef()

  state = {
    pago: false,
  }

  onHandleSetPaid = () => {
    this.setState(prevState => ({ pago: !prevState.pago }));
  }

  render() {
    const { pago } = this.state;

    return (
      <Button onClick={this.onHandleSetPaid}>
        {pago ? (
          <span style={{ color: '#7c00dd' }}>Pagar</span>
        ) : (
          <span style={{ color: '#3ea600' }}>Pago</span>
        )}
      </Button>
    );
  }
}

export default PaidButton;
