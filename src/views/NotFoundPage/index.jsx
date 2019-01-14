import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  pageNotFound: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  btnVoltar: {
    marginTop: '20px',
  },
};

const NotFoundPage = (props) => {
  const { classes } = props;

  return (
    <div className={classes.pageNotFound}>
      <Typography variant="h1" color="inherit">
        404
      </Typography>
      <Typography variant="title" color="inherit">
        Página não encontrada.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        to="/dashboard"
        component={Link}
        className={classes.btnVoltar}
      >
        Voltar
      </Button>
    </div>
  );
};

NotFoundPage.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(NotFoundPage);
