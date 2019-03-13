import React, { Component, Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

import { withStyles } from '@material-ui/core/styles';
import { Breadcrumbs } from '@material-ui/lab';
import {
  Button,
  Typography,
  Grid,
  Divider,
  Chip,
  Avatar,
  TextField,
} from '@material-ui/core';

import { Home as HomeIcon } from '@material-ui/icons';

import { addGuia } from '../../../actions/guias';
import { randomPrice, randomNames } from '../../../helpers';

const styles = theme => ({
  chip: {
    backgroundColor: theme.palette.grey[100],
    height: 24,
    cursor: 'pointer',
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus, &.active': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
    },
  },
  activeChip: {
    backgroundColor: theme.palette.grey[300],
  },
  avatar: {
    background: 'none',
    marginRight: -theme.spacing.unit * 1.5,
  },
  box: {
    padding: '20px',
    border: '1px solid #ccc',
  },
  divider: {
    ...theme.divider,
    marginBottom: theme.spacing.unit * 1.2,
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

class GuiaCreate extends Component {
  constructor(props) {
    super(props);

    this.handleAddGuia = this.handleAddGuia.bind(this);
  }

  async handleAddGuia() {
    const { addGuia: propAddGuia, history } = this.props;
    const createID = uuidv1();

    await propAddGuia({
      id: createID,
      status: 1,
      publicID: createID,
      numero: createID.split('-')[0].toUpperCase(),
      solicitacao: new Date(),
      vencimento: new Date(),
      planooperadora: {
        id: 1,
        publicID: uuidv1(),
        nomefantasia: 'Operadora 1',
        razaosocial: null,
        cnpj: null,
        dataenviolote: new Date(),
        datarecebimentolote: new Date(),
        listaprocedimentos: null,
        listaarquivos: null,
      },
      paciente: {
        id: 1,
        publicID: uuidv1(),
        listaplanooperadorapaciente: null,
        funcao: null,
        nome: randomNames(),
        anotacoes: null,
        cpf: null,
        email: null,
        telefone: null,
      },
      arquivos: [
        {
          nome: 'ArquivoTeste',
          stream: null,
          datacriacao: new Date(),
          patharquivo: 'C:\\',
        },
      ],
      procedimentos: [
        {
          id: 1,
          publicID: uuidv1(),
          codigo: 1,
          nomeprocedimento: 'Procedimento de Teste090',
          valorprocedimento: randomPrice(50, 1500),
          exigencias: 'Lorem lorem',
          anotacoes: 'Bla Bla bla',
        },
      ],
    });

    history.push(`/guias/${createID}`);
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Grid container alignItems="center">
          <Typography variant="h6" color="inherit" noWrap>
            Cadastrar nova guia
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            className={classes.addBtn}
            onClick={this.handleAddGuia}
          >
            Salvar
          </Button>
        </Grid>

        <Divider className={classes.divider} />

        <Breadcrumbs arial-label="Breadcrumb">
          <Chip className={classes.chip} to="/guias" component={RouterLink} label="Guias" avatar={(<Avatar className={classes.avatar}><HomeIcon /></Avatar>)} />
          <Chip to="/guias/criar" component={RouterLink} className={`${classes.chip} ${classes.activeChip}`} label="Cadastrar" />
        </Breadcrumbs>

        <form noValidate autoComplete="off">
          <Grid container spacing={16}>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Número da guia"
                name="numero"
                helperText="Digite o número da guia."
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Status"
                name="status"
                margin="normal"
              />
            </Grid>
          </Grid>

          <Grid container spacing={16}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data de vencimento"
                name="vencimento"
                helperText="Ex.: 23/02/2019"
                margin="normal"
              />
            </Grid>
          </Grid>

          <br />

          <Grid container spacing={16}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nome do paciente"
                name="paciente"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CPF"
                name="cpf"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Plano"
                name="plano"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Telefone"
                name="telefone"
                margin="normal"
                helperText="(11) 9000-0000"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="E-mail"
                name="email"
                margin="normal"
                helperText="email@email.com.br"
              />
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            color="primary"
            size="medium"
            className={`${classes.addBtn} footerBtn`}
            onClick={this.handleAddGuia}
          >
            Salvar
          </Button>
        </form>
      </Fragment>
    );
  }
}

GuiaCreate.propTypes = {
  addGuia: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  guia: state.guiasReducer.guias,
  guiasError: state.guiasReducer.fetchError,
});

export default connect(mapStateToProps, {
  addGuia,
})(withStyles(styles)(GuiaCreate));
