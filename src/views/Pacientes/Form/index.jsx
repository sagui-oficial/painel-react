import React, { Component } from 'react';
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
  constructor(props) {
    super(props);

    this.state = {
      isBlocking: false,
      editing: false,
      selectedPlano: null,
      breadcrumb: [
        { label: 'Pacientes', url: '/pacientes' },
      ],
      AllPlanos: [],
      sendPaciente: {
        Status: 1,
        Nome: String(),
        ListaPlanoOperadoraPaciente: String(),
        Funcao: String(),
        Anotacoes: String(),
        CPF: String(),
        Email: String(),
        Telefone: String(),
        Carterinha: String(),
      },
      isValidField: {
        CPF: false,
        Nome: false,
        Carterinha: false,
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
    this.onHandleLoadPlanos = this.onHandleLoadPlanos.bind(this);
    this.onHandleSelectPlano = this.onHandleSelectPlano.bind(this);
  }

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
    history.push('/pacientes/cadastrar');
    this.setState(this.baseState);
  }

  async onHandlePageLoad() {
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
  }

  async onHandleLoadPlanos() {
    const { loadPlanos: propsLoadPlanos } = this.props;
    await propsLoadPlanos();

    const { planos, paciente } = this.props;

    const newPlanSelectItem = planos.find(item => (
      item.PublicID === paciente.ListaPlanoOperadoraPaciente
    ));

    if (typeof newPlanSelectItem !== 'undefined') {
      this.setState({
        selectedPlano: {
          PublicID: newPlanSelectItem.PublicID,
          value: newPlanSelectItem.RazaoSocial,
          label: newPlanSelectItem.RazaoSocial,
        },
      });
    }

    this.setState({
      AllPlanos: planos,
    });
  }

  onHandleTarget({ value, name }) {
    const { sendPaciente } = this.state;

    this.setState({
      isBlocking: true,
      sendPaciente: {
        ...sendPaciente,
        [name]: value,
      },
    });
  }

  onHandleSelectPlano(target) {
    const { sendPaciente } = this.state;

    this.setState({
      selectedPlano: target,
      sendPaciente: {
        ...sendPaciente,
        ListaPlanoOperadoraPaciente: target.PublicID,
      },
    });
  }

  onHandleBlur({ value, name }) {
    const { isValidField, sendPaciente } = this.state;

    this.setState({
      isValidField: {
        ...isValidField,
        [name]: value.trim().length === 0,
      },
      sendPaciente: {
        ...sendPaciente,
        [name]: value.trim(),
      },
    });
  }

  onHandleValidateFields(event) {
    event.preventDefault();

    const { isValidField, sendPaciente } = this.state;
    const setValidFields = {};

    Object.keys(isValidField).map((item) => {
      setValidFields[item] = sendPaciente[item].trim().length === 0;
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
    const {
      addPaciente: propAddPaciente,
      updatePaciente: propUpdatePaciente, history,
    } = this.props;

    const { sendPaciente, editing } = this.state;

    if (editing) {
      const { paciente: { PublicID } } = this.props;
      await propUpdatePaciente({
        ...sendPaciente,
      }, PublicID);
      this.onHandleMessage('Paciente modificado.');
    } else {
      await propAddPaciente({
        ...sendPaciente,
      });
      const { paciente: { PublicID } } = this.props;
      this.setState({ editing: true });
      this.onHandleMessage('Paciente adicionado.');
      history.push(`/pacientes/${PublicID}`);
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
      AllPlanos, selectedPlano,
    } = this.state;

    return (
      <Master title={`${title} paciente`}>
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
                      PublicID: suggestion.PublicID,
                      value: suggestion.RazaoSocial,
                      label: suggestion.RazaoSocial,
                    }
                  ))
                }
                components={{ Control, Option }}
                value={selectedPlano}
                onChange={this.onHandleSelectPlano}
                placeholder="Selecione..."
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                required
                label="Carterinha"
                name="Carterinha"
                error={isValidField.Carterinha}
                value={sendPaciente.Carterinha}
                onChange={e => this.onHandleTarget(e.target)}
                onBlur={e => this.onHandleBlur(e.target)}
                helperText="Digite a carterinha"
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
  planos: {},
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
