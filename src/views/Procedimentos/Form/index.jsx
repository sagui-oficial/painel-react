import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';

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
import Loading from '../../../components/Loading';

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
  state = {
    isBlocking: false,
    editing: false,
    loading: true,
    breadcrumb: [
      { label: 'Procedimentos', url: '/procedimentos' },
    ],
    sendProcedimento: {
      Codigo: String(),
      NomeProcedimento: String(),
      ValorProcedimento: String(),
      Exigencias: String(),
      Anotacoes: String(),
    },
    isValidField: {
      Codigo: false,
      NomeProcedimento: false,
      ValorProcedimento: false,
      Exigencias: false,
      Anotacoes: false,
    },
    boxMessage: {
      open: false,
      text: '',
    },
  }

  baseState = this.state

  async componentDidMount() {
    await this.onHandlePageLoad();
    this.onHandleMessage();
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (prevProps.error !== error) {
      this.onHandleMessage('Conectado.');
    }
  }

  onHandlePageLoad = async () => {
    const {
      match,
      loadProcedimentoDetail: propLoadProcedimentoDetail,
    } = this.props;

    const { sendProcedimento } = this.state;

    if (match.params.id) {
      await propLoadProcedimentoDetail(match.params.id);
      const { procedimento } = this.props;

      this.setState({
        editing: true,
        sendProcedimento: Object.keys(procedimento).length > 0 ? procedimento : sendProcedimento,
      });
    }

    this.setState({ loading: false });
  }

  onHandleAdd = async () => {
    const { sendProcedimento, editing } = this.state;
    const {
      addProcedimento: propAddProcedimento,
      updateProcedimento: propUpdateProcedimento, history,
    } = this.props;

    this.setState({ loading: true });

    if (editing) {
      const { procedimento: { PublicID } } = this.props;
      await propUpdateProcedimento({
        ...sendProcedimento,
      }, PublicID);
      await this.onHandleMessage('Procedimento modificado.');
    } else {
      await propAddProcedimento({
        ...sendProcedimento,
      });

      await this.setState({ editing: true });
      await this.onHandleMessage('Procedimento adicionado.');
    }

    history.push('/procedimentos');
  }

  onHandleMessage = (text) => {
    const { error } = this.props;

    if (error.indexOf('Error') > -1) {
      this.setState({ boxMessage: { open: true, text: error } });
      return;
    }

    if (typeof text !== 'undefined') {
      this.setState({ boxMessage: { open: true, text } });
    }
  }

  onHandleOnClose = () => {
    const { boxMessage } = this.state;
    const { text } = boxMessage;

    this.setState({
      boxMessage: { open: false, text },
    });
  }

  onHandleTarget = ({ value, name }) => {
    const { sendProcedimento } = this.state;

    this.setState({
      isBlocking: true,
      sendProcedimento: {
        ...sendProcedimento,
        [name]: name === 'Codigo' ? value.trim().toUpperCase() : value,
      },
    });
  }

  onHandleBlur = ({ value, name }) => {
    const { isValidField, sendProcedimento } = this.state;

    if (typeof isValidField[name] !== 'undefined') {
      this.setState({
        isValidField: {
          ...isValidField,
          [name]: value.trim().length === 0,
        },
      });
    }

    this.setState({
      sendProcedimento: {
        ...sendProcedimento,
        [name]: name === 'Codigo' ? value.trim().toUpperCase() : value.trim(),
      },
    });
  }

  onHandleValidateFields = (event) => {
    event.preventDefault();

    const { isValidField, sendProcedimento } = this.state;
    const setValidFields = {};

    Object.keys(isValidField).map((item) => {
      if (typeof sendProcedimento[item] === 'string') {
        setValidFields[item] = sendProcedimento[item].trim().length === 0;
      }
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

  render() {
    const {
      classes, error, title, match,
    } = this.props;

    const {
      sendProcedimento, breadcrumb,
      editing, boxMessage, isValidField,
      isBlocking, loading,
    } = this.state;

    return (
      <Master title={`${title} procedimento`}>
        {!loading ? (
          <Fragment>
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
            </Grid>

            <Divider className={classes.divider} />

            <Breadcrumb breadcrumb={[...breadcrumb, { label: title, url: match.params.id }]} />

            <form className={classes.form} noValidate autoComplete="off">
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Valor do procedimento"
                    name="ValorProcedimento"
                    required
                    error={isValidField.ValorProcedimento}
                    value={sendProcedimento.ValorProcedimento}
                    onChange={e => this.onHandleTarget(e.target)}
                    onBlur={e => this.onHandleBlur(e.target)}
                    helperText="Digite o valor do procedimento"
                    type="number"
                    placeholder="1.000,00"
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
                    required
                    error={isValidField.Exigencias}
                    value={sendProcedimento.Exigencias && sendProcedimento.Exigencias.replace(/\n/gim, ' ')}
                    onChange={e => this.onHandleTarget(e.target)}
                    onBlur={e => this.onHandleBlur(e.target)}
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
                    required
                    error={isValidField.Anotacoes}
                    value={sendProcedimento.Anotacoes && sendProcedimento.Anotacoes.replace(/\n/gim, ' ')}
                    onChange={e => this.onHandleTarget(e.target)}
                    onBlur={e => this.onHandleBlur(e.target)}
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
          </Fragment>
        ) : (
          <Loading />
        )}
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
