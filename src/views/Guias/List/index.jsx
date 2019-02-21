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
  formatCurrency, randomPrice, randomNames,
} from '../../../helpers';

// ACTIONS
import {
  loadGuias, addGuia, deleteGuias, /* connectIO, */
} from '../../../actions/guias';
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
    const {
      loadGuias: propLoadGuias,
      // connectIO: loadConnectIO,
    } = this.props;
    propLoadGuias();
    // loadConnectIO();
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

    propAddGuia({
      id: randomPrice(1, 1500),
      numero: createID.split('-')[0].toUpperCase(),
      planooperadora: {
        id: randomPrice(1, 1500),
        nomefantasia: 'Operadora 1',
        razaosocial: null,
        cnpj: null,
        dataenviolote: '0001-01-01T00:00:00',
        datarecebimentolote: '0001-01-01T00:00:00',
        listaprocedimentos: null,
        listaarquivos: null,
      },
      paciente: {
        listaplanooperadorapaciente: null,
        id: randomPrice(1, 1500),
        funcao: null,
        nome: randomNames(),
        anotacoes: null,
        cpf: null,
        email: null,
        telefone: null,
      },
      arquivos: [
        {
          id: randomPrice(1, 1500),
          nome: 'ArquivoTeste',
          stream: null,
          datacriacao: '2019-01-14T20:43:07.4768306-02:00',
          patharquivo: 'C:\\',
        },
      ],
      solicitacao: '2019-01-14T20:43:07.4698345-02:00',
      vencimento: '2019-02-14T20:43:07.4748316-02:00',
      procedimentos: [
        {
          id: randomPrice(1, 1500),
          codigo: randomPrice(1, 1500),
          nomeprocedimento: 'Procedimento de Teste090',
          valorprocedimento: randomPrice(50, 1500),
          exigencias: 'Lorem lorem',
          anotacoes: 'Bla Bla bla',
        },
      ],
      status: randomPrice(1, 1500),
    });
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
                    row.paciente.nome.toLowerCase().indexOf(value.trim().toLowerCase()) >= 0
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
                            title={row.paciente.nome}
                            subheader={formatCurrency(row.procedimentos[0].valorprocedimento)}
                          />
                          <CardActions>
                            <Button
                              to={{
                                pathname: `/guias/${row.numero}`,
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
  // connectIO: PropTypes.func.isRequired,
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
  deleteGuias, loadGuias, addGuia, searchChange, /* connectIO, */
})(withStyles(styles)(Guias));
