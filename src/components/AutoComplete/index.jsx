import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export function Control(props) {
  const {
    innerRef, children, innerProps, selectProps,
  } = props;

  return (
    <TextField
      fullWidth
      label={selectProps.label}
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputComponent,
        inputProps: {
          style: { display: 'flex', padding: '9px 14px' },
          inputRef: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...selectProps.textFieldProps}
    />
  );
}

Control.propTypes = {
  isSelected: PropTypes.bool,
  innerRef: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  innerProps: PropTypes.instanceOf(Object).isRequired,
  selectProps: PropTypes.instanceOf(Object).isRequired,
};

Control.defaultProps = {
  isSelected: false,
};

export function Option(props) {
  const {
    isSelected, innerProps, children,
  } = props;
  return (
    <MenuItem
      selected={isSelected}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
}

Option.propTypes = {
  isSelected: PropTypes.bool,
  innerProps: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.string.isRequired,
};

Option.defaultProps = {
  isSelected: false,
};
