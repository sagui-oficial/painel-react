import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  IconButton,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@material-ui/core';

import { Delete as DeleteIcon } from '@material-ui/icons';
import Loading from '../Loading';

const styles = theme => ({
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
  boxList: {
    paddingLeft: theme.spacing.unit * 1.8,
    '& p': {
      margin: 0,
    },
  },
  avatar: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
});

class RefList extends Component {
  RefList = React.createRef()

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
      setBox,
      item,
      classes,
      error,
      children,
      avatar,
    } = this.props;

    const { loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <ListItem
        key={item.PublicID}
        className={classes.listItem}
        ref={(el) => { this.RefList = el; }}
        to={{
          pathname: `/${setBox.to}/${item.PublicID}`,
          state: { ...item },
        }}
        component={Link}
        button
      >
        {avatar && (
          <ListItemAvatar>
            <Avatar aria-label={setBox.title} className={classes.avatar}>
              {setBox.title.substring(0, 1).toUpperCase()}
            </Avatar>
          </ListItemAvatar>
        )}
        <div className={classes.boxList}>
          <p className={classes.smallItemText}>
            <strong>{`${setBox.label}: `}</strong>
            {setBox.pretitle}
          </p>
          <p>
            <strong>{setBox.title}</strong>
          </p>
          {children && (children)}
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

RefList.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
  setBox: PropTypes.instanceOf(Object).isRequired,
  onHandleDelete: PropTypes.func.isRequired,
  children: PropTypes.node,
  avatar: PropTypes.bool,
  error: PropTypes.string.isRequired,
};

RefList.defaultProps = {
  children: null,
  avatar: true,
};

export default withStyles(styles)(withRouter(RefList));
