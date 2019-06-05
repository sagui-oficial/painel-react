import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Loading from '../Loading';

class AlertModal extends Component {
  RefList = React.createRef()

  state = {
    loading: false,
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (prevProps.error !== error) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loading: false });
    }
  }

  onHandleDelete = (item) => {
    this.setState({ loading: true });
    const { onHandleDelete } = this.props;
    onHandleDelete(item);
  }

  render() {
    const {
      open,
      text,
      onHandleModal,
    } = this.props;

    const { loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <Dialog
          open={open}
          onClose={onHandleModal}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {text}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onHandleModal} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.onHandleDelete} color="primary" autoFocus>
              Deletar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertModal.propTypes = {
  onHandleModal: PropTypes.func.isRequired,
  onHandleDelete: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  text: PropTypes.string,
  open: PropTypes.bool,
};

AlertModal.defaultProps = {
  text: String(),
  open: false,
};

export default withMobileDialog()(AlertModal);
