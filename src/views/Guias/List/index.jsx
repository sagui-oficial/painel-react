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
  FormControl,
  MenuItem,
  Grid,
} from '@material-ui/core';

import {
  Delete as DeleteIcon,
} from '@material-ui/icons';

import BoxSearch from '../../../components/Search';
import Message from '../../../components/Message';
import { searchChange } from '../../../actions/search';
import { deleteGuia, updateGuia } from '../../../actions/guias';
import { formatDate, formatCurrency } from '../../../helpers';

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

class GuiasList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allGuias: [],
      order: 'asc',
      boxMessage: {
        open: false,
        text: '',
      },
    };

    this.onLoadGuias = this.onLoadGuias.bind(this);
    this.onHandleSearch = this.onHandleSearch.bind(this);
    this.onHandleMessage = this.onHandleMessage.bind(this);
    this.onHandleOnClose = this.onHandleOnClose.bind(this);
    this.onHandleDeleteGuia = this.onHandleDeleteGuia.bind(this);
    this.onHandleStatusGuia = this.onHandleStatusGuia.bind(this);
    this.onHandleOrderGuias = this.onHandleOrderGuias.bind(this);
  }

  componentDidMount() {
    this.onLoadGuias();
    this.onHandleMessage();
  }

  componentDidUpdate(prevProps) {
    const { guias, inputValue, error } = this.props;

    if (prevProps.guias !== guias) {
      this.onLoadGuias();
    }

    if (prevProps.inputValue !== inputValue) {
      this.onHandleSearch();
    }

    if (prevProps.error !== error) {
      this.onHandleMessage('Conectado.');
    }
  }

  onLoadGuias() {
    const { guias } = this.props;

    this.setState({
      allGuias: guias,
    });
  }

  onHandleSearch() {
    const { guias, inputValue } = this.props;
    const regex = new RegExp(inputValue, 'gi');

    const matchItem = items => items.match(regex) !== null;

    this.setState({
      allGuias: guias.filter(item => matchItem(item.Paciente.Nome) || matchItem(item.Numero)),
    });
  }

  onHandleMessage(text) {
    const { error } = this.props;

    if (error.indexOf('Error') > -1) {
      this.setState({ boxMessage: { open: true, text: error } });
      return;
    }

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

  onHandleDeleteGuia(postID) {
    const { deleteGuia: propdeleteGuia } = this.props;

    propdeleteGuia({ Status: 99 }, postID);
    this.onHandleMessage('Item excluido.');
  }

  onHandleStatusGuia(event, prevStatus, postID) {
    const { updateGuia: propUpdateGuias } = this.props;
    const { target } = event;

    if (prevStatus !== target.value) {
      this.onHandleMessage('Status atualizado.');

      propUpdateGuias({
        Status: target.value,
      }, postID);
    }
  }

  onHandleOrderGuias(order) {
    this.setState({ order });
  }

  render() {
    const { classes, error } = this.props;
    const { allGuias, boxMessage, order } = this.state;

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
            onChange={e => this.onHandleOrderGuias(e.target.value)}
          >
            <MenuItem value="asc">Mais recentes</MenuItem>
            <MenuItem value="desc">Mais antigos</MenuItem>
          </Select>
        </Grid>

        <BoxSearch placeholder="Buscar guias" />

        <List dense className={classes.root}>
          {allGuias.length ? (
            allGuias.map(item => (
              <ListItem
                key={item.PublicID}
                className={classes.listItem}
                to={{
                  pathname: `/guias/${item.PublicID}`,
                  state: { ...item },
                }}
                component={Link}
                button
              >
                <ListItemAvatar>
                  <Avatar aria-label={item.Paciente.Nome} className={classes.avatar}>
                    {item.Paciente.Nome.substring(0, 1).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <div className={classes.boxList}>
                  <p className={classes.smallItemText}>
                    {item.Numero}
                  </p>

                  <p>
                    <strong>{item.Paciente.Nome}</strong>
                  </p>

                  <FormControl>
                    <Select
                      name={item.Numero}
                      value={item.Status ? item.Status : 2}
                      className={classes.selectBox}
                      onClick={e => e.preventDefault()}
                      onChange={e => this.onHandleStatusGuia(e, item.Status, item.PublicID)}
                      disabled={!!error}
                      displayEmpty
                    >
                      <MenuItem value={1}>Criada</MenuItem>
                      <MenuItem value={2}>Concluida</MenuItem>
                      {/* <MenuItem value={99}>Deletada</MenuItem> */}
                    </Select>
                  </FormControl>

                  <p>
                    {formatDate(item.Vencimento)}
                    {' - '}
                    {
                      item.Procedimentos.length > 0 && (
                        <strong>
                          {formatCurrency(item.Procedimentos[0].ValorProcedimento)}
                        </strong>
                      )
                    }
                  </p>
                </div>
                <ListItemSecondaryAction className={classes.iconDelete}>
                  <IconButton
                    disabled={!!error}
                    onClick={() => this.onHandleDeleteGuia(item.PublicID)}
                    aria-label="Deletar"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <ListItem className={classes.listItem}>Nenhuma guia encontrada.</ListItem>
          )
          }
        </List>
      </Fragment>
    );
  }
}

GuiasList.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  guias: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  deleteGuia: PropTypes.func.isRequired,
  updateGuia: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  inputValue: state.searchReducer.inputValue,
});

export default connect(mapStateToProps, {
  searchChange, deleteGuia, updateGuia,
})(withStyles(styles)(withRouter(GuiasList)));
