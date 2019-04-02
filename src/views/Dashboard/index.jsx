import React from 'react';
import PropTypes from 'prop-types';
import Master from '../../components/Master';

const Dashboard = ({ title }) => (
  <Master title={title}>
    <div>{title}</div>
  </Master>
);

Dashboard.propTypes = {
  title: PropTypes.string,
};

Dashboard.defaultProps = {
  title: String(),
};

export default Dashboard;
