import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import {
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Select,
  MenuItem,
  Grid,
} from '@material-ui/core';

import {
  Delete as DeleteIcon,
} from '@material-ui/icons';

import BoxSearch from '../../../components/Search';
import Message from '../../../components/Message';
import { deletePaciente } from '../../../actions/pacientes';
import { orderBy, matchItem } from '../../../helpers';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  topBottomSpace: {
    marginTop: '5px',
    marginBottom: '15px',
  },
  listItem: {
    marginBottom: '15px',
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingRight: '50px',
    alignItems: 'start',
    borderRadius: '6px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
  },
  iconDelete: {
    top: '7px',
    right: '7px',
    transform: 'none',
  },
  smallItemText: {
    fontSize: '14px',
    color: '#616161',
    paddingBottom: '7px',
  },
  selectBox: {
    fontSize: '14px',
    '& [role="button"]': {
      paddingLeft: 0,
      background: 'none',
    },
    '&:hover:before, &:focus:before': {
      border: '0 !important',
    },
    '&:before, &:after': {
      border: 0,
    },
  },
  boxList: {
    paddingLeft: theme.spacing.unit * 1.8,
    '& p': {
      margin: 0,
    },
  },
});

class PacientesList extends Component {
  state = {
    allPacientes: [],
    search: '',
    order: 'asc',
    boxMessage: {
      open: false,
      text: '',
    },
  }

  componentDidMount() {
    this.onLoad();
    this.onHandleMessage();
  }

  componentDidUpdate(prevProps) {
    const { pacientes, error } = this.props;

    if (prevProps.pacientes !== pacientes) {
      this.onLoad();
    }

    if (prevProps.error !== error) {
      this.onHandleMessage('Conectado.');
    }
  }

  onLoad = () => {
    const { pacientes } = this.props;
    const { order } = this.state;

    this.setState({
      allPacientes: orderBy(pacientes, 'Nome', order),
    });
  }

  onHandleMessage = (text) => {
    const { error } = this.props;

    if (error.indexOf('Error') > -1) {
      this.setState({ boxMessage: { open: true, text: error } });
      return;
    }

    if (typeof text !== 'undefined') {
      this.setState({ boxMessage: { open: true, text } });
    }
  }

  onHandleOnClose = () => {
    const { boxMessage } = this.state;
    const { text } = boxMessage;

    this.setState({
      boxMessage: { open: false, text },
    });
  }

  onHandleDelete = (postID) => {
    const { deletePaciente: propdeletePaciente } = this.props;

    propdeletePaciente(postID);
    this.onHandleMessage('Item excluido.');
  }

  onHandleSearch = ({ value, name }) => {
    const { pacientes } = this.props;

    this.setState(prevState => ({
      [name]: value,
      allPacientes: orderBy(pacientes, 'Nome', prevState.order).filter(item => (
        matchItem(item.Nome, value) || matchItem(item.CPF, value)
      )),
    }));
  }

  onHandleOrder = (order) => {
    this.setState(prevState => ({
      order,
      allPacientes: orderBy(prevState.allPacientes, 'Nome', order),
    }));
  }

  render() {
    const { classes, error } = this.props;
    const {
      allPacientes, boxMessage, order, search,
    } = this.state;

    return (
      <Fragment>
        <Message
          text={boxMessage.text}
          open={boxMessage.open}
          onHandleOnClose={this.onHandleOnClose}
        />

        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          className={classes.topBottomSpace}
        >
          <Select
            className={classes.selectBox}
            value={order}
            onChange={e => this.onHandleOrder(e.target.value)}
          >
            <MenuItem value="asc">A-Z</MenuItem>
            <MenuItem value="desc">Z-A</MenuItem>
          </Select>
        </Grid>

        <BoxSearch
          value={search}
          name="search"
          onChange={e => this.onHandleSearch(e.target)}
          placeholder="Buscar pacientes"
        />

        <List dense className={classes.root}>
          {allPacientes.length ? (
            allPacientes.map(item => (
              <ListItem
                key={item.PublicID}
                className={classes.listItem}
                to={{
                  pathname: `/pacientes/${item.PublicID}`,
                  state: { ...item },
                }}
                component={Link}
                button
              >
                <ListItemAvatar>
                  <Avatar aria-label={item.Nome} className={classes.avatar}>
                    {item.Nome.substring(0, 1).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <div className={classes.boxList}>
                  <p className={classes.smallItemText}>
                    <strong>CPF:</strong>
                    {' '}
                    {item.CPF}
                  </p>
                  <p>
                    <strong>{item.Nome}</strong>
                  </p>
                </div>
                <ListItemSecondaryAction className={classes.iconDelete}>
                  <IconButton
                    disabled={!!error}
                    onClick={() => this.onHandleDelete(item.PublicID)}
                    aria-label="Deletar"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <ListItem className={classes.listItem}>Nenhum paciente encontrado.</ListItem>
          )
          }
        </List>
      </Fragment>
    );
  }
}

PacientesList.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  pacientes: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.string.isRequired,
  deletePaciente: PropTypes.func.isRequired,
};

export default connect(null, {
  deletePaciente,
})(withStyles(styles)(withRouter(PacientesList)));
