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
import { loadPlanos } from '../../actions/planos';
import PlanosList from './List';

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

class Planos extends Component {
  constructor(props) {
    super(props);
    this.onHandleAddNew = this.onHandleAddNew.bind(this);
  }

  componentDidMount() {
    const { loadPlanos: propLoadItems } = this.props;
    propLoadItems();
  }

  onHandleAddNew() {
    const { history } = this.props;
    history.push('/planos/criar');
  }

  render() {
    const {
      classes, error, planos,
    } = this.props;

    return (
      <Master>
        {planos && (
          <Fragment>
            <Grid container alignItems="center">
              <Typography variant="h6" color="inherit" noWrap>
                Planos
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
            <PlanosList planos={planos} error={error} />
          </Fragment>
        )}
      </Master>
    );
  }
}

Planos.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  planos: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  loadPlanos: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  planos: state.planosReducer.planos,
  error: state.planosReducer.fetchError,
});

export default connect(mapStateToProps, {
  loadPlanos,
})(withStyles(styles)(Planos));
