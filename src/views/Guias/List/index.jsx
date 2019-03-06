import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  Card, CardActions, CardHeader, Avatar, Typography, Divider,
} from '@material-ui/core';

// LOCAL IMPORTS
import BoxSearch from '../../../components/Search';
import { formatCurrency } from '../../../helpers';
import { searchChange } from '../../../actions/search';
import { loadGuias, deleteGuias /* connectIO, */ } from '../../../actions/guias';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  divider: {
    ...theme.divider,
  },
  close: {
    padding: theme.spacing.unit / 2,
  },
  addBtn: {
    ...theme.roundedBtn,
    marginLeft: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0',
      marginTop: '0.5rem',
      width: '100%',
    },
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
    this.handleNewGuia = this.handleNewGuia.bind(this);
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

  handleDeleteGuia(postID) {
    const { deleteGuias: propDeleteGuias } = this.props;

    propDeleteGuias({
      status: 99,
    }, postID);
  }

  handleNewGuia() {
    const { guiasError, history } = this.props;

    if (guiasError.indexOf('Error') > -1) {
      this.setState({ boxMessage: false });
      return;
    }

    history.push('/guias/criar');
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
          <Fragment>
            <Grid container alignItems="center">
              <Typography variant="h6" color="inherit" noWrap>
                Gerenciamento de guias
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                className={classes.addBtn}
                onClick={this.handleNewGuia}
              >
                +Novo
              </Button>
            </Grid>
            <Divider className={classes.divider} />
            <BoxSearch placeholder="Buscar guias" />
            {guias && guias.length > 0 && (
              <Fragment>
                {
                  guias.map(row => (
                    row.paciente.nome.toLowerCase().indexOf(value.trim().toLowerCase()) >= 0
                    && row.status !== 99 && (
                      <Paper className={classes.root} key={row.publicID}>
                        <Card>
                          <CardHeader
                            avatar={(<Avatar>A</Avatar>)}
                            action={(
                              <IconButton
                                onClick={() => this.handleDeleteGuia(row.publicID)}
                                aria-label="Deletar"
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                            title={row.paciente.nome}
                            subheader={
                              row.procedimentos.length > 0 && (
                                formatCurrency(row.procedimentos[0].valorprocedimento)
                              )
                            }
                          />
                          <CardActions>
                            <Button
                              to={{
                                pathname: `/guias/${row.publicID}`,
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
          </Fragment>
        )}
      </Fragment>
    );
  }
}

Guias.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  guias: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  loadGuias: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  guiasError: PropTypes.string.isRequired,
  deleteGuias: PropTypes.func.isRequired,
  // connectIO: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  guias: state.guiasReducer.guias,
  guiasError: state.guiasReducer.fetchError,
  value: state.searchReducer.value,
});

export default connect(mapStateToProps, {
  deleteGuias, loadGuias, searchChange, /* connectIO, */
})(withStyles(styles)(withRouter(Guias)));
