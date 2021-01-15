import React from 'react';
import PropTypes from 'prop-types';

import { Alert } from 'antd';

import './AlertMessage.css';

const AlertMessage = ({message}) => (
    <Alert
      // message="Error"
      // description="Sorry, but nothig finded on your search."
      description={message}
      type="error"
      // showIcon
    />
  );

export default AlertMessage;

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
};