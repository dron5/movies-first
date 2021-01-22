import React from 'react';
import PropTypes from 'prop-types';

import { Pagination } from 'antd';

import './Footer.css';

const Footer = ({setPage, totalPages}) => (
  <div className="footer">
    <Pagination
      total={totalPages*10}
      onChange={setPage}
      showSizeChanger={false}
    />
  </div>
);

Footer.defaultProps = {
  setPage: () => { },
};

Footer.propTypes = {
  setPage: PropTypes.func,
  totalPages: PropTypes.number.isRequired,
};


export default Footer;