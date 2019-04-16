import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  Grid,
  Divider,
  TextField,
} from '@material-ui/core';

import {
  addProcedimento, loadProcedimentoDetail,
  updateProcedimento,
} from '../../../actions/procedimentos';
import Master from '../../../components/Master';
import Breadcrumb from '../../../components/Breadcrumb';
import Message from '../../../components/Message';

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

class ProcedimentoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBlocking: false,
      editing: false,
      breadcrumb: [
        { label: 'Procedimentos', url: '/procedimentos' },
      ],
      sendProcedimento: {
        Status: 1,
        Codigo: String(),
        NomeProcedimento: String(),
        Exigencias: String(),
        Anotacoes: String(),
      },
      isValidField: {
        Codigo: false,
        NomeProcedimento: false,
      },
      boxMessage: {
        open: false,
        text: '',
      },
    };

    this.baseState = this.state;

    this.onHandleAdd = this.onHandleAdd.bind(this);
    this.onHandleTarget = this.onHandleTarget.bind(this);
    this.onHandleBlur = this.onHandleBlur.bind(this);
    this.onHandleValidateFields = this.onHandleValidateFields.bind(this);
    this.onHandlePageLoad = this.onHandlePageLoad.bind(this);
    this.onHandleMessage = this.onHandleMessage.bind(this);
    this.onHandleOnClose = this.onHandleOnClose.bind(this);
    this.onHandleAddNew = this.onHandleAddNew.bind(this);
  }

  componentDidMount() {
    this.onHandlePageLoad();
    this.onHandleMessage();
  }

  componentDidUpdate(prevProps) {
    const { procedimento, error } = this.props;

    if (prevProps.procedimento !== procedimento) {
      this.onHandleSendProcedimento(procedimento);
    }

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

  onHandleAddNew() {
    const { history } = this.props;
    history.push('/procedimentos/cadastrar');
    this.setState(this.baseState);
  }

  onHandleSendProcedimento(procedimento) {
    this.setState({
      sendProcedimento: procedimento,
    });
  }

  onHandlePageLoad() {
    const {
      match,
      loadProcedimentoDetail: propLoadProcedimentoDetail,
    } = this.props;

    if (match.params.id) {
      propLoadProcedimentoDetail(match.params.id);

      this.setState({
        editing: true,
      });
    }
  }

  onHandleTarget({ value, name }) {
    const { sendProcedimento } = this.state;

    this.setState({
      isBlocking: true,
      sendProcedimento: {
        ...sendProcedimento,
        [name]: name === 'Codigo' ? value.trim().toUpperCase() : value,
      },
    });
  }

  onHandleBlur({ value, name }) {
    const { isValidField, sendProcedimento } = this.state;

    this.setState({
      isValidField: {
        ...isValidField,
        [name]: value.trim().length === 0,
      },
      sendProcedimento: {
        ...sendProcedimento,
        [name]: name === 'Codigo' ? value.trim().toUpperCase() : value.trim(),
      },
    });
  }

  onHandleValidateFields(event) {
    event.preventDefault();

    const { isValidField, sendProcedimento } = this.state;
    const setValidFields = {};

    Object.keys(isValidField).map((item) => {
      setValidFields[item] = sendProcedimento[item].trim().length === 0;
      return setValidFields;
    });

    this.setState({
      ...isValidField,
      isValidField: setValidFields,
      isBlocking: false,
    });

    const countAll = Object.keys(setValidFields).length;
    const countTrues = Object.values(setValidFields).filter(item => item === false);

    if (countAll === countTrues.length) {
      this.onHandleAdd();
    } else {
      this.onHandleMessage('Preencha todos os campos.');
    }
  }

  async onHandleAdd() {
    const PublicID = uuidv1();
    const { sendProcedimento, editing } = this.state;

    const {
      addProcedimento: propAddProcedimento,
      updateProcedimento: propUpdateProcedimento, history,
    } = this.props;

    if (editing) {
      await propUpdateProcedimento({
        ...sendProcedimento,
      }, sendProcedimento.id);

      this.onHandleMessage('Procedimento modificado.');
    } else {
      await propAddProcedimento({
        ...sendProcedimento,
        id: PublicID,
        PublicID,
      });

      this.setState({ editing: true });
      this.onHandleMessage('Procedimento adicionado.');
      history.push(`/procedimentos/${PublicID}`);
    }
  }

  render() {
    const {
      classes, error, title, match,
    } = this.props;
    const {
      sendProcedimento, breadcrumb,
      editing, boxMessage, isValidField,
      isBlocking,
    } = this.state;

    return (
      <Master title={`${title} procedimento`}>
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
            procedimento
          </Typography>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            size="medium"
            disabled={!!error}
            className={classes.addBtn}
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

        <form
          noValidate
          autoComplete="off"
          className={classes.form}
        >
          <Grid container spacing={16}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Código"
                name="Codigo"
                required
                error={isValidField.Codigo}
                value={sendProcedimento.Codigo}
                onChange={e => this.onHandleTarget(e.target)}
                onBlur={e => this.onHandleBlur(e.target)}
                helperText="Digite o código"
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing={16}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Nome do procedimento"
                name="NomeProcedimento"
                required
                error={isValidField.NomeProcedimento}
                value={sendProcedimento.NomeProcedimento}
                onChange={e => this.onHandleTarget(e.target)}
                onBlur={e => this.onHandleBlur(e.target)}
                helperText="Digite o nome do procedimento."
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing={16}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Exigências"
                name="Exigencias"
                multiline
                rows="4"
                rowsMax="10"
                value={sendProcedimento.Exigencias && sendProcedimento.Exigencias.replace(/\n/gim, ' ')}
                onChange={e => this.onHandleTarget(e.target)}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Anotações"
                name="Anotacoes"
                multiline
                rows="4"
                rowsMax="10"
                value={sendProcedimento.Anotacoes && sendProcedimento.Anotacoes.replace(/\n/gim, ' ')}
                onChange={e => this.onHandleTarget(e.target)}
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
            disabled={!!error}
            className={`${classes.addBtn} footerBtn`}
            onClick={this.onHandleValidateFields}
          >
            Salvar
          </Button>
        </form>
      </Master>
    );
  }
}

ProcedimentoForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  procedimento: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object).isRequired,
  addProcedimento: PropTypes.func.isRequired,
  updateProcedimento: PropTypes.func.isRequired,
  loadProcedimentoDetail: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  title: PropTypes.string,
};

ProcedimentoForm.defaultProps = {
  procedimento: {},
  title: String(),
};

const mapStateToProps = state => ({
  procedimento: state.procedimentosReducer.procedimento,
  error: state.procedimentosReducer.fetchError,
});

export default connect(mapStateToProps, {
  addProcedimento, loadProcedimentoDetail, updateProcedimento,
})(withStyles(styles)(ProcedimentoForm));
