import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Select, MenuItem, Grid } from '@material-ui/core';

import BoxSearch from '../../../components/Search';
import Message from '../../../components/Message';
import ListBox from '../../../components/ListBox';
import { deletePlano } from '../../../actions/planos';
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

class PlanosList extends Component {
  state = {
    allPlanos: [],
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
    const { planos, error } = this.props;

    if (prevProps.planos !== planos) {
      this.onLoad();
    }

    if (prevProps.error !== error) {
      this.onHandleMessage('Conectado.');
    }
  }

  onLoad = () => {
    const { planos } = this.props;
    const { order } = this.state;

    this.setState({
      allPlanos: orderBy(planos, 'NomeFantasia', order),
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
    const { deletePlano: propdeletePlano } = this.props;
    await propdeletePlano(PublicID);
    await this.onHandleMessage('Item excluído.');
    this.setState({ search: '' });
  }

  onHandleSearch = ({ value, name }) => {
    const { planos } = this.props;

    this.setState(prevState => ({
      [name]: value,
      allPlanos: orderBy(planos, 'NomeFantasia', prevState.order).filter(item => (
        matchItem(item.NomeFantasia, value) || matchItem(item.CNPJ, value)
      )),
    }));
  }

  onHandleOrder = (order) => {
    this.setState(prevState => ({
      order,
      allPlanos: orderBy(prevState.allPlanos, 'NomeFantasia', order),
    }));
  }

  render() {
    const { classes, error } = this.props;
    const {
      allPlanos,
      boxMessage,
      order,
      search,
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
          justify="space-between"
          alignItems="center"
          className={classes.topBottomSpace}
        >
          <p style={{ fontSize: 14 }}>
            <strong>
              Exibindo:
            </strong>
            {' '}
            {allPlanos ? allPlanos.length : 0}
          </p>
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
          placeholder="Buscar planos"
        />

        <ListBox
          error={error}
          listItemsObject={allPlanos}
          onHandleDelete={this.onHandleDelete}
          setBox={{
            to: 'planos',
            label: 'CNPJ',
            pretitle: 'CNPJ',
            title: 'NomeFantasia',
          }}
        />
      </Fragment>
    );
  }
}

PlanosList.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  planos: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.string.isRequired,
  deletePlano: PropTypes.func.isRequired,
};

export default connect(null, {
  deletePlano,
})(withStyles(styles)(PlanosList));
