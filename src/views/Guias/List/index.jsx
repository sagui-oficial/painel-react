import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  IconButton,
  Snackbar,
  Avatar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Select,
  FormControl,
  MenuItem,
} from '@material-ui/core';

// ICONS
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';

// LOCAL IMPORTS
import BoxSearch from '../../../components/Search';
import { formatCurrency } from '../../../helpers';
import { searchChange } from '../../../actions/search';
import { loadGuias, deleteGuia, updateGuia } from '../../../actions/guias';

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
    this.handleMessage = this.handleMessage.bind(this);
    this.handleDeleteGuia = this.handleDeleteGuia.bind(this);
    this.handleNewGuia = this.handleNewGuia.bind(this);
    this.handleStatusGuia = this.handleStatusGuia.bind(this);
  }

  componentDidMount() {
    const { loadGuias: propLoadGuias } = this.props;
    propLoadGuias();
    this.handleMessage();
  }

  componentDidUpdate(prevProps) {
    const { guiasError } = this.props;

    if (prevProps.guiasError !== guiasError) {
      this.handleMessage('Conectado.');
    }
  }

  handleStatusGuiaCk = (event) => {
    event.preventDefault();
  }

  handleMessage(text) {
    const { guiasError } = this.props;

    if (guiasError.indexOf('Error') > -1) {
      this.setState({ boxMessage: { open: true, text: guiasError } });
      return;
    }

    if (typeof text !== 'undefined') {
      this.setState({ boxMessage: { open: true, text } });
    }
  }

  handleOnClose() {
    const { boxMessage } = this.state;
    const { text } = boxMessage;

    this.setState({
      boxMessage: { open: false, text },
    });
  }

  handleDeleteGuia(postID) {
    const { deleteGuia: propdeleteGuia } = this.props;
    this.handleMessage('Item excluido.');
    propdeleteGuia({ status: 99 }, postID);
  }

  handleNewGuia() {
    const { history } = this.props;
    this.handleMessage();
    history.push('/guias/criar');
  }

  handleStatusGuia(event, prevStatus, postID) {
    const { updateGuia: propUpdateGuias } = this.props;
    const { target } = event;

    if (prevStatus !== target.value) {
      this.handleMessage('Status atualizado.');
      propUpdateGuias({ status: target.value }, postID);
    }
  }

  render() {
    const {
      classes, guias, value, guiasError,
    } = this.props;
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
                disabled={!!guiasError}
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
                    (row.numero.toLowerCase().indexOf(value.trim().toLowerCase()) >= 0
                      || row.paciente.nome.toLowerCase().indexOf(value.trim().toLowerCase()) >= 0)
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
                        <div>
                          {row.numero}
                          <br />
                          {row.paciente.nome}
                          <br />
                          <FormControl className={classes.formControl}>
                            <Select
                              name={row.numero}
                              value={row.status}
                              onClick={this.handleStatusGuiaCk}
                              onChange={e => this.handleStatusGuia(e, row.status, row.publicID)}
                              disabled={!!guiasError}
                              displayEmpty
                            >
                              <MenuItem value={1}>Criada</MenuItem>
                              <MenuItem value={2}>Concluida</MenuItem>
                              {/* <MenuItem value={99}>Deletada</MenuItem> */}
                            </Select>
                          </FormControl>
                          <br />
                          {
                            row.procedimentos.length > 0 && (
                              formatCurrency(row.procedimentos[0].valorprocedimento)
                            )
                          }
                        </div>
                        <ListItemSecondaryAction>
                          <IconButton
                            disabled={!!guiasError}
                            onClick={() => this.handleDeleteGuia(row.publicID)}
                            aria-label="Deletar"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
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
  deleteGuia: PropTypes.func.isRequired,
  updateGuia: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  guias: state.guiasReducer.guias,
  guiasError: state.guiasReducer.fetchError,
  value: state.searchReducer.value,
});

export default connect(mapStateToProps, {
  deleteGuia, loadGuias, searchChange, updateGuia,
})(withStyles(styles)(withRouter(Guias)));
