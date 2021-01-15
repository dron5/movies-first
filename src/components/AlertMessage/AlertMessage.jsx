import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from 'antd';

import './AlertMessage.css';

const AlertMessage = ({message}) => (
    <Alert
      description={message==='Failed to fetch' ? 'No internet connection' : message}
      type="error"
    />
  );

export default AlertMessage;

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
};