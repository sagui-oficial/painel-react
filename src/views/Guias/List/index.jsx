import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

// ICONS
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

// LOCAL IMPORTS
import BoxSearch from '../../../components/Search';
import { formatCurrency } from '../../../helpers';
import { searchChange } from '../../../actions/search';
import { loadGuias, deleteGuias } from '../../../actions/guias';

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
        text: '',
      },
    };

    this.handleOnClose = this.handleOnClose.bind(this);
    this.handleMessageError = this.handleMessageError.bind(this);

    this.handleDeleteGuia = this.handleDeleteGuia.bind(this);
    this.handleNewGuia = this.handleNewGuia.bind(this);
    this.handleStatusGuia = this.handleStatusGuia.bind(this);
  }

  componentDidMount() {
    const { loadGuias: propLoadGuias } = this.props;

    this.handleMessageError(propLoadGuias);
  }

  handleMessageError(applyHandle, text) {
    const { guiasError } = this.props;

    if (guiasError.indexOf('Error') > -1) {
      this.setState({ boxMessage: { open: true, text: guiasError } });
      return;
    }

    if (typeof text !== 'undefined') {
      this.setState({ boxMessage: { open: true, text } });
    }

    applyHandle();
  }

  handleOnClose() {
    const { boxMessage } = this.state;
    const { text } = boxMessage;

    this.setState({
      boxMessage: { open: false, text },
    });
  }

  handleStatusGuia(e, openID) {
    e.preventDefault();

    this.setState({
      boxMessage: { open: true, text: openID },
    });
  }

  handleDeleteGuia(postID) {
    const { deleteGuias: propDeleteGuias } = this.props;

    this.handleMessageError(() => propDeleteGuias(
      { status: 99 },
      postID,
    ), 'Item excluido.');
  }

  handleNewGuia() {
    const { history } = this.props;

    this.handleMessageError(() => history.push('/guias/criar'));
  }

  render() {
    const { classes, guias, value } = this.props;
    const { boxMessage } = this.state;

    return (
      <Fragment>
        <Snackbar
          open={boxMessage.open}
          message={<span id="message-id">{boxMessage.text}</span>}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          autoHideDuration={6000}
          onClose={this.handleOnClose}
          onExited={this.handleOnClose}
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
              <List dense className={classes.root}>
                {
                  guias.map(row => (
                    row.paciente.nome.toLowerCase().indexOf(value.trim().toLowerCase()) >= 0
                    && row.status !== 99 && (
                      <ListItem
                        key={row.publicID}
                        to={{
                          pathname: `/guias/${row.publicID}`,
                          state: { ...row },
                        }}
                        component={Link}
                        button
                      >
                        <ListItemAvatar>
                          <Avatar aria-label={row.paciente.nome} className={classes.avatar}>
                            {row.paciente.nome.substring(0, 1).toUpperCase()}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={row.paciente.nome}
                          secondary={(
                            <Fragment>
                              <Button
                                size="small"
                                onClick={e => this.handleStatusGuia(e, row.publicID)}
                              >
                                {row.status === 1 ? ('Ativo') : ('Removido')}
                              </Button>
                              <span>
                                {
                                  row.procedimentos.length > 0 && (
                                    formatCurrency(row.procedimentos[0].valorprocedimento)
                                  )
                                }
                              </span>
                            </Fragment>
                          )}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={() => this.handleDeleteGuia(row.publicID)}
                            aria-label="Deletar"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      /* <div>
                        <Button
                          to={{
                            pathname: `/guias/${row.publicID}`,
                            state: { ...row },
                          }}
                          component={Link}
                          aria-label="Editar"
                        >
                          Editar
                        </Button>
                        <Avatar aria-label={row.paciente.nome} className={classes.avatar}>
                          {row.paciente.nome.substring(0, 1).toUpperCase()}
                        </Avatar>
                        <p>{row.paciente.nome}</p>
                        <p>
                          {row.status === 1 ? (
                            <span>Ativo</span>
                          ) : (
                            <span>Removido</span>
                          )}
                        </p>
                        <p>
                          {
                            row.procedimentos.length > 0 && (
                              formatCurrency(row.procedimentos[0].valorprocedimento)
                            )
                          }
                        </p>
                        <IconButton
                          onClick={() => this.handleDeleteGuia(row.publicID)}
                          aria-label="Deletar"
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </div> */
                    )
                  ))
                }
              </List>
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
};

const mapStateToProps = state => ({
  guias: state.guiasReducer.guias,
  guiasError: state.guiasReducer.fetchError,
  value: state.searchReducer.value,
});

export default connect(mapStateToProps, {
  deleteGuias, loadGuias, searchChange,
})(withStyles(styles)(withRouter(Guias)));
