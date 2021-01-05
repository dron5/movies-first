import React from 'react';

import { Alert } from 'antd';



const AlertMessage = () => (
    <Alert
      message="Error"
      description="Sorry, but nothig finded on your search."
      type="error"
      showIcon
    />
  );

export default AlertMessage;