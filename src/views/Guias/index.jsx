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
import { loadGuias } from '../../actions/guias';
import GuiasList from './List';

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
  componentDidMount() {
    const { loadGuias: propLoadGuias } = this.props;
    propLoadGuias();
  }

  onHandleAddNew = () => {
    const { history } = this.props;
    history.push('/guias/cadastrar');
  }

  render() {
    const {
      classes, guiasError, guias, title,
    } = this.props;

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
                disabled={!!guiasError}
                onClick={this.onHandleAddNew}
              >
                +Novo
              </Button>
            </Grid>
            <Divider className={classes.divider} />
            <GuiasList guias={guias} error={guiasError} />
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
  guiasError: PropTypes.string.isRequired,
  title: PropTypes.string,
};

Guias.defaultProps = {
  title: String(),
};

const mapStateToProps = state => ({
  guias: state.guiasReducer.guias,
  guiasError: state.guiasReducer.fetchError,
});

export default connect(mapStateToProps, {
  loadGuias,
})(withStyles(styles)(Guias));
