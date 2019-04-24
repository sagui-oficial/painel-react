import React from 'react';
import PropTypes from 'prop-types';
import Master from '../../components/Master';

const Lotes = ({ title }) => (
  <Master title={title}>
    <div>{title}</div>
  </Master>
);

Lotes.propTypes = {
  title: PropTypes.string,
};

Lotes.defaultProps = {
  title: String(),
};

export default Lotes;
