import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Prompt /* , Link */ } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  Grid,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';

import { Delete as DeleteIcon } from '@material-ui/icons';
import Select from 'react-select';

import { loadGuiasOperadora } from '../../../actions/guias';
import { loadPlanos } from '../../../actions/planos';
import {
  addLote,
  loadLoteDetail,
  updateLote,
} from '../../../actions/lotes';
import Message from '../../../components/Message';
import Loading from '../../../components/Loading';
import Master from '../../../components/Master';
import Breadcrumb from '../../../components/Breadcrumb';
import { Control, Option } from '../../../components/AutoComplete';
import {
  convertDatePicker,
  fixDateOnSave,
  formatCurrency,
} from '../../../helpers';

const styles = theme => ({
  divider: {
    ...theme.divider,
    marginBottom: theme.spacing.unit * 1.2,
  },
  form: {
    marginTop: theme.spacing.unit * 2,
  },
  smallItemText: {
    margin: 0,
    lineHeight: 1.3,
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
    marginBottom: 10,
    borderRadius: 3,
    paddingRight: 120,
    paddingTop: 20,
    paddingBottom: 20,
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
    valorTotal: Number(),
    selectedGuia: null,
    selectedPlano: null,
    AllPlanos: [],
    AllGuias: [],
    AdicionarGuia: {},
    sendLote: {
      Status: 1,
      ValorTotalLote: Number(),
      ValorTotalPagoLote: Number(),
      DataEnvioCorreio: convertDatePicker(new Date()),
      DataPrevistaRecebimento: convertDatePicker(new Date()),
      TotalGTOLote: Number(),
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
    await this.onHandlePageLoad();

    const { loadPlanos: propsLoadPlanos } = this.props;
    const { editing, sendLote } = this.state;
    if (!editing) {
      await propsLoadPlanos();
    }

    if (sendLote.PlanoOperadora.PublicID) {
      this.onHandleLoadGuias(sendLote.PlanoOperadora.PublicID);
    }

    this.onHandleMessage();
  }

  componentDidUpdate(prevProps, prevState) {
    const { error, planos } = this.props;
    const { selectedPlano, sendLote } = this.state;

    if (prevProps.planos !== planos) {
      this.onHandleLoadPlanos();
    }

    if (
      prevState.selectedPlano !== selectedPlano
      && sendLote.PlanoOperadora.PublicID
    ) {
      this.onHandleLoadGuias(sendLote.PlanoOperadora.PublicID);
    }

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
      const { ValorTotalLote } = getLoteItem;

      this.setState({
        editing: true,
        valorTotal: ValorTotalLote || 0,
        sendLote: {
          ...getLoteItem,
          DataEnvioCorreio: convertDatePicker(getLoteItem.DataEnvioCorreio),
          DataPrevistaRecebimento: convertDatePicker(getLoteItem.DataPrevistaRecebimento),
        },
      });
    }

    this.setState({ loading: false });
  }

  onHandleLoadGuias = async (id) => {
    const { loadGuiasOperadora: propsLoadGuiasOperadora } = this.props;
    await propsLoadGuiasOperadora(id);

    const { guias } = this.props;

    this.setState(prevState => ({
      AllGuias: guias.filter((item) => {
        const result = prevState.sendLote.ListaGTO.find(itemList => (
          item.PublicID === itemList.PublicID
        ));
        if (result) return false;
        return true;
      }),
    }));
  }

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
        DataEnvioCorreio: fixDateOnSave(sendLote.DataEnvioCorreio),
        DataPrevistaRecebimento: fixDateOnSave(sendLote.DataPrevistaRecebimento),
      });
      await this.onHandleMessage('Lote modificado.');
    } else {
      await propAddLote({
        ...sendLote,
        DataEnvioCorreio: fixDateOnSave(sendLote.DataEnvioCorreio),
        DataPrevistaRecebimento: fixDateOnSave(sendLote.DataPrevistaRecebimento),
      });
      await this.setState({ editing: true });
      await this.onHandleMessage('Lote adicionado.');
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

  onHandleLoadPlanos = () => {
    const { planos } = this.props;

    this.setState({
      AllPlanos: planos,
    });
  }

  onHandleSelectPlano = (target) => {
    const { sendLote } = this.state;
    const { PlanoOperadora } = target;

    this.setState({
      selectedPlano: target,
      sendLote: {
        ...sendLote,
        PlanoOperadora,
      },
    });
  }

  onHandleSelectGuia = (target) => {
    const { ListaGTO } = target;

    this.setState({
      selectedGuia: target,
      AdicionarGuia: ListaGTO,
    });
  }

  onHandleAddGuia = (event) => {
    event.preventDefault();
    const {
      selectedGuia,
      sendLote,
    } = this.state;

    if (selectedGuia) {
      this.setState(prevState => ({
        selectedGuia: String(),
        valorTotal: prevState.valorTotal + prevState.AdicionarGuia.ValorTotalProcedimentos,
        AllGuias: prevState.AllGuias.filter(item => (
          item.PublicID !== prevState.AdicionarGuia.PublicID
        )),
        sendLote: {
          ...sendLote,
          ListaGTO: [
            prevState.AdicionarGuia,
            ...sendLote.ListaGTO,
          ],
        },
      }));
    }
  }

  onHandleDeleteGuia = (itemGuia) => {
    const { sendLote } = this.state;

    this.setState(prevState => ({
      AllGuias: prevState.AllGuias.concat([itemGuia]),
      valorTotal: prevState.valorTotal - itemGuia.ValorTotalProcedimentos,
      sendLote: {
        ...sendLote,
        ListaGTO: sendLote.ListaGTO.filter(item => (
          item.PublicID !== null
          && item.PublicID !== itemGuia.PublicID
        )),
      },
    }));
  }

  onHandleChangeProcedimento = (name, status, indexProcedimento) => {
    this.setState(prevState => ({
      sendLote: {
        ...prevState.sendLote,
        ListaGTO: prevState.sendLote.ListaGTO.map((item, index) => {
          if (index === indexProcedimento) {
            return {
              ...item,
              [name]: status === 3 ? 2 : 3,
            };
          }

          return item;
        }),
      },
    }));
  }

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

    const { selectedPlano, editing, sendLote } = this.state;
    if (selectedPlano === null && !editing) {
      this.onHandleMessage('Preencha todos os campos.');
    } else if (sendLote.ListaGTO.length === 0) {
      this.onHandleMessage('Adicione pelo menos uma guia.');
    } else {
      this.onHandleAdd();
    }
  }

  render() {
    const {
      classes,
      error,
      match,
      title,
    } = this.props;

    const {
      AllGuias,
      AllPlanos,
      boxMessage,
      breadcrumb,
      editing,
      isBlocking,
      loading,
      selectedGuia,
      selectedPlano,
      sendLote,
      valorTotal,
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Data Correio"
                    name="DataEnvioCorreio"
                    type="date"
                    onChange={e => this.onHandleTarget(e.target)}
                    defaultValue={sendLote.DataEnvioCorreio}
                    helperText="17/06/2019"
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
                    label="Data Recebimento"
                    name="DataPrevistaRecebimento"
                    type="date"
                    onChange={e => this.onHandleTarget(e.target)}
                    defaultValue={sendLote.DataPrevistaRecebimento}
                    helperText="17/06/2019"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid
                  item
                  xs={12}
                  sm={9}
                  style={{
                    position: 'relative',
                    zIndex: '3',
                  }}
                >
                  {!editing && sendLote.ListaGTO.length === 0 ? (
                    <Select
                      label="Selecionar plano/convênio"
                      options={
                        AllPlanos.map(suggestion => (
                          {
                            Id: suggestion.Id,
                            PlanoOperadora: suggestion,
                            value: suggestion.NomeFantasia,
                            label: suggestion.NomeFantasia,
                          }
                        ))
                      }
                      components={{ Control, Option }}
                      value={selectedPlano}
                      placeholder="Selecionar plano..."
                      onChange={this.onHandleSelectPlano}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      disabled
                      value={sendLote.PlanoOperadora.NomeFantasia}
                      label="Plano/Operadora"
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                </Grid>
              </Grid>

              {sendLote.PlanoOperadora.PublicID && (
                <Grid
                  container
                  alignItems="center"
                  style={{
                    marginTop: '40px',
                  }}
                >
                  <Typography variant="h6" color="inherit" noWrap>
                    Adicionar guias
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="medium"
                    disabled={!!error}
                    className={classes.addBtn}
                    onClick={this.onHandleAddGuia}
                  >
                    +Adicionar
                  </Button>
                </Grid>
              )}

              {sendLote.PlanoOperadora.PublicID && (
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
                      label="Cadastrar guias"
                      options={
                        AllGuias
                          .filter(item => item.ValorTotalProcedimentos)
                          .map((suggestion) => {
                            const NameProd = 'Numero';
                            return (
                              {
                                name: NameProd,
                                ListaGTO: suggestion,
                                PublicID: suggestion.PublicID,
                                value: suggestion.Numero,
                                label: suggestion.Numero,
                              }
                            );
                          })
                      }
                      components={{ Control, Option }}
                      value={selectedGuia}
                      onChange={this.onHandleSelectGuia}
                      placeholder="Selecione..."
                    />
                  </Grid>
                </Grid>
              )}

              {
                sendLote
                && sendLote.ListaGTO
                && sendLote.ListaGTO.length > 0 && (
                  <Fragment>
                    <Grid container alignItems="center" style={{ marginTop: '40px' }}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6" color="inherit" noWrap>
                          Guias adicionadas
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
                            sendLote.ListaGTO
                              .filter(item => item.PublicID !== null)
                              .map((item, index) => (
                                <ListItem
                                  key={item.PublicID}
                                  className={classes.listProcess}
                                >
                                  <div className={classes.boxList}>
                                    <p className={classes.smallItemText}>
                                      <strong>Número:</strong>
                                      {' '}
                                      {item.Numero}
                                      <br />
                                      <strong>Paciente:</strong>
                                      {' '}
                                      {item.Paciente.Nome}
                                      {
                                        item.ValorTotalProcedimentos && (
                                          <Fragment>
                                            <br />
                                            <strong>Valor total:</strong>
                                            {' '}
                                            {formatCurrency(item.ValorTotalProcedimentos)}
                                          </Fragment>
                                        )
                                      }
                                      {/* <br />
                                      <Button
                                        variant="outlined"
                                        size="small"
                                        disabled={!!error}
                                        component={Link}
                                        style={{ marginTop: 10 }}
                                        to={{
                                          pathname: `/guias/${item.PublicID}`,
                                          state: { ...item },
                                        }}
                                      >
                                        Ver
                                      </Button> */}
                                    </p>
                                  </div>
                                  <ListItemSecondaryAction className={classes.iconDelete}>
                                    <Button
                                      onClick={() => this.onHandleChangeProcedimento('Status', item.Status, index)}
                                    >
                                      {item.Status === 3 ? (
                                        <span className="green-text">Pago</span>
                                      ) : (
                                        <span className="purple-text">Pagar</span>
                                      )}
                                    </Button>
                                    <IconButton
                                      disabled={!!error}
                                      onClick={() => this.onHandleDeleteGuia(item)}
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
              }

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
  guias: PropTypes.instanceOf(Object),
  planos: PropTypes.instanceOf(Object),
  lote: PropTypes.instanceOf(Object),
  addLote: PropTypes.func.isRequired,
  loadLoteDetail: PropTypes.func.isRequired,
  updateLote: PropTypes.func.isRequired,
  loadGuiasOperadora: PropTypes.func.isRequired,
  loadPlanos: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  title: PropTypes.string,
};

LoteForm.defaultProps = {
  lote: {},
  guias: [],
  planos: [],
  title: String(),
};

const mapStateToProps = state => ({
  lote: state.lotesReducer.lote,
  guias: state.guiasReducer.guias,
  planos: state.planosReducer.planos,
  error: state.lotesReducer.fetchError,
});

export default connect(mapStateToProps, {
  addLote,
  loadLoteDetail,
  updateLote,
  loadGuiasOperadora,
  loadPlanos,
})(withStyles(styles)(LoteForm));
