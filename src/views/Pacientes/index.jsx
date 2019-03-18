import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// MATERIAL IMPORTS
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';

// LOCAL IMPORTS
import { loadPacientes } from '../../actions/pacientes';
import PacientesList from './List';

const styles = theme => ({
  divider: {
    ...theme.divider,
    marginBottom: 0,
  },
  addBtn: {
    ...theme.roundedBtn,
    marginLeft: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0',
      marginTop: '0.5rem',
      width: '100%',
    },
  },
});

class Pacientes extends Component {
  constructor(props) {
    super(props);
    this.handleNewPaciente = this.handleNewPaciente.bind(this);
  }

  componentDidMount() {
    const { loadPacientes: propLoadPacientes } = this.props;
    propLoadPacientes();
  }

  handleNewPaciente() {
    const { history } = this.props;
    history.push('/pacientes/criar');
  }

  render() {
    const {
      classes, pacientes,
    } = this.props;

    return (
      <Fragment>
        {pacientes && (
          <Fragment>
            <Grid container alignItems="center">
              <Typography variant="h6" color="inherit" noWrap>
                Cadastro de pacientes
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                className={classes.addBtn}
                onClick={this.handleNewPaciente}
              >
                +Novo
              </Button>
            </Grid>
            <Divider className={classes.divider} />
            <PacientesList pacientes={pacientes} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

Pacientes.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  pacientes: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  loadPacientes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  pacientes: state.pacientesReducer.pacientes,
});

export default connect(mapStateToProps, {
  loadPacientes,
})(withStyles(styles)(Pacientes));
