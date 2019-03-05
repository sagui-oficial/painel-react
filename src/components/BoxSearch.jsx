import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { searchChange } from '../actions/search';

const styles = (/* theme */) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    // [theme.breakpoints.down('xs')]: {
    // width: '100%',
    // backgroundColor: theme.palette.secondary.main,
    // },
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

const BoxSearch = (props) => {
  const {
    value, classes, searchChange: propSearchChange, placeholder,
  } = props;
  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase
        className={classes.input}
        type="search"
        value={value}
        onChange={propSearchChange}
        placeholder={placeholder}
      />
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

BoxSearch.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  searchChange: PropTypes.func.isRequired,
};

BoxSearch.defaultProps = {
  placeholder: 'buscar...',
};

const mapStateToProps = state => ({ value: state.searchReducer.value });

export default connect(mapStateToProps, {
  searchChange,
})(withStyles(styles)(BoxSearch));
