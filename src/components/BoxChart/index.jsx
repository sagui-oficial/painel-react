import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid } from '@material-ui/core';

const styles = () => ({
  growBox: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 14,
    fontWeight: 300,
    textTransform: 'uppercase',
  },
  boxes: {
    width: '100%',
    minHeight: 100,
    color: '#fff',
    padding: 30,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    '& p': {
      margin: 0,
    },
  },
  boxRight: {
    paddingLeft: 20,
  },
});

const BoxChart = ({
  classes,
  children,
  bgColor,
  title,
  data,
  icon: Icon,
}) => (
  <Grid item className={classes.growBox}>
    <div
      className={classes.boxes}
      style={{ backgroundColor: bgColor }}
    >
      {Icon && (
        <div><Icon fontSize="large" /></div>
      )}
      <div className={classes.boxRight}>
        {title && <p className={classes.heading}>{title}</p>}
        {data && <p><strong>{data}</strong></p>}
        {children && children}
      </div>
    </div>
  </Grid>
);

BoxChart.propTypes = {
  classes: PropTypes.instanceOf(Object),
  children: PropTypes.node,
  bgColor: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.string,
  icon: PropTypes.func,
};

BoxChart.defaultProps = {
  classes: {},
  children: null,
  bgColor: '#701fd4',
  title: 'Título',
  data: null,
  icon: null,
};

export default withStyles(styles)(BoxChart);
