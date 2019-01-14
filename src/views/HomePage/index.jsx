import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ResponsiveDialog from '../../components/ResponsiveDialog';

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

    return (
      <div>
        <Typography variant="title" color="inherit">
          Home
        </Typography>
        {/* <Button variant="contained" color="secondary" to="/dashboard" component={Link}>Entrar</Button> */}
        <Button onClick={this.handleOpen}>Open Modal</Button>
        <ResponsiveDialog fullScreen={false} open={open} onClose={this.handleClose} />
      </div>
    );
  }
}

export default HomePage;
