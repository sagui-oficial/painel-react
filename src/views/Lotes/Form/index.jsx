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
  // MenuItem,
  // List,
  // ListItem,
  // ListItemSecondaryAction,
  // IconButton,
} from '@material-ui/core';

// import { Delete as DeleteIcon } from '@material-ui/icons';
// import Select from 'react-select';

// import { loadPacientes } from '../../../actions/pacientes';
// import { loadProcedimentos } from '../../../actions/procedimentos';
import {
  addLote,
  loadLoteDetail,
  updateLote,
} from '../../../actions/lotes';
import Message from '../../../components/Message';
import Loading from '../../../components/Loading';
import Master from '../../../components/Master';
import Breadcrumb from '../../../components/Breadcrumb';
// import { Control, Option } from '../../../components/AutoComplete';
import {
  convertDatePicker,
  fixDateOnSave,
  // formatCurrency,
} from '../../../helpers';

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

class LoteForm extends Component {
  state = {
    isBlocking: false,
    editing: false,
    loading: true,
    breadcrumb: [
      { label: 'Lotes', url: '/lotes' },
    ],
    // valorTotal: Number(),
    // selectedPaciente: null,
    // selectedProcedimento: null,
    // listStatus: [
    //   { label: 'Criada', value: 1 },
    //   { label: 'Concluída', value: 2 },
    // ],
    // AllPacientes: [],
    // AllProcedimentos: [],
    // AdicionarProcedimento: {},
    sendLote: {
      ValorTotalLote: Number(),
      ValorTotalPagoLote: Number(),
      DataEnvioCorreio: convertDatePicker(new Date()),
      DataPrevistaRecebimento: convertDatePicker(new Date()),
      TotalGTOLote: 0,
      ListaGTO: [],
      PlanoOperadora: {},
      Funcionario: {
        Nome: 'Maria',
        Id: 1,
      },
    },
    isValidField: {},
    boxMessage: {
      open: false,
      text: '',
    },
  }

  baseState = this.state

  async componentDidMount() {
    // const { loadPacientes: propsLoadPacientes } = this.props;
    await this.onHandlePageLoad();
    // await propsLoadPacientes();
    // await this.onHandleLoadProcedimentos();
    this.onHandleMessage();
  }

  componentDidUpdate(prevProps) {
    const { error/* , pacientes */ } = this.props;

    /* if (prevProps.pacientes !== pacientes) {
      this.onHandleLoadPacientes();
    } */

    if (prevProps.error !== error) {
      this.onHandleMessage('Conectado.');
    }
  }

  onHandlePageLoad = async () => {
    const {
      match,
      loadLoteDetail: propLoadLoteDetail,
    } = this.props;

    const { sendLote } = this.state;

    if (match.params.id) {
      await propLoadLoteDetail(match.params.id);
      const { lote } = this.props;
      const getLoteItem = Object.keys(lote).length > 0 ? lote : sendLote;
      // const { ValorTotalLote } = getLoteItem;

      // if (
      //   ValorTotalLote
      //   && typeof ValorTotalLote !== 'undefined'
      // ) {
      //   this.setState({
      //     valorTotal: ValorTotalLote,
      //   });
      // }

      this.setState({
        editing: true,
        sendLote: {
          ...getLoteItem,
          Solicitacao: convertDatePicker(getLoteItem.Solicitacao),
          Vencimento: convertDatePicker(getLoteItem.Vencimento),
        },
      });
    }

    this.setState({ loading: false });
  }

  /* onHandleLoadProcedimentos = async () => {
    const { loadProcedimentos: propsLoadProcedimentos } = this.props;
    await propsLoadProcedimentos();

    const { procedimentos } = this.props;

    this.setState(prevState => ({
      AllProcedimentos: procedimentos.filter((item) => {
        const result = prevState.sendLote.Procedimentos.find(itemList => (
          item.PublicID === itemList.PublicID
        ));
        if (result) return false;
        return true;
      }),
    }));
  } */

  /* onHandleLoadPacientes = () => {
    const { pacientes } = this.props;

    this.setState({
      AllPacientes: pacientes,
    });
  } */

  onHandleAdd = async () => {
    const {
      addLote: propAddLote,
      updateLote: propUpdateLote, history,
    } = this.props;

    const { sendLote, editing } = this.state;

    this.setState({ loading: true });

    if (editing) {
      await propUpdateLote({
        ...sendLote,
        dataEnvioCorreio: fixDateOnSave(sendLote.dataEnvioCorreio),
        dataPrevistaRecebimento: fixDateOnSave(sendLote.dataPrevistaRecebimento),
      });
      await this.onHandleMessage('Lote modificada.');
    } else {
      await propAddLote({
        ...sendLote,
        dataEnvioCorreio: fixDateOnSave(sendLote.dataEnvioCorreio),
        dataPrevistaRecebimento: fixDateOnSave(sendLote.dataPrevistaRecebimento),
      });
      await this.setState({ editing: true });
      await this.onHandleMessage('Lote adicionada.');
    }

    history.push('/lotes');
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
    const { sendLote } = this.state;

    this.setState({
      isBlocking: true,
      sendLote: {
        ...sendLote,
        [name]: value,
      },
    });
  }

  /* onHandleSelectPaciente = (target) => {
    const { sendLote } = this.state;
    const { Id, PlanoOperadora } = target;

    this.setState({
      selectedPaciente: target,
      sendLote: {
        ...sendLote,
        PlanoOperadora,
        Paciente: {
          Id,
        },
      },
    });
  } */

  /* onHandleSelectProcedimentos = (target) => {
    const { Procedimento } = target;

    this.setState({
      selectedProcedimento: target,
      AdicionarProcedimento: Procedimento,
    });
  } */

  /* onHandleAddProcedimento = (event) => {
    event.preventDefault();
    const {
      selectedProcedimento,
      sendLote,
    } = this.state;

    if (selectedProcedimento) {
      this.setState(prevState => ({
        selectedProcedimento: String(),
        valorTotal: prevState.valorTotal + prevState.AdicionarProcedimento.ValorProcedimento,
        AllProcedimentos: prevState.AllProcedimentos.filter(item => (
          item.PublicID !== prevState.AdicionarProcedimento.PublicID
        )),
        sendLote: {
          ...sendLote,
          Procedimentos: [
            prevState.AdicionarProcedimento,
            ...sendLote.Procedimentos,
          ],
        },
      }));
    }
  } */

  /* onHandleDeleteProcedimento = (itemProcedimento) => {
    const { sendLote } = this.state;

    this.setState(prevState => ({
      AllProcedimentos: prevState.AllProcedimentos.concat([itemProcedimento]),
      valorTotal: prevState.valorTotal - itemProcedimento.ValorProcedimento,
      sendLote: {
        ...sendLote,
        Procedimentos: sendLote.Procedimentos.filter(item => (
          item.PublicID !== itemProcedimento.PublicID
          && item.PublicID !== null
        )),
      },
    }));
  } */

  onHandleBlur = ({ value, name }) => {
    const { isValidField, sendLote } = this.state;

    if (typeof isValidField[name] !== 'undefined') {
      this.setState({
        isValidField: {
          ...isValidField,
          [name]: value.trim().length === 0,
        },
      });
    }

    this.setState({
      sendLote: {
        ...sendLote,
        [name]: value.trim(),
      },
    });
  }

  onHandleValidateFields = (event) => {
    event.preventDefault();

    const { isValidField, sendLote } = this.state;
    const setValidFields = {};

    Object.keys(isValidField).map((item) => {
      if (typeof sendLote[item] === 'string') {
        setValidFields[item] = sendLote[item].trim().length === 0;
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
      // AllPacientes,
      // AllProcedimentos,
      boxMessage,
      breadcrumb,
      editing,
      isBlocking,
      // isValidField,
      // listStatus,
      loading,
      // selectedPaciente,
      // selectedProcedimento,
      sendLote,
      // valorTotal,
    } = this.state;

    return (
      <Master title={`${title} lote`}>
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
                lote
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
                {/* <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    required
                    label="Número da lote"
                    name="Numero"
                    error={isValidField.Numero}
                    value={sendLote.Numero}
                    onChange={e => this.onHandleTarget(e.target)}
                    onBlur={e => this.onHandleBlur(e.target)}
                    helperText="Digite o número da lote"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid> */}

                {/* <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    select
                    value={sendLote.Status}
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
                </Grid> */}
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Data de solicitação"
                    name="dataEnvioCorreio"
                    type="date"
                    onChange={e => this.onHandleTarget(e.target)}
                    defaultValue={sendLote.dataEnvioCorreio}
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
                    name="dataPrevistaRecebimento"
                    type="date"
                    onChange={e => this.onHandleTarget(e.target)}
                    defaultValue={sendLote.dataPrevistaRecebimento}
                    helperText="23/02/2019"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>

              {/* <br /> */}

              {/* <Typography variant="h6" color="inherit" noWrap>
                Informações do paciente
              </Typography> */}

              {/* <Grid container spacing={16}>
                <Grid
                  item
                  xs={12}
                  sm={5}
                  style={{
                    position: 'relative',
                    zIndex: '4',
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
                        value={sendLote.Paciente.Nome}
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
                    value={sendLote.PlanoOperadora.NomeFantasia}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid> */}

              {/* <Grid
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
              </Grid> */}

              {/* <Grid container spacing={16}>
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
              </Grid> */}

              {/* {
                sendLote
                && sendLote.Procedimentos
                && sendLote.Procedimentos.length > 0 && (
                  <Fragment>
                    <Grid container alignItems="center" style={{ marginTop: '40px' }}>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="h6" color="inherit" noWrap>
                          Procedimentos realizados
                        </Typography>
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
                    <Grid container alignItems="center" style={{ marginTop: '15px' }}>
                      <Grid item xs={12} sm={9}>
                        <List dense>
                          {
                            sendLote.Procedimentos
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
                    </Grid>
                  </Fragment>
                )
              } */}

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

LoteForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  // pacientes: PropTypes.instanceOf(Object),
  // procedimentos: PropTypes.instanceOf(Object),
  lote: PropTypes.instanceOf(Object),
  addLote: PropTypes.func.isRequired,
  loadLoteDetail: PropTypes.func.isRequired,
  updateLote: PropTypes.func.isRequired,
  // loadPacientes: PropTypes.func.isRequired,
  // loadProcedimentos: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  title: PropTypes.string,
};

LoteForm.defaultProps = {
  lote: {},
  // pacientes: [],
  // procedimentos: [],
  title: String(),
};

const mapStateToProps = state => ({
  lote: state.lotesReducer.lote,
  // pacientes: state.pacientesReducer.pacientes,
  // procedimentos: state.procedimentosReducer.procedimentos,
  error: state.lotesReducer.fetchError,
});

export default connect(mapStateToProps, {
  addLote, loadLoteDetail, updateLote, /* loadPacientes, loadProcedimentos, */
})(withStyles(styles)(LoteForm));
