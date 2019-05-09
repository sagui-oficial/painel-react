import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  Grid,
  TextField,
  Divider,
} from '@material-ui/core';

import Message from '../../../components/Message';
import Master from '../../../components/Master';
import Breadcrumb from '../../../components/Breadcrumb';

const styles = theme => ({
  divider: {
    ...theme.divider,
    marginBottom: theme.spacing.unit * 1.2,
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

class GuiaForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBlocking: false,
      editing: false,
      breadcrumb: [
        { label: 'Guias', url: '/guias' },
      ],
      boxMessage: {
        open: false,
        text: '',
      },
    };

    this.baseState = this.state;

    this.onHandleMessage = this.onHandleMessage.bind(this);
    this.onHandleOnClose = this.onHandleOnClose.bind(this);
  }

  componentDidMount() {
    this.onHandleMessage();
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (prevProps.error !== error) {
      this.onHandleMessage('Conectado.');
    }
  }

  onHandleMessage(text) {
    const { error } = this.props;

    if (error.indexOf('Error') > -1) {
      this.setState({ boxMessage: { open: true, text: error } });
      return;
    }

    if (typeof text !== 'undefined') {
      this.setState({ boxMessage: { open: true, text } });
    }
  }

  onHandleOnClose() {
    const { boxMessage } = this.state;
    const { text } = boxMessage;

    this.setState({
      boxMessage: { open: false, text },
    });
  }

  render() {
    const {
      classes, title,
      match, error,
    } = this.props;

    const {
      breadcrumb, editing,
      boxMessage, isBlocking,
    } = this.state;

    return (
      <Master title={`${title} guia`}>
        <Message
          text={boxMessage.text}
          open={boxMessage.open}
          onHandleOnClose={this.onHandleOnClose}
        />
        <Prompt
          when={isBlocking}
          message="Você tem modificações que não foram salvas, deseja realmente sair?"
        />
        <Grid container alignItems="center">
          <Typography variant="h6" color="inherit" noWrap>
            {editing ? 'Editar' : 'Cadastrar'}
            {' '}
            guia
          </Typography>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            size="medium"
            className={classes.addBtn}
            disabled={!!error}
            onClick={this.onHandleValidateFields}
          >
            Salvar
          </Button>
          {editing && (
            <Button
              variant="outlined"
              color="primary"
              size="medium"
              className={classes.addBtn}
              disabled={!!error}
              onClick={this.onHandleAddNew}
            >
              +Novo
            </Button>
          )}
        </Grid>

        <Divider className={classes.divider} />

        <Breadcrumb breadcrumb={[...breadcrumb, { label: title, url: match.params.id }]} />

        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={16}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                label="Número da guia"
                name="Numero"
                // error={isValidField.Numero}
                // value={sendPaciente.Numero}
                // onChange={e => this.onHandleTarget(e.target)}
                // onBlur={e => this.onHandleBlur(e.target)}
                helperText="Digite o número da guia"
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="outlined"
            color="primary"
            size="medium"
            className={`${classes.addBtn} footerBtn`}
            onClick={this.onHandleValidateFields}
            disabled={!!error}
          >
            Salvar
          </Button>
        </form>
      </Master>
    );
  }
}


GuiaForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.string.isRequired,
  title: PropTypes.string,
};

GuiaForm.defaultProps = {
  title: String(),
};

const mapStateToProps = state => ({
  error: state.guiasReducer.fetchError,
});

export default connect(mapStateToProps, {})(withStyles(styles)(GuiaForm));
