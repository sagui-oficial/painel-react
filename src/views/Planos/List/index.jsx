import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
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
import { deletePlano } from '../../../actions/planos';
import { orderBy, matchItem } from '../../../helpers';
import ListBox from './ListBox';

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

  onHandleDelete = async ({ PublicID, NomeFantasia }) => {
    const { deletePlano: propdeletePlano } = this.props;
    await propdeletePlano(PublicID);
    await this.onHandleMessage(`${NomeFantasia} excluído.`);
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
          placeholder="Buscar planos"
        />

        <List dense className={classes.root}>
          {allPlanos.length ? (
            allPlanos.map(item => (
              <ListBox
                key={item.PublicID}
                item={item}
                error={error}
                onHandleDelete={this.onHandleDelete}
              />
            ))
          ) : (
            <ListItem className={classes.listItem}>Nenhum plano encontrado.</ListItem>
          )
          }
        </List>
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
})(withStyles(styles)(withRouter(PlanosList)));
