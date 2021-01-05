import React from 'react';
import PropTypes from 'prop-types';

import { Pagination } from 'antd';

import './Footer.css';

const Footer = ({setPage, totalPages}) => (
  <div className="footer">
    <Pagination
      // defaultCurrent={5}
      total={totalPages*10}
      onChange={setPage}
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