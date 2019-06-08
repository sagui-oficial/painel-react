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
import Loading from '../../components/Loading';

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
  state = {
    loading: true,
  }

  componentDidMount() {
    this.loadItems();
  }

  loadItems = async () => {
    const { loadPacientes: propLoadItems } = this.props;
    await propLoadItems();
    this.setState({ loading: false });
  }

  onHandleAddNew = () => {
    const { history } = this.props;
    history.push('/pacientes/cadastrar');
  }

  render() {
    const {
      classes, error, pacientes, title,
    } = this.props;

    const { loading } = this.state;

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
            {!loading ? (
              <PacientesList pacientes={pacientes} error={error} />
            ) : (
              <Loading />
            )}
          </Fragment>
        )}
      </Master>
    );
  }
}

Pacientes.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  pacientes: PropTypes.instanceOf(Object),
  loadPacientes: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  title: PropTypes.string,
};

Pacientes.defaultProps = {
  title: String(),
  pacientes: [],
};

const mapStateToProps = state => ({
  pacientes: state.pacientesReducer.pacientes,
  error: state.pacientesReducer.fetchError,
});

export default connect(mapStateToProps, {
  loadPacientes,
})(withStyles(styles)(Pacientes));
