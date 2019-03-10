import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { searchChange } from '../../actions/search';

const styles = () => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
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
  const {
    inputValue, classes, searchChange: propSearchChange, placeholder,
  } = props;
  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase
        className={classes.input}
        type="search"
        value={inputValue}
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
  inputValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  searchChange: PropTypes.func.isRequired,
};

BoxSearch.defaultProps = {
  placeholder: 'buscar...',
};

const mapStateToProps = state => ({ inputValue: state.searchReducer.inputValue });

export default connect(mapStateToProps, {
  searchChange,
})(withStyles(styles)(BoxSearch));
