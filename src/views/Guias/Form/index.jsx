import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  Grid,
  Divider,
  TextField,
  MenuItem,
} from '@material-ui/core';

import Select from 'react-select';

import { addGuia } from '../../../actions/guias';
import { loadPacientes } from '../../../actions/pacientes';
import { fixDateOnSave, convertDatePicker, formatCurrency } from '../../../helpers';
import { Control, Option } from '../../../components/AutoComplete';
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
      selectedName: null,
      ValorTotal: 0,
      breadcrumb: [
        { label: 'Guias', url: '/guias' },
        { label: 'Cadastrar', url: '/guias/criar' },
      ],
      listStatus: [
        { label: 'Criada', value: 1 },
        { label: 'Concluída', value: 2 },
      ],
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
          ListaPlanoOperadoraPaciente: Number(),
        },
      },
    };

    this.onHandleAddGuia = this.onHandleAddGuia.bind(this);
    this.onHandleTargetGuia = this.onHandleTargetGuia.bind(this);
    this.onHandleTargetPaciente = this.onHandleTargetPaciente.bind(this);
    this.onHandleTargetPacienteNome = this.onHandleTargetPacienteNome.bind(this);
  }

  componentDidMount() {
    const { loadPacientes: propsLoadPatients } = this.props;
    propsLoadPatients();
  }

  onHandleTargetGuia(value, name) {
    const { sendGuia } = this.state;

    this.setState({
      sendGuia: {
        ...sendGuia,
        [name]: value,
      },
    });
  }

  onHandleTargetPaciente(event) {
    const { sendGuia } = this.state;
    const { target } = event;

    this.setState({
      sendGuia: {
        ...sendGuia,
        Paciente: {
          ...sendGuia.Paciente,
          [target.name]: target.value,
        },
      },
    });
  }

  onHandleTargetPacienteNome(target) {
    const { sendGuia } = this.state;
    const { value, id } = target;

    this.setState({
      selectedName: target,
      ValorTotal: null,
      sendGuia: {
        ...sendGuia,
        Paciente: {
          ...sendGuia.Paciente,
          Nome: value,
        },
        PlanoOperadora: {
          NomeFantasia: `Operadora plano1 ${id}`,
        },
      },
    });
  }

  async onHandleAddGuia() {
    // const { addGuia: propAddGuia, history } = this.props;
    const { sendGuia } = this.state;
    const PublicID = uuidv1();

    console.log(JSON.stringify({
      ...sendGuia,
      PublicID,
      Solicitacao: fixDateOnSave(sendGuia.Solicitacao),
      Vencimento: fixDateOnSave(sendGuia.Vencimento),
    }));

    /* await propAddGuia();
    history.push(`/guias/${PublicID}`); */
  }

  render() {
    const { classes, pacientes } = this.props;
    const {
      sendGuia, selectedName, listStatus,
      ValorTotal, breadcrumb,
    } = this.state;

    return (
      <Fragment>
        <Grid container alignItems="center">
          <Typography variant="h6" color="inherit" noWrap>
            Cadastrar guia
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            className={classes.addBtn}
            onClick={this.onHandleAddGuia}
          >
            Salvar
          </Button>
        </Grid>

        <Divider className={classes.divider} />

        <Breadcrumb breadcrumb={breadcrumb} />

        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={16}>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Número da guia"
                name="Numero"
                value={sendGuia.Numero}
                onChange={e => (
                  this.onHandleTargetGuia(e.target.value.toUpperCase().trim(), e.target.name)
                )}
                helperText="Digite o número da guia."
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                select
                value={sendGuia.Status}
                onChange={e => this.onHandleTargetGuia(e.target.value, e.target.name)}
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
                value={formatCurrency(ValorTotal)}
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
                onChange={e => this.onHandleTargetGuia(e.target.value, e.target.name)}
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
                onChange={e => this.onHandleTargetGuia(e.target.value, e.target.name)}
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
                options={pacientes.map(suggestion => ({
                  id: suggestion.PublicID,
                  value: suggestion.Nome,
                  label: suggestion.Nome,
                }))}
                components={{ Control, Option }}
                value={selectedName}
                onChange={this.onHandleTargetPacienteNome}
                placeholder="Selecione..."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                disabled
                label="CPF"
                name="CPF"
                value={sendGuia.Paciente.CPF}
                onChange={this.onHandleTargetPaciente}
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
                onChange={e => this.onHandleTargetGuia(e.target.value, e.target.name)}
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
                label="Procedimentos"
                options={pacientes.map(suggestion => ({
                  id: suggestion.PublicID,
                  value: suggestion.Nome,
                  label: suggestion.Nome,
                }))}
                components={{ Control, Option }}
                value={selectedName}
                onChange={this.onHandleTargetPacienteNome}
                placeholder="Selecione..."
              />
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            color="primary"
            size="medium"
            className={`${classes.addBtn} footerBtn`}
            onClick={this.onHandleAddGuia}
          >
            Salvar
          </Button>
        </form>
      </Fragment>
    );
  }
}

GuiaForm.propTypes = {
  addGuia: PropTypes.func.isRequired,
  loadPacientes: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  pacientes: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  guia: state.guiasReducer.guias,
  pacientes: state.pacientesReducer.pacientes,
  guiasError: state.guiasReducer.fetchError,
});

export default connect(mapStateToProps, {
  addGuia, loadPacientes,
})(withStyles(styles)(GuiaForm));
