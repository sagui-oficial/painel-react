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
import { loadProcedimentos } from '../../actions/procedimentos';
import ProcedimentosList from './List';

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

class Procedimentos extends Component {
  constructor(props) {
    super(props);
    this.onHandleAddNew = this.onHandleAddNew.bind(this);
  }

  componentDidMount() {
    const { loadProcedimentos: propLoadGuias } = this.props;
    propLoadGuias();
  }

  onHandleAddNew() {
    const { history } = this.props;
    history.push('/procedimentos/criar');
  }

  render() {
    const {
      classes, procedimentosError, procedimentos,
    } = this.props;

    return (
      <Fragment>
        {procedimentos && (
          <Fragment>
            <Grid container alignItems="center">
              <Typography variant="h6" color="inherit" noWrap>
                Procedimentos
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                className={classes.addBtn}
                disabled={!!procedimentosError}
                onClick={this.onHandleAddNew}
              >
                +Novo
              </Button>
            </Grid>
            <Divider className={classes.divider} />
            <ProcedimentosList procedimentos={procedimentos} error={procedimentosError} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

Procedimentos.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  procedimentos: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  loadProcedimentos: PropTypes.func.isRequired,
  procedimentosError: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  procedimentos: state.procedimentosReducer.procedimentos,
  procedimentosError: state.procedimentosReducer.fetchError,
});

export default connect(mapStateToProps, {
  loadProcedimentos,
})(withStyles(styles)(Procedimentos));
