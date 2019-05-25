import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Select, MenuItem, Grid } from '@material-ui/core';

import BoxSearch from '../../../components/Search';
import Message from '../../../components/Message';
import ListBox from '../../../components/ListBox';
import { deleteProcedimento } from '../../../actions/procedimentos';
import { orderBy, matchItem } from '../../../helpers';

const styles = () => ({
  topBottomSpace: {
    marginTop: '5px',
    marginBottom: '15px',
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

class ProcedimentosList extends Component {
  state = {
    allProcedimentos: [],
    search: '',
    order: 'asc',
    boxMessage: {
      open: false,
      text: '',
    },
  };

  componentDidMount() {
    this.onLoad();
    this.onHandleMessage();
  }

  componentDidUpdate(prevProps) {
    const { procedimentos, error } = this.props;

    if (prevProps.procedimentos !== procedimentos) {
      this.onLoad();
    }

    if (prevProps.error !== error) {
      this.onHandleMessage('Conectado.');
    }
  }

  onLoad = () => {
    const { procedimentos } = this.props;
    const { order } = this.state;

    this.setState({
      allProcedimentos: orderBy(procedimentos, 'NomeProcedimento', order),
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

  onHandleDelete = async ({ PublicID }) => {
    const { deleteProcedimento: propdeleteProcedimento } = this.props;
    await propdeleteProcedimento(PublicID);
    await this.onHandleMessage('Item excluido.');
  }

  onHandleSearch = ({ value, name }) => {
    const { procedimentos } = this.props;

    this.setState(prevState => ({
      [name]: value,
      allProcedimentos: orderBy(procedimentos, 'NomeProcedimento', prevState.order).filter(item => (
        matchItem(item.NomeProcedimento, value) || matchItem(item.Codigo, value)
      )),
    }));
  }

  onHandleOrder = (order) => {
    this.setState(prevState => ({
      order,
      allProcedimentos: orderBy(prevState.allProcedimentos, 'NomeProcedimento', order),
    }));
  }

  render() {
    const { classes, error } = this.props;
    const {
      allProcedimentos, boxMessage, order, search,
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
          placeholder="Buscar procedimentos"
        />

        <ListBox
          listItemsObject={allProcedimentos}
          error={error}
          setBox={{
            to: 'procedimentos',
            label: 'Código',
            pretitle: 'Codigo',
            title: 'NomeProcedimento',
          }}
          onHandleDelete={this.onHandleDelete}
        />
      </Fragment>
    );
  }
}

ProcedimentosList.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  procedimentos: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.string.isRequired,
  deleteProcedimento: PropTypes.func.isRequired,
};

export default connect(null, {
  deleteProcedimento,
})(withStyles(styles)(ProcedimentosList));
