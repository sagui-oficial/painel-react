import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  Button, Typography, Grid,
  Divider, TextField,
} from '@material-ui/core';
import Select from 'react-select';

import { addPaciente, loadPacienteDetail, updatePaciente } from '../../../actions/pacientes';
import { loadPlanos } from '../../../actions/planos';
import { Control, Option } from '../../../components/AutoComplete';
import Breadcrumb from '../../../components/Breadcrumb';
import Message from '../../../components/Message';
import Loading from '../../../components/Loading';
import Master from '../../../components/Master';

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

class PacienteForm extends Component {
  state = {
    isBlocking: false,
    editing: false,
    loading: true,
    selectedPlano: null,
    breadcrumb: [
      { label: 'Pacientes', url: '/pacientes' },
    ],
    AllPlanos: [],
    sendPaciente: {
      Anotacoes: String(),
      CPF: String(),
      Email: String(),
      Funcao: String(),
      Nome: String(),
      NumeroPlano: String(),
      PlanoOperadoraId: Number(),
      Telefone: String(),
    },
    isValidField: {
      CPF: false,
      Nome: false,
      NumeroPlano: false,
    },
    boxMessage: {
      open: false,
      text: '',
    },
  }

  baseState = this.state

  async componentDidMount() {
    await this.onHandlePageLoad();
    await this.onHandleLoadPlanos();
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
      loadPacienteDetail: propLoadPacienteDetail,
    } = this.props;

    const { sendPaciente } = this.state;

    if (match.params.id) {
      await propLoadPacienteDetail(match.params.id);
      const { paciente } = this.props;

      this.setState({
        editing: true,
        sendPaciente: Object.keys(paciente).length > 0 ? paciente : sendPaciente,
      });
    }

    this.setState({ loading: false });
  }

  onHandleLoadPlanos = async () => {
    const { loadPlanos: propsLoadPlanos } = this.props;
    await propsLoadPlanos();

    const { planos, paciente } = this.props;

    const newPlanSelectItem = planos.find(item => (
      item.Id === paciente.Id
    ));

    if (typeof newPlanSelectItem !== 'undefined') {
      this.setState({
        selectedPlano: {
          Id: newPlanSelectItem.Id,
          value: newPlanSelectItem.NomeFantasia,
          label: newPlanSelectItem.NomeFantasia,
        },
      });
    }

    this.setState({
      AllPlanos: planos,
    });
  }

  onHandleAdd = async () => {
    const {
      addPaciente: propAddPaciente,
      updatePaciente: propUpdatePaciente, history,
    } = this.props;

    const { sendPaciente, editing } = this.state;

    this.setState({ loading: true });

    if (editing) {
      const { paciente: { PublicID } } = this.props;
      await propUpdatePaciente({
        ...sendPaciente,
      }, PublicID);
      await this.onHandleMessage('Paciente modificado.');
    } else {
      await propAddPaciente({
        ...sendPaciente,
      });
      await this.setState({ editing: true });
      await this.onHandleMessage('Paciente adicionado.');
    }

    history.push('/pacientes');
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
    const { sendPaciente } = this.state;

    this.setState({
      isBlocking: true,
      sendPaciente: {
        ...sendPaciente,
        [name]: value,
      },
    });
  }

  onHandleSelectPlano = (target) => {
    const { sendPaciente } = this.state;

    this.setState({
      selectedPlano: target,
      sendPaciente: {
        ...sendPaciente,
        PlanoOperadoraId: target.Id,
      },
    });
  }

  onHandleBlur = ({ value, name }) => {
    const { isValidField, sendPaciente } = this.state;

    if (typeof isValidField[name] !== 'undefined') {
      this.setState({
        isValidField: {
          ...isValidField,
          [name]: value.trim().length === 0,
        },
      });
    }

    this.setState({
      sendPaciente: {
        ...sendPaciente,
        [name]: value.trim(),
      },
    });
  }

  onHandleValidateFields = (event) => {
    event.preventDefault();

    const { isValidField, sendPaciente } = this.state;
    const setValidFields = {};

    Object.keys(isValidField).map((item) => {
      if (typeof sendPaciente[item] === 'string') {
        setValidFields[item] = sendPaciente[item].trim().length === 0;
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
      classes, title,
      match, error,
    } = this.props;

    const {
      sendPaciente, breadcrumb, isValidField,
      editing, boxMessage, isBlocking,
      AllPlanos, selectedPlano, loading,
    } = this.state;

    return (
      <Master title={`${title} paciente`}>
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
                paciente
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
                    required
                    label="CPF"
                    name="CPF"
                    error={isValidField.CPF}
                    value={sendPaciente.CPF}
                    onChange={e => this.onHandleTarget(e.target)}
                    onBlur={e => this.onHandleBlur(e.target)}
                    helperText="Digite o CPF"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    required
                    label="Nome do paciente"
                    name="Nome"
                    error={isValidField.Nome}
                    value={sendPaciente.Nome}
                    onChange={e => this.onHandleTarget(e.target)}
                    onBlur={e => this.onHandleBlur(e.target)}
                    helperText="Digite o nome do paciente."
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Telefone"
                    name="Telefone"
                    value={sendPaciente.Telefone}
                    onChange={e => this.onHandleTarget(e.target)}
                    onBlur={e => this.onHandleBlur(e.target)}
                    helperText="(11) 9000-0000"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="E-mail"
                    name="Email"
                    value={sendPaciente.Email}
                    onChange={e => this.onHandleTarget(e.target)}
                    onBlur={e => this.onHandleBlur(e.target)}
                    helperText="email@email.com.br"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <br />

              <Grid container alignItems="center">
                <Typography variant="h6" color="inherit" noWrap>
                  Selecionar plano odontológico
                </Typography>
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
                    label="Selecionar plano/convênio"
                    options={
                      AllPlanos.map(suggestion => (
                        {
                          Id: suggestion.Id,
                          value: suggestion.NomeFantasia,
                          label: suggestion.NomeFantasia,
                        }
                      ))
                    }
                    components={{ Control, Option }}
                    value={selectedPlano}
                    onChange={this.onHandleSelectPlano}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    required
                    label="Carteirinha"
                    name="NumeroPlano"
                    error={isValidField.NumeroPlano}
                    value={sendPaciente.NumeroPlano}
                    onChange={e => this.onHandleTarget(e.target)}
                    onBlur={e => this.onHandleBlur(e.target)}
                    helperText="Digite o número da carteirinha"
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
          </Fragment>
        ) : (
          <Loading />
        )}
      </Master>
    );
  }
}

PacienteForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  paciente: PropTypes.instanceOf(Object),
  planos: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object).isRequired,
  addPaciente: PropTypes.func.isRequired,
  updatePaciente: PropTypes.func.isRequired,
  loadPacienteDetail: PropTypes.func.isRequired,
  loadPlanos: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  title: PropTypes.string,
};

PacienteForm.defaultProps = {
  paciente: {},
  planos: [],
  title: String(),
};

const mapStateToProps = state => ({
  paciente: state.pacientesReducer.paciente,
  planos: state.planosReducer.planos,
  error: state.pacientesReducer.fetchError,
});

export default connect(mapStateToProps, {
  addPaciente, loadPacienteDetail, updatePaciente, loadPlanos,
})(withStyles(styles)(PacienteForm));
