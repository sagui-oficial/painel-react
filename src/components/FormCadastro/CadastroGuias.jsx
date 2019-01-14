import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    maxWidth: '260px',
    width: '100%',
  },
  fullWidth: {
    maxWidth: '100%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class CadastroGuias extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleBtnCadastrar = this.handleBtnCadastrar.bind(this);
  }

  handleBtnCadastrar() {
    console.log(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      fullScreen, open, onClose, classes,
    } = this.props;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Cadastrar nova guia</DialogTitle>
        <DialogContent>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              required
              id="standard-name"
              label="Paciente"
              className={`${classes.textField} ${classes.fullWidth}`}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              required
              id="standard-name"
              label="Plano"
              className={classes.textField}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              required
              id="standard-name"
              label="Data vencimento"
              className={classes.textField}
              onChange={this.handleChange}
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Fechar
          </Button>
          <Button onClick={this.handleBtnCadastrar} variant="contained" color="primary">
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CadastroGuias.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withMobileDialog()(withStyles(styles)(CadastroGuias));
