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
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';

import { Delete as DeleteIcon } from '@material-ui/icons';
import Select from 'react-select';

import { loadPacientes } from '../../../actions/pacientes';
import { loadProcedimentos } from '../../../actions/procedimentos';
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
import { convertDatePicker, fixDateOnSave, formatCurrency } from '../../../helpers';

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
  listProcess: {
    marginBottom: '10px',
    borderRadius: '3px',
    paddingRight: '50px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
  },
});

class GuiaForm extends Component {
  state = {
    isBlocking: false,
    editing: false,
    loading: true,
    selectedPaciente: null,
    selectedProcedimento: null,
    breadcrumb: [
      { label: 'Guias', url: '/guias' },
    ],
    listStatus: [
      { label: 'Criada', value: 1 },
      { label: 'Concluída', value: 2 },
    ],
    AllPacientes: [],
    AllProcedimentos: [],
    AdicionarProcedimento: {},
    sendGuia: {
      Status: 1,
      Numero: String(),
      Solicitacao: convertDatePicker(new Date()),
      Vencimento: convertDatePicker(new Date()),
      PlanoOperadora: {
        Id: Number(),
        NomeFantasia: String(),
      },
      Paciente: {
        Id: Number(),
      },
      Procedimentos: [],
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
    const { loadPacientes: propsLoadPacientes } = this.props;
    await this.onHandlePageLoad();
    await propsLoadPacientes();
    await this.onHandleLoadProcedimentos();
    this.onHandleMessage();
  }

  componentDidUpdate(prevProps) {
    const { error, pacientes } = this.props;

    if (prevProps.pacientes !== pacientes) {
      this.onHandleLoadPacientes();
    }

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

  onHandleLoadProcedimentos = async () => {
    const { loadProcedimentos: propsLoadProcedimentos } = this.props;
    await propsLoadProcedimentos();

    const { procedimentos } = this.props;

    this.setState(prevState => ({
      AllProcedimentos: procedimentos.filter((item) => {
        const result = prevState.sendGuia.Procedimentos.find(itemList => (
          item.PublicID === itemList.PublicID
        ));
        if (result) return false;
        return true;
      }),
    }));
  }

  onHandleLoadPacientes = async () => {
    const { pacientes, guia } = this.props;
    const { editing } = this.state;

    if (editing) {
      const newPlanSelectItem = pacientes.find(item => (
        item.Id === guia.Paciente.Id
      ));

      this.setState({
        selectedPaciente: {
          Id: newPlanSelectItem.Id,
          PlanoOperadora: newPlanSelectItem.PlanoOperadora,
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
      await propUpdateGuia({
        ...sendGuia,
        Solicitacao: fixDateOnSave(sendGuia.Solicitacao),
        Vencimento: fixDateOnSave(sendGuia.Vencimento),
      });
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
    const { Id, PlanoOperadora } = target;

    this.setState({
      selectedPaciente: target,
      sendGuia: {
        ...sendGuia,
        PlanoOperadora,
        Paciente: {
          Id,
        },
      },
    });
  }

  onHandleSelectProcedimentos = (target) => {
    const { Procedimento } = target;

    this.setState({
      selectedProcedimento: target,
      AdicionarProcedimento: Procedimento,
    });
  }

  onHandleAddProcedimento = (event) => {
    event.preventDefault();
    const {
      sendGuia, AdicionarProcedimento,
      selectedProcedimento, AllProcedimentos,
    } = this.state;

    if (selectedProcedimento) {
      this.setState({
        selectedProcedimento: String(),
        AllProcedimentos: AllProcedimentos.filter(item => (
          item.PublicID !== AdicionarProcedimento.PublicID
        )),
        sendGuia: {
          ...sendGuia,
          Procedimentos: [
            AdicionarProcedimento,
            ...sendGuia.Procedimentos,
          ],
        },
      });
    }
  }

  onHandleDeleteProcedimento = (itemProcedimento) => {
    const { sendGuia } = this.state;

    this.setState(prevState => ({
      AllProcedimentos: prevState.AllProcedimentos.concat([itemProcedimento]),
      sendGuia: {
        ...sendGuia,
        Procedimentos: sendGuia.Procedimentos.filter(item => (
          item.PublicID !== itemProcedimento.PublicID
          && item.PublicID !== null
        )),
      },
    }));
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
      selectedPaciente,
      selectedProcedimento,
      isValidField, loading,
      AllPacientes, AllProcedimentos,
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
                <Grid item xs={12} sm={4}>
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
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={4}>
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
                Informações do paciente
              </Typography>

              <Grid container spacing={16}>
                <Grid
                  item
                  xs={12}
                  sm={5}
                  style={{
                    position: 'relative',
                    zIndex: '2',
                  }}
                >
                  {
                    !editing ? (
                      <Select
                        label="Nome do paciente"
                        options={
                          AllPacientes.map(suggestion => ({
                            Id: suggestion.Id,
                            PlanoOperadora: suggestion.PlanoOperadora,
                            value: suggestion.Nome,
                            label: suggestion.Nome,
                          }))}
                        components={{ Control, Option }}
                        value={selectedPaciente}
                        onChange={this.onHandleSelectPaciente}
                        placeholder="Selecione..."
                      />
                    ) : (
                      <TextField
                        fullWidth
                        disabled
                        value={sendGuia.Paciente.Nome}
                        label="Nome do paciente"
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )
                  }
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    disabled
                    label="Plano/Convênio"
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

              <Grid
                container
                alignItems="center"
                style={{
                  marginTop: '40px',
                }}
              >
                <Typography variant="h6" color="inherit" noWrap>
                  Adicionar procedimentos
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="medium"
                  disabled={!!error}
                  className={classes.addBtn}
                  onClick={this.onHandleAddProcedimento}
                >
                  +Adicionar
                </Button>
              </Grid>

              <Grid container spacing={16}>
                <Grid
                  item
                  xs={12}
                  sm={9}
                  style={{
                    position: 'relative',
                    zIndex: '2',
                  }}
                >
                  <Select
                    label="Cadastrar procedimentos"
                    options={
                      AllProcedimentos.map((suggestion) => {
                        const NameProd = 'NomeProcedimento';
                        return (
                          {
                            name: NameProd,
                            Procedimento: suggestion,
                            PublicID: suggestion.PublicID,
                            Codigo: suggestion.Codigo,
                            value: suggestion.NomeProcedimento,
                            label: suggestion.NomeProcedimento,
                          }
                        );
                      })
                    }
                    components={{ Control, Option }}
                    value={selectedProcedimento}
                    onChange={this.onHandleSelectProcedimentos}
                    placeholder="Selecione..."
                  />
                </Grid>

                {
                  sendGuia
                  && sendGuia.Procedimentos
                  && sendGuia.Procedimentos.length > 0 && (
                    <Grid
                      item
                      xs={12}
                      sm={9}
                      style={{
                        marginTop: '40px',
                      }}
                    >
                      <Typography variant="h6" color="inherit" noWrap>
                        Procedimentos realizados
                      </Typography>

                      <List dense>
                        {
                          sendGuia.Procedimentos
                            .filter(item => item.PublicID !== null)
                            .map(item => (
                              <ListItem
                                key={item.PublicID}
                                className={classes.listProcess}
                              >
                                <div className={classes.boxList}>
                                  <p className={classes.smallItemText}>
                                    {item.Codigo}
                                    {' - '}
                                    {item.NomeProcedimento}
                                    {' - '}
                                    {formatCurrency(item.ValorProcedimento)}
                                  </p>
                                </div>
                                <ListItemSecondaryAction className={classes.iconDelete}>
                                  <IconButton
                                    disabled={!!error}
                                    onClick={() => this.onHandleDeleteProcedimento(item)}
                                    aria-label="Deletar"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            ))
                        }
                      </List>
                    </Grid>
                  )}
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
  procedimentos: PropTypes.instanceOf(Object),
  guia: PropTypes.instanceOf(Object),
  addGuia: PropTypes.func.isRequired,
  loadGuiaDetail: PropTypes.func.isRequired,
  updateGuia: PropTypes.func.isRequired,
  loadPacientes: PropTypes.func.isRequired,
  loadProcedimentos: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  title: PropTypes.string,
};

GuiaForm.defaultProps = {
  guia: {},
  pacientes: [],
  procedimentos: [],
  title: String(),
};

const mapStateToProps = state => ({
  guia: state.guiasReducer.guia,
  pacientes: state.pacientesReducer.pacientes,
  procedimentos: state.procedimentosReducer.procedimentos,
  error: state.guiasReducer.fetchError,
});

export default connect(mapStateToProps, {
  addGuia, loadGuiaDetail, updateGuia, loadPacientes, loadProcedimentos,
})(withStyles(styles)(GuiaForm));
