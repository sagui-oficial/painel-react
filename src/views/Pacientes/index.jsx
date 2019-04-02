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
import Master from '../../components/Master';
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
    this.onHandleAddNew = this.onHandleAddNew.bind(this);
  }

  componentDidMount() {
    const { loadPacientes: propLoadItems } = this.props;
    propLoadItems();
  }

  onHandleAddNew() {
    const { history } = this.props;
    history.push('/pacientes/cadastrar');
  }

  render() {
    const {
      classes, error, pacientes, title,
    } = this.props;

    return (
      <Master title={title}>
        {pacientes && (
          <Fragment>
            <Grid container alignItems="center">
              <Typography variant="h6" color="inherit" noWrap>
                {title}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                className={classes.addBtn}
                disabled={!!error}
                onClick={this.onHandleAddNew}
              >
                +Novo
              </Button>
            </Grid>
            <Divider className={classes.divider} />
            <PacientesList pacientes={pacientes} error={error} />
          </Fragment>
        )}
      </Master>
    );
  }
}

Pacientes.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  pacientes: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  loadPacientes: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  title: PropTypes.string,
};

Pacientes.defaultProps = {
  title: String(),
};

const mapStateToProps = state => ({
  pacientes: state.pacientesReducer.pacientes,
  error: state.pacientesReducer.fetchError,
});

export default connect(mapStateToProps, {
  loadPacientes,
})(withStyles(styles)(Pacientes));
