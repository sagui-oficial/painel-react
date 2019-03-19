import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  Select,
  MenuItem,
  Grid,
} from '@material-ui/core';

import BoxSearch from '../../../components/Search';
import { searchChange, resetSearch } from '../../../actions/search';

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

class PacientesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allPacientes: [],
      order: 'asc',
    };

    this.onLoadPacientes = this.onLoadPacientes.bind(this);
    this.onHandleSearch = this.onHandleSearch.bind(this);
    this.onHandleOrderPacientes = this.onHandleOrderPacientes.bind(this);
  }

  componentDidMount() {
    const { resetSearch: propResetSearch } = this.props;
    propResetSearch();

    this.onLoadPacientes();
  }

  componentDidUpdate(prevProps) {
    const { pacientes, inputValue } = this.props;

    if (prevProps.pacientes !== pacientes) {
      this.onLoadPacientes();
    }

    if (prevProps.inputValue !== inputValue) {
      this.onHandleSearch();
    }
  }

  onLoadPacientes() {
    const { pacientes } = this.props;

    this.setState({
      allPacientes: pacientes,
    });
  }

  onHandleSearch() {
    const { pacientes, inputValue } = this.props;
    const regex = new RegExp(inputValue, 'gi');

    const matchItem = items => items.match(regex) !== null;

    this.setState({
      allPacientes: pacientes.filter(item => matchItem(item.Nome)),
    });
  }

  onHandleOrderPacientes(order) {
    this.setState({ order });
  }

  render() {
    const { classes } = this.props;
    const { allPacientes, order } = this.state;

    return (
      <Fragment>
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
            onChange={e => this.onHandleOrderPacientes(e.target.value)}
          >
            <MenuItem value="asc">Mais recentes</MenuItem>
            <MenuItem value="desc">Mais antigos</MenuItem>
          </Select>
        </Grid>

        <BoxSearch placeholder="Buscar pacientes" />

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
                  <p>
                    <strong>{item.Nome}</strong>
                  </p>
                </div>
              </ListItem>
            ))
          ) : (
            <ListItem className={classes.listItem}>Nenhum paciente.</ListItem>
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
  inputValue: PropTypes.string.isRequired,
  resetSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  inputValue: state.searchReducer.inputValue,
});

export default connect(mapStateToProps, {
  searchChange, resetSearch,
})(withStyles(styles)(withRouter(PacientesList)));
