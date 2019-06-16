import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Select, MenuItem, Grid } from '@material-ui/core';

import BoxSearch from '../../../components/Search';
import Message from '../../../components/Message';
import { deletePaciente } from '../../../actions/pacientes';
import { orderBy, matchItem } from '../../../helpers';
import ListBox from '../../../components/ListBox';

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

  onHandleDelete = async ({ PublicID }) => {
    const { deletePaciente: propdeletePaciente } = this.props;
    await propdeletePaciente(PublicID);
    await this.onHandleMessage('Item excluido.');
    this.setState({ search: '' });
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
          justify="space-between"
          alignItems="center"
          className={classes.topBottomSpace}
        >
          <p style={{ fontSize: 14 }}>
            <strong>
              Exibindo:
            </strong>
            {' '}
            {allPacientes ? allPacientes.length : 0}
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
          placeholder="Buscar pacientes"
        />

        <ListBox
          error={error}
          listItemsObject={allPacientes}
          onHandleDelete={this.onHandleDelete}
          setBox={{
            to: 'pacientes',
            label: 'CPF',
            pretitle: 'CPF',
            title: 'Nome',
          }}
        />
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
})(withStyles(styles)(PacientesList));
