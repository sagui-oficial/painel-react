import React, { Component } from 'react';
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
} from '@material-ui/core';

import {
  addPaciente, loadPacienteDetail,
  updatePaciente,
} from '../../../actions/pacientes';
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
      editing: false,
      breadcrumb: [
        { label: 'Pacientes', url: '/pacientes' },
      ],
      sendPaciente: {
        Status: 1,
        Nome: String(),
        ListaPlanoOperadoraPaciente: String(),
        Funcao: String(),
        Anotacoes: String(),
        CPF: String(),
        Email: String(),
        Telefone: String(),
      },
      boxMessage: {
        open: false,
        text: '',
      },
    };

    this.onHandleAdd = this.onHandleAdd.bind(this);
    this.onHandleTarget = this.onHandleTarget.bind(this);
    this.onHandlePageLoad = this.onHandlePageLoad.bind(this);
    this.onHandleMessage = this.onHandleMessage.bind(this);
    this.onHandleOnClose = this.onHandleOnClose.bind(this);
  }

  componentDidMount() {
    this.onHandlePageLoad();
    this.onHandleMessage();
  }

  componentDidUpdate(prevProps) {
    const { paciente } = this.props;

    if (prevProps.paciente !== paciente) {
      this.onHandleSendPaciente(paciente);
    }
  }

  onHandleMessage(text) {
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

  onHandleSendPaciente(paciente) {
    this.setState({
      sendPaciente: paciente,
    });
  }

  onHandlePageLoad() {
    const {
      match,
      loadPacienteDetail: propLoadPacienteDetail,
    } = this.props;

    if (match.params.id) {
      propLoadPacienteDetail(match.params.id);

      this.setState({
        editing: true,
      });
    }
  }

  onHandleTarget({ value, name }) {
    const { sendPaciente } = this.state;

    this.setState({
      sendPaciente: {
        ...sendPaciente,
        [name]: value,
      },
    });
  }

  async onHandleAdd() {
    const {
      addPaciente: propAddPaciente,
      updatePaciente: propUpdatePaciente, history,
    } = this.props;
    const { sendPaciente, editing } = this.state;
    const PublicID = uuidv1();

    if (editing) {
      await propUpdatePaciente({
        ...sendPaciente,
      }, sendPaciente.id);
      this.onHandleMessage('Paciente modificado.');
    } else {
      await propAddPaciente({
        ...sendPaciente,
        id: PublicID,
        PublicID,
      });

      this.setState({ editing: true });
      this.onHandleMessage('Paciente adicionado.');
      history.push(`/pacientes/${PublicID}`);
    }
  }

  render() {
    const { classes, title, match } = this.props;
    const {
      sendPaciente, breadcrumb,
      editing, boxMessage,
    } = this.state;

    return (
      <Master title={`${title} paciente`}>
        <Message
          text={boxMessage.text}
          open={boxMessage.open}
          onHandleOnClose={this.onHandleOnClose}
        />
        <Grid container alignItems="center">
          <Typography variant="h6" color="inherit" noWrap>
            {editing ? 'Editar' : 'Cadastrar'}
            {' '}
            paciente
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            className={classes.addBtn}
            onClick={this.onHandleAdd}
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
                label="CPF"
                name="CPF"
                value={sendPaciente.CPF}
                onChange={e => (
                  this.onHandleTarget(e.target)
                )}
                helperText="Digite o CPF"
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid container spacing={16}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Nome do paciente"
                name="Nome"
                value={sendPaciente.Nome}
                onChange={e => (
                  this.onHandleTarget(e.target)
                )}
                helperText="Digite o nome do paciente."
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            color="primary"
            size="medium"
            className={`${classes.addBtn} footerBtn`}
            onClick={this.onHandleAdd}
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
  match: PropTypes.instanceOf(Object).isRequired,
  addPaciente: PropTypes.func.isRequired,
  updatePaciente: PropTypes.func.isRequired,
  loadPacienteDetail: PropTypes.func.isRequired,
  title: PropTypes.string,
};

PacienteForm.defaultProps = {
  paciente: {},
  title: String(),
};

const mapStateToProps = state => ({
  paciente: state.pacientesReducer.paciente,
});

export default connect(mapStateToProps, {
  addPaciente, loadPacienteDetail, updatePaciente,
})(withStyles(styles)(PacienteForm));
