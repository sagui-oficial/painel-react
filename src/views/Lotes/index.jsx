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
import { loadLotes } from '../../actions/lotes';
import LotesList from './List';
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

class Lotes extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.loadItems();
  }

  loadItems = async () => {
    const { loadLotes: propLoadLotes } = this.props;
    await propLoadLotes();
    this.setState({ loading: false });
  }

  onHandleAddNew = () => {
    const { history } = this.props;
    history.push('/lotes/cadastrar');
  }

  render() {
    const {
      classes, error, lotes, title,
    } = this.props;

    const { loading } = this.state;

    return (
      <Master title={title}>
        {lotes && (
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
              <LotesList lotes={lotes} error={error} />
            ) : (
              <Loading />
            )}
          </Fragment>
        )}
      </Master>
    );
  }
}

Lotes.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  lotes: PropTypes.instanceOf(Object),
  loadLotes: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  title: PropTypes.string,
};

Lotes.defaultProps = {
  title: String(),
  lotes: [],
};

const mapStateToProps = state => ({
  lotes: state.lotesReducer.lotes,
  error: state.lotesReducer.fetchError,
});

export default connect(mapStateToProps, {
  loadLotes,
})(withStyles(styles)(Lotes));
