import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  IconButton,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@material-ui/core';

import {
  Delete as DeleteIcon,
} from '@material-ui/icons';

import Loading from '../../../components/Loading';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  topBottomSpace: {
    marginTop: '5px',
    marginBottom: '15px',
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
  iconDelete: {
    top: '7px',
    right: '7px',
    transform: 'none',
  },
  smallItemText: {
    fontSize: '14px',
    color: '#616161',
    paddingBottom: '7px',
  },
  selectBox: {
    fontSize: '14px',
    '& [role="button"]': {
      paddingLeft: 0,
      background: 'none',
    },
    '&:hover:before, &:focus:before': {
      border: '0 !important',
    },
    '&:before, &:after': {
      border: 0,
    },
  },
  boxList: {
    paddingLeft: theme.spacing.unit * 1.8,
    '& p': {
      margin: 0,
    },
  },
});

class ListBox extends Component {
  ListBox = React.createRef()

  state = {
    loading: false,
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (prevProps.error !== error) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loading: false });
    }
  }

  onHandleDelete = (item) => {
    this.setState({ loading: true });
    const { onHandleDelete } = this.props;
    onHandleDelete(item);
  }

  render() {
    const {
      item, classes, error,
    } = this.props;
    const { loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <ListItem
        className={classes.listItem}
        ref={(el) => { this.ListBox = el; }}
        to={{
          pathname: `/planos/${item.PublicID}`,
          state: { ...item },
        }}
        component={Link}
        button
      >
        <ListItemAvatar>
          <Avatar aria-label={item.NomeFantasia} className={classes.avatar}>
            {item.NomeFantasia.substring(0, 1).toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <div className={classes.boxList}>
          <p className={classes.smallItemText}>
            <strong>CNPJ:</strong>
            {' '}
            {item.CNPJ}
          </p>
          <p>
            <strong>{item.NomeFantasia}</strong>
          </p>
        </div>
        <ListItemSecondaryAction className={classes.iconDelete}>
          <IconButton
            disabled={!!error}
            onClick={() => this.onHandleDelete(item)}
            aria-label="Deletar"
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

ListBox.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
  onHandleDelete: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default withStyles(styles)(ListBox);
