import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import {
  List,
  ListItem,
  Select,
  MenuItem,
  Grid,
} from '@material-ui/core';

import BoxSearch from '../../../components/Search';
import Message from '../../../components/Message';
import RefList from '../../../components/ListBox/RefList';
import { deleteLote } from '../../../actions/lotes';
import {
  formatDate,
  formatCurrency,
  orderByDate,
  matchItem,
} from '../../../helpers';

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
});

class LotesList extends Component {
  state = {
    allLotes: [],
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
    const { lotes, error } = this.props;

    if (prevProps.lotes !== lotes) {
      this.onLoad();
    }

    if (prevProps.error !== error) {
      this.onHandleMessage('Conectado.');
    }
  }

  onLoad = () => {
    const { lotes } = this.props;
    const { order } = this.state;
    this.setState({
      allLotes: orderByDate(lotes, 'DataEnvioCorreio', order),
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

  /* onHandleStatusLote = async (event, item) => {
    const { updateLote: propUpdateLoteStatus } = this.props;
    const { Status } = item;
    const { target } = event;

    if (Status !== target.value) {
      await this.onHandleMessage('Status atualizado.');
      await propUpdateLoteStatus({
        ...item,
        Status: target.value,
      });
    }
  } */

  onHandleDelete = async ({ PublicID }) => {
    const { deleteLote: propdeleteLote } = this.props;
    await propdeleteLote(PublicID);
    await this.onHandleMessage('Item excluido.');
    this.setState({ search: '' });
  }

  onHandleSearch = ({ value, name }) => {
    const { lotes } = this.props;
    this.setState(prevState => ({
      [name]: value,
      allLotes: orderByDate(lotes, 'DataEnvioCorreio', prevState.order).filter(item => (
        matchItem(item.Numero, value) || matchItem(item.Paciente.Nome, value)
      )),
    }));
  }

  onHandleOrder = (order) => {
    this.setState(prevState => ({
      order,
      allLotes: orderByDate(prevState.allLotes, 'DataEnvioCorreio', order),
    }));
  }

  render() {
    const { classes, error } = this.props;
    const {
      search,
      boxMessage,
      allLotes,
      order,
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
            <MenuItem value="asc">Mais recentes</MenuItem>
            <MenuItem value="desc">Mais antigos</MenuItem>
          </Select>
        </Grid>

        <BoxSearch
          value={search}
          name="search"
          onChange={e => this.onHandleSearch(e.target)}
          placeholder="Buscar lotes"
        />

        <List dense className={classes.root}>
          {allLotes.length ? (
            allLotes.map(item => (
              <RefList
                key={item.PublicID}
                item={item}
                error={error}
                onHandleDelete={this.onHandleDelete}
                setBox={{
                  to: 'lotes',
                  label: 'Código',
                  pretitle: item.PlanoOperadora.NomeFantasia || '',
                  title: item.PlanoOperadora.NomeFantasia || '',
                }}
              >
                <p>
                  {item.DataEnvioCorreio && formatDate(item.DataEnvioCorreio)}
                  {
                    item.ValorTotalLote
                    && typeof item.ValorTotalLote !== 'undefined' && (
                      <strong>
                        {' - '}
                        {formatCurrency(item.ValorTotalLote)}
                      </strong>
                    )
                  }
                </p>
              </RefList>
            ))
          ) : (
            <ListItem className={classes.listItem}>Nenhum lote encontrado.</ListItem>
          )
          }
        </List>
      </Fragment>
    );
  }
}

LotesList.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  lotes: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.string.isRequired,
  deleteLote: PropTypes.func.isRequired,
};

export default connect(null, {
  deleteLote,
})(withStyles(styles)(LotesList));
