import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Snackbar, IconButton } from '@material-ui/core';

import {
  Close as CloseIcon,
} from '@material-ui/icons';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

const Message = (props) => {
  const {
    open,
    text,
    classes,
    onHandleOnClose,
  } = props;

  return (
    <Snackbar
      open={open}
      message={<div id="message-id">{text}</div>}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={6000}
      onClose={onHandleOnClose}
      onExited={onHandleOnClose}
      ContentProps={{ 'aria-describedby': 'message-id' }}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onHandleOnClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};

Message.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  onHandleOnClose: PropTypes.func.isRequired,
  text: PropTypes.string,
  open: PropTypes.bool,
};

Message.defaultProps = {
  text: String(),
  open: false,
};

export default withStyles(styles)(Message);
