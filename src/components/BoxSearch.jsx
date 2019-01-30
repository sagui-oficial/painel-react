import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { searchChange } from '../actions/search';

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 3,
    width: '100%',
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
  const { value, classes, searchChange: propSearchChange } = props;
  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase
        className={classes.input}
        type="search"
        value={value}
        onChange={propSearchChange}
        placeholder="Buscar guia: nome do paciente ou número da guia..."
      />
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

BoxSearch.propTypes = {
  value: PropTypes.string.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  searchChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ value: state.searchReducer.value });

export default connect(mapStateToProps, {
  searchChange,
})(withStyles(styles)(BoxSearch));
