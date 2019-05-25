import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';

import Master from '../../components/Master';
import { loadGuias } from '../../actions/guias';
import GuiasList from './List';
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

class Guias extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.loadItems();
  }

  loadItems = async () => {
    const { loadGuias: propLoadGuias } = this.props;
    await propLoadGuias();
    this.setState({ loading: false });
  }

  onHandleAddNew = () => {
    const { history } = this.props;
    history.push('/guias/cadastrar');
  }

  render() {
    const {
      classes, error, guias, title,
    } = this.props;

    const { loading } = this.state;

    return (
      <Master title={title}>
        {guias && (
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
              <GuiasList guias={guias} error={error} />
            ) : (
              <Loading />
            )}
          </Fragment>
        )}
      </Master>
    );
  }
}

Guias.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  guias: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  loadGuias: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  title: PropTypes.string,
};

Guias.defaultProps = {
  title: String(),
};

const mapStateToProps = state => ({
  guias: state.guiasReducer.guias,
  error: state.guiasReducer.fetchError,
});

export default connect(mapStateToProps, {
  loadGuias,
})(withStyles(styles)(Guias));
