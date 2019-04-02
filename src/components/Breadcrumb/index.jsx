import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Breadcrumbs } from '@material-ui/lab';
import { Home as HomeIcon } from '@material-ui/icons';
import {
  Chip,
  Avatar,
} from '@material-ui/core';

const styles = theme => ({
  chip: {
    backgroundColor: theme.palette.grey[100],
    height: 24,
    cursor: 'pointer',
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus, &.active': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
    },
  },
  activeChip: {
    backgroundColor: theme.palette.grey[300],
  },
  avatar: {
    background: 'none',
    marginRight: -theme.spacing.unit * 1.5,
  },
});

const Breadcrumb = (props) => {
  const { breadcrumb, classes } = props;

  return (
    <Breadcrumbs arial-label="Breadcrumb">
      {breadcrumb.map((item, index) => {
        const key = `item-${index}`;
        const avatar = index === 0 && (
          { avatar: <Avatar className={classes.avatar}><HomeIcon /></Avatar> }
        );

        return (
          <Chip
            key={key}
            to={item.url || 'cadastrar'}
            label={item.label}
            className={`${classes.chip} ${index === breadcrumb.length - 1 && classes.activeChip}`}
            component={RouterLink}
            {...avatar}
          />
        );
      })}
    </Breadcrumbs>
  );
};

Breadcrumb.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  breadcrumb: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(Breadcrumb);
