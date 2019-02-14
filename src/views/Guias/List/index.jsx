import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

// MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import {
  Card, CardActions, CardHeader, Avatar,
} from '@material-ui/core';

// LOCAL IMPORTS
import {
  formatCurrency, randomPrice, randomStatusGuias, randomNames,
} from '../../../helpers';

// ACTIONS
import { loadGuias, addGuia, deleteGuias } from '../../../actions/guias';
import { searchChange } from '../../../actions/search';

// COMPONENTS
import BoxSearch from '../../../components/BoxSearch';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class Guias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxMessage: {
        open: false,
      },
    };
    this.handleDeleteGuia = this.handleDeleteGuia.bind(this);
    this.handleAddGuia = this.handleAddGuia.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleOnExited = this.handleOnExited.bind(this);
  }

  componentDidMount() {
    const { loadGuias: propLoadGuias } = this.props;
    propLoadGuias();
  }

  /* componentDidUpdate(prevProps) {
    if (prevProps.guiasError !== this.props.guiasError) {
      debugger;
    }
  } */

  handleDeleteGuia(postID) {
    const { deleteGuias: propDeleteGuias } = this.props;
    propDeleteGuias(postID);
  }

  handleAddGuia() {
    const { addGuia: propAddGuia } = this.props;
    const createID = uuidv1();

    this.setState({
      boxMessage: { open: false },
    });

    propAddGuia(
      {
        id: createID,
        numGuia: createID.split('-')[0].toUpperCase(),
        paciente: randomNames(),
        vencimento: new Date().toLocaleDateString('pt-br'),
        status: randomStatusGuias(),
        valor: randomPrice(50, 1500),
      },
    );

    /* propAddGuia({
      Id: randomPrice(1, 1500),
      Numero: createID.split('-')[0].toUpperCase(),
      PlanoOperadora: {
        Id: randomPrice(1, 1500),
        NomeFantasia: 'Operadora 1',
        RazaoSocial: null,
        CNPJ: null,
        DataEnvioLote: '0001-01-01T00:00:00',
        DataRecebimentoLote: '0001-01-01T00:00:00',
        ListaProcedimentos: null,
        ListaArquivos: null,
      },
      Paciente: {
        ListaPlanoOperadoraPaciente: null,
        Id: randomPrice(1, 1500),
        Funcao: null,
        Nome: randomNames(),
        Anotacoes: null,
        CPF: null,
        Email: null,
        Telefone: null,
      },
      Arquivos: [
        {
          Id: randomPrice(1, 1500),
          Nome: 'ArquivoTeste',
          Stream: null,
          DataCriacao: '2019-01-14T20:43:07.4768306-02:00',
          PathArquivo: '\'C:\'',
        },
      ],
      Solicitacao: '2019-01-14T20:43:07.4698345-02:00',
      Vencimento: '2019-02-14T20:43:07.4748316-02:00',
      Procedimentos: [
        {
          IdProcedimento: randomPrice(1, 1500),
          Codigo: randomPrice(1, 1500),
          NomeProcedimento: 'Procedimento de Teste090',
          ValorProcedimento: randomPrice(50, 1500),
          Exigencias: 'Lorem lorem',
          Anotacoes: 'Bla Bla bla',
        },
      ],
      Status: randomPrice(1, 1500),
    }); */
  }

  handleOnClose() {
    const { boxMessage } = this.state;
    this.setState({
      boxMessage: { open: !boxMessage.open },
    });
  }

  handleOnExited() {
    this.setState({
      boxMessage: { open: true },
    });
  }

  render() {
    const {
      classes, guias, value, guiasError,
    } = this.props;

    const { boxMessage } = this.state;

    return (
      <Fragment>
        {guiasError && (
          <Snackbar
            // key={messageInfo.key}
            open={!boxMessage.open}
            message={<span id="message-id">{guiasError}</span>}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={6000}
            onClose={this.handleOnClose}
            onExited={this.handleOnExited}
            ContentProps={{ 'aria-describedby': 'message-id' }}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleOnClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        )}
        {guias && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleAddGuia}
            >
              Adicionar Guia
            </Button>
            {guias.length > 0 && (
              <Fragment>
                <BoxSearch placeholder="Buscar" />
                {
                  guias.map(row => (
                    row.paciente.toLowerCase().indexOf(value.trim().toLowerCase()) >= 0
                    && (
                      <Paper className={classes.root} key={row.id}>
                        <Card>
                          <CardHeader
                            avatar={(<Avatar>A</Avatar>)}
                            action={(
                              <IconButton
                                onClick={() => this.handleDeleteGuia(row.id)}
                                aria-label="Deletar"
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                            title={row.paciente}
                            subheader={formatCurrency(row.valor)}
                          />
                          <CardActions>
                            <Button
                              to={{
                                pathname: `/guias/${row.numGuia}`,
                                state: { ...row },
                              }}
                              component={NavLink}
                              aria-label="Editar"
                            >
                              Editar
                            </Button>
                          </CardActions>
                        </Card>
                      </Paper>
                    )
                  ))
                }
              </Fragment>
            )}
          </Grid>
        )}
      </Fragment>
    );
  }
}

Guias.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  guias: PropTypes.instanceOf(Array).isRequired,
  loadGuias: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  guiasError: PropTypes.string.isRequired,
  addGuia: PropTypes.func.isRequired,
  deleteGuias: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  guias: state.guiasReducer.guias,
  guiasError: state.guiasReducer.fetchError,
  value: state.searchReducer.value,
});

export default connect(mapStateToProps, {
  deleteGuias, loadGuias, addGuia, searchChange,
})(withStyles(styles)(Guias));
