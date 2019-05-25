import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { List, ListItem } from '@material-ui/core';
import RefList from './RefList';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  listItem: {
    marginBottom: '15px',
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingRight: '50px',
    alignItems: 'start',
    borderRadius: '6px',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
  },
});

const ListBox = (props) => {
  const {
    classes, listItemsObject, ...rest
  } = props;

  return (
    <List dense className={classes.root}>
      {
        listItemsObject.length ? (
          listItemsObject.map(item => (
            <RefList
              key={item.PublicID}
              item={item}
              {...rest}
            />
          ))
        ) : (
          <ListItem className={classes.listItem}>Nenhum item encontrado.</ListItem>
        )
      }
    </List>
  );
};

ListBox.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  listItemsObject: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(styles)(ListBox);
