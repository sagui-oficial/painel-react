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
} from '@material-ui/core';

import {
  addProcedimento, loadProcedimentoDetail,
  updateProcedimento,
} from '../../../actions/procedimentos';
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

class ProcedimentoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      breadcrumb: [
        { label: 'Procedimentos', url: '/procedimentos' },
        { label: 'Cadastrar', url: '/procedimentos/criar' },
      ],
      sendProcedimento: {
        Status: 1,
        Codigo: String(),
        NomeProcedimento: String(),
        Exigencias: String(),
        Anotacoes: String(),
      },
    };

    this.onHandleAdd = this.onHandleAdd.bind(this);
    this.onHandleTarget = this.onHandleTarget.bind(this);
    this.onHandlePageLoad = this.onHandlePageLoad.bind(this);
  }

  componentDidMount() {
    this.onHandlePageLoad();
  }

  componentDidUpdate(prevProps) {
    const { procedimento } = this.props;

    if (prevProps.procedimento !== procedimento) {
      this.setState({
        sendProcedimento: procedimento,
      });
    }
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
      sendProcedimento: {
        ...sendProcedimento,
        [name]: value,
      },
    });
  }

  async onHandleAdd() {
    const {
      addProcedimento: propAddProcedimento,
      updateProcedimento: propUpdateProcedimento, history,
    } = this.props;
    const { sendProcedimento, editing } = this.state;
    const PublicID = uuidv1();

    if (editing) {
      await propUpdateProcedimento({
        ...sendProcedimento,
      }, sendProcedimento.id);
    } else {
      await propAddProcedimento({
        ...sendProcedimento,
        id: PublicID,
        PublicID,
      });

      history.push(`/procedimentos/${PublicID}`);
    }
  }

  render() {
    const { classes } = this.props;
    const { sendProcedimento, breadcrumb, editing } = this.state;

    return (
      <Fragment>
        <Grid container alignItems="center">
          <Typography variant="h6" color="inherit" noWrap>
            {editing ? 'Editar' : 'Cadastrar'}
            {' '}
            procedimento
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

        <Breadcrumb breadcrumb={breadcrumb} />

        <form className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={16}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Código"
                name="Codigo"
                value={sendProcedimento.Codigo}
                onChange={e => (
                  this.onHandleTarget(e.target)
                )}
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
                value={sendProcedimento.NomeProcedimento}
                onChange={e => (
                  this.onHandleTarget(e.target)
                )}
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
                onChange={e => (
                  this.onHandleTarget(e.target)
                )}
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
                onChange={e => (
                  this.onHandleTarget(e.target)
                )}
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
      </Fragment>
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
};

ProcedimentoForm.defaultProps = {
  procedimento: {},
};

const mapStateToProps = state => ({
  procedimento: state.procedimentosReducer.procedimento,
  procedimentosError: state.procedimentosReducer.fetchError,
});

export default connect(mapStateToProps, {
  addProcedimento, loadProcedimentoDetail, updateProcedimento,
})(withStyles(styles)(ProcedimentoForm));
