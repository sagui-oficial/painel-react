import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

import ResponsiveDialog from '../../components/ResponsiveDialog';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  handleToggleModal() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { open } = this.state;

    return (
      <div>
        <Button onClick={this.handleToggleModal}>Open Modal</Button>
        <ResponsiveDialog fullScreen={false} open={open} onClose={this.handleToggleModal} />
      </div>
    );
  }
}

export default HomePage;
