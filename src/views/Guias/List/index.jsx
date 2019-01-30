import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

// MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  Card, CardActions, CardHeader, Avatar,
} from '@material-ui/core';

// LOCAL IMPORTS
import {
  formatCurrency, randomPrice, randomStatusGuias, randomNames,
} from '../../../helpers';

// ACTIONS
import { loadGuias, addGuia, deleteGuias } from '../../../actions/guias';
import { searchChange } from '../../../actions/search';

// COMPONENTS
import BoxSearch from '../../../components/BoxSearch';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

class Guias extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteGuia = this.handleDeleteGuia.bind(this);
    this.handleAddGuia = this.handleAddGuia.bind(this);
  }

  componentDidMount() {
    const { loadGuias: propLoadGuias } = this.props;
    propLoadGuias();
  }

  handleDeleteGuia(postID) {
    const { deleteGuias: propDeleteGuias } = this.props;
    propDeleteGuias(postID);
  }

  handleAddGuia() {
    const { addGuia: propAddGuia } = this.props;
    const createID = uuidv1();

    propAddGuia(
      {
        id: createID,
        numGuia: createID.split('-')[0].toUpperCase(),
        paciente: randomNames(),
        vencimento: new Date().toLocaleDateString('pt-br'),
        status: randomStatusGuias(),
        valor: randomPrice(50, 1500),
      },
    );
  }

  render() {
    const { classes, guias, value } = this.props;

    return (
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleAddGuia}
        >
          Adicionar Guia
        </Button>


        {guias.length > 0 && (
          <Fragment>
            <BoxSearch />
            {
              guias.map(row => (
                row.paciente.toLowerCase().indexOf(value.trim().toLowerCase()) >= 0
                && (
                  <Paper className={classes.root} key={row.id}>
                    <Card>
                      <CardHeader
                        avatar={(<Avatar>A</Avatar>)}
                        action={(
                          <IconButton
                            onClick={() => this.handleDeleteGuia(row.id)}
                            aria-label="Deletar"
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                        title={row.paciente}
                        subheader={formatCurrency(row.valor)}
                      />
                      <CardActions>
                        <Button
                          to={{
                            pathname: `/guias/${row.numGuia}`,
                            state: { ...row },
                          }}
                          component={NavLink}
                          aria-label="Editar"
                        >
                          Editar
                        </Button>
                      </CardActions>
                    </Card>
                  </Paper>
                )
              ))
            }
          </Fragment>
        )}
      </Grid>
    );
  }
}

Guias.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  guias: PropTypes.instanceOf(Array).isRequired,
  loadGuias: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  addGuia: PropTypes.func.isRequired,
  deleteGuias: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  guias: state.guiasReducer.guias,
  value: state.searchReducer.value,
});

export default connect(mapStateToProps, {
  deleteGuias, loadGuias, addGuia, searchChange,
})(withStyles(styles)(Guias));
