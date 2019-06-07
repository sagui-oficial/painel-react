import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import {
  List,
  ListItem,
  Select,
  FormControl,
  MenuItem,
  Grid,
} from '@material-ui/core';

import BoxSearch from '../../../components/Search';
import Message from '../../../components/Message';
import RefList from '../../../components/ListBox/RefList';
import { deleteGuia, updateGuia } from '../../../actions/guias';
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

class GuiasList extends Component {
  state = {
    allGuias: [],
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
    const { guias, error } = this.props;

    if (prevProps.guias !== guias) {
      this.onLoad();
    }

    if (prevProps.error !== error) {
      this.onHandleMessage('Conectado.');
    }
  }

  onLoad = () => {
    const { guias } = this.props;
    const { order } = this.state;
    this.setState({
      allGuias: orderByDate(guias, 'Vencimento', order),
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


  onHandleStatusGuia = async (event, item) => {
    const { updateGuia: propUpdateGuiaStatus } = this.props;
    const { Status } = item;
    const { target } = event;

    if (Status !== target.value) {
      await this.onHandleMessage('Status atualizado.');
      await propUpdateGuiaStatus({
        ...item,
        Status: target.value,
      });
    }
  }

  onHandleDelete = async ({ PublicID }) => {
    const { deleteGuia: propdeleteGuia } = this.props;
    await propdeleteGuia(PublicID);
    await this.onHandleMessage('Item excluido.');
    this.setState({ search: '' });
  }

  onHandleSearch = ({ value, name }) => {
    const { guias } = this.props;
    this.setState(prevState => ({
      [name]: value,
      allGuias: orderByDate(guias, 'Vencimento', prevState.order).filter(item => (
        matchItem(item.Numero, value) || matchItem(item.Paciente.Nome, value)
      )),
    }));
  }

  onHandleOrder = (order) => {
    this.setState(prevState => ({
      order,
      allGuias: orderByDate(prevState.allGuias, 'Vencimento', order),
    }));
  }

  render() {
    const { classes, error } = this.props;
    const {
      allGuias, boxMessage, order, search,
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
          placeholder="Buscar guias"
        />

        <List dense className={classes.root}>
          {allGuias.length ? (
            allGuias.map(item => (
              <RefList
                key={item.PublicID}
                item={item}
                error={error}
                onHandleDelete={this.onHandleDelete}
                setBox={{
                  to: 'guias',
                  label: 'Numero',
                  pretitle: item.Numero,
                  title: item.Paciente.Nome,
                }}
              >
                <FormControl>
                  <Select
                    name={item.Numero}
                    value={item.Status ? item.Status : 2}
                    className={classes.selectBox}
                    onClick={e => e.preventDefault()}
                    onChange={e => this.onHandleStatusGuia(e, item)}
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
                  {
                    item.ValorTotalProcedimentos
                    && typeof item.ValorTotalProcedimentos !== 'undefined' && (
                      <strong>
                        {' - '}
                        {formatCurrency(item.ValorTotalProcedimentos)}
                      </strong>
                    )
                  }
                </p>
              </RefList>
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
  deleteGuia: PropTypes.func.isRequired,
  updateGuia: PropTypes.func.isRequired,
};

export default connect(null, {
  deleteGuia, updateGuia,
})(withStyles(styles)(GuiasList));
