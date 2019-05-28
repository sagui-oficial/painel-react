import React, { Component, Fragment } from 'react';
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
  MenuItem,
} from '@material-ui/core';

import Select from 'react-select';

import { loadPacientes } from '../../../actions/pacientes';
import {
  addGuia,
  loadGuiaDetail,
  updateGuia,
} from '../../../actions/guias';
import Message from '../../../components/Message';
import Loading from '../../../components/Loading';
import Master from '../../../components/Master';
import Breadcrumb from '../../../components/Breadcrumb';
import { Control, Option } from '../../../components/AutoComplete';
import { convertDatePicker, formatCurrency, fixDateOnSave } from '../../../helpers';

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
  state = {
    isBlocking: false,
    editing: false,
    loading: true,
    selectedName: null,
    breadcrumb: [
      { label: 'Guias', url: '/guias' },
    ],
    listStatus: [
      { label: 'Criada', value: 1 },
      { label: 'Concluída', value: 2 },
    ],
    valorTotal: 0,
    AllPacientes: [],
    sendGuia: {
      Status: 1,
      Numero: String(),
      Solicitacao: convertDatePicker(new Date()),
      Vencimento: convertDatePicker(new Date()),
      PlanoOperadora: {
        id: Number(),
        PublicID: String(),
        NomeFantasia: String(),
      },
      Paciente: {
        Nome: String(),
        CPF: String(),
        ListaPlanoOperadoraPaciente: String(),
        Anotacoes: String(),
        Email: String(),
        Funcao: String(),
        Id: Number(),
        Telefone: String(),
      },
      Procedimentos: [],
      Arquivos: [],
    },
    isValidField: {
      Numero: false,
      Nome: false,
      PlanoOperadora: false,
    },
    boxMessage: {
      open: false,
      text: '',
    },
  }

  baseState = this.state

  async componentDidMount() {
    await this.onHandlePageLoad();
    await this.onHandleLoadPacientes();
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
      loadGuiaDetail: propLoadGuiaDetail,
    } = this.props;

    const { sendGuia } = this.state;

    if (match.params.id) {
      await propLoadGuiaDetail(match.params.id);
      const { guia } = this.props;
      const getGuiaItem = Object.keys(guia).length > 0 ? guia : sendGuia;


      this.setState({
        editing: true,
        sendGuia: {
          ...getGuiaItem,
          Solicitacao: convertDatePicker(getGuiaItem.Solicitacao),
          Vencimento: convertDatePicker(getGuiaItem.Vencimento),
        },
      });
    }

    this.setState({ loading: false });
  }

  onHandleLoadPacientes = async () => {
    const { loadPacientes: propsLoadPacientes } = this.props;
    await propsLoadPacientes();

    const { pacientes, guia } = this.props;

    const newPlanSelectItem = pacientes.find(item => (
      item.PublicID === guia.Paciente.PublicID
    ));

    if (typeof newPlanSelectItem !== 'undefined') {
      this.setState({
        selectedName: {
          PublicID: newPlanSelectItem.PublicID,
          value: newPlanSelectItem.Nome,
          label: newPlanSelectItem.Nome,
        },
      });
    }

    this.setState({
      AllPacientes: pacientes,
    });
  }

  onHandleAdd = async () => {
    const {
      addGuia: propAddGuia,
      updateGuia: propUpdateGuia, history,
    } = this.props;

    const { sendGuia, editing } = this.state;

    this.setState({ loading: true });

    if (editing) {
      const { guia: { PublicID } } = this.props;
      await propUpdateGuia({
        ...sendGuia,
      }, PublicID);
      await this.onHandleMessage('Guia modificada.');
    } else {
      await propAddGuia({
        ...sendGuia,
        Solicitacao: fixDateOnSave(sendGuia.Solicitacao),
        Vencimento: fixDateOnSave(sendGuia.Vencimento),
      });
      await this.setState({ editing: true });
      await this.onHandleMessage('Guia adicionada.');
    }

    history.push('/guias');
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
    const { sendGuia } = this.state;

    this.setState({
      isBlocking: true,
      sendGuia: {
        ...sendGuia,
        [name]: value,
      },
    });
  }

  onHandleSelectPaciente = (target) => {
    const { sendGuia } = this.state;
    const { value, id } = target;

    this.setState({
      selectedName: target,
      sendGuia: {
        ...sendGuia,
        Paciente: {
          ...sendGuia.Paciente,
          Nome: value,
          PublicID: id,
        },
      },
    });
  }

  onHandleBlur = ({ value, name }) => {
    const { isValidField, sendGuia } = this.state;

    if (typeof isValidField[name] !== 'undefined') {
      this.setState({
        isValidField: {
          ...isValidField,
          [name]: value.trim().length === 0,
        },
      });
    }

    this.setState({
      sendGuia: {
        ...sendGuia,
        [name]: value.trim(),
      },
    });
  }

  onHandleValidateFields = (event) => {
    event.preventDefault();

    const { isValidField, sendGuia } = this.state;
    const setValidFields = {};

    Object.keys(isValidField).map((item) => {
      if (typeof sendGuia[item] === 'string') {
        setValidFields[item] = sendGuia[item].trim().length === 0;
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
      classes, title, match, error,
    } = this.props;

    const {
      breadcrumb, editing,
      boxMessage, isBlocking,
      sendGuia, listStatus,
      valorTotal, selectedName,
      isValidField, loading,
      AllPacientes,
    } = this.state;

    return (
      <Master title={`${title} guia`}>
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
            </Grid>

            <Divider className={classes.divider} />

            <Breadcrumb breadcrumb={[...breadcrumb, { label: title, url: match.params.id }]} />

            <form className={classes.form} noValidate autoComplete="off">
              <Grid container spacing={16}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    required
                    label="Número da guia"
                    name="Numero"
                    error={isValidField.Numero}
                    value={sendGuia.Numero}
                    onChange={e => this.onHandleTarget(e.target)}
                    onBlur={e => this.onHandleBlur(e.target)}
                    helperText="Digite o número da guia"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    select
                    value={sendGuia.Status}
                    onChange={e => this.onHandleTarget(e.target)}
                    label="Status"
                    name="Status"
                    margin="normal"
                    variant="outlined"
                  >
                    {listStatus.map(option => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    value={formatCurrency(valorTotal)}
                    label="Valor total"
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Data de solicitação"
                    name="Solicitacao"
                    type="date"
                    onChange={e => this.onHandleTarget(e.target)}
                    defaultValue={sendGuia.Solicitacao}
                    helperText="23/02/2019"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Data de vencimento"
                    name="Vencimento"
                    type="date"
                    onChange={e => this.onHandleTarget(e.target)}
                    defaultValue={sendGuia.Vencimento}
                    helperText="23/02/2019"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>

              <br />

              <Typography variant="h6" color="inherit" noWrap>
                Informação sobre o paciente
              </Typography>

              <Grid container spacing={16}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{
                    position: 'relative',
                    zIndex: '2',
                  }}
                >
                  <Select
                    label="Nome do paciente"
                    options={
                      AllPacientes.map(suggestion => ({
                        id: suggestion.PublicID,
                        value: suggestion.Nome,
                        label: suggestion.Nome,
                      }))}
                    components={{ Control, Option }}
                    value={selectedName}
                    onChange={this.onHandleSelectPaciente}
                    placeholder="Selecione..."
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    disabled
                    label="CPF"
                    name="CPF"
                    margin="normal"
                    variant="outlined"
                    helperText="020.000.009-92"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    disabled
                    label="Telefone"
                    name="Telefone"
                    margin="normal"
                    variant="outlined"
                    helperText="(11) 9000-0000"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    disabled
                    label="E-mail"
                    name="Email"
                    margin="normal"
                    variant="outlined"
                    helperText="email@email.com.br"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    disabled
                    label="Plano/Operadora"
                    name="NomeFantasia"
                    value={sendGuia.PlanoOperadora.NomeFantasia}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>

              <br />

              <Typography variant="h6" color="inherit" noWrap>
                Adicionar procedimentos
              </Typography>

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
          </Fragment>
        ) : (
          <Loading />
        )}
      </Master>
    );
  }
}

GuiaForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  pacientes: PropTypes.instanceOf(Object),
  guia: PropTypes.instanceOf(Object),
  addGuia: PropTypes.func.isRequired,
  loadGuiaDetail: PropTypes.func.isRequired,
  updateGuia: PropTypes.func.isRequired,
  loadPacientes: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  title: PropTypes.string,
};

GuiaForm.defaultProps = {
  guia: {},
  pacientes: [],
  title: String(),
};

const mapStateToProps = state => ({
  guia: state.guiasReducer.guia,
  pacientes: state.pacientesReducer.pacientes,
  error: state.guiasReducer.fetchError,
});

export default connect(mapStateToProps, {
  addGuia, loadGuiaDetail, updateGuia, loadPacientes,
})(withStyles(styles)(GuiaForm));
