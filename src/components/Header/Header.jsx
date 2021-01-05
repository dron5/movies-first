import React from 'react';
import PropTypes from 'prop-types';

import Search from '../Search';

import './Header.css';

const Header = ({setWord}) => (
    <div className="header">
    <Search setWord={setWord}/>
    </div>
);

Header.defaultProps = {
  setWord: () => {},
};

Header.propTypes = {
  setWord: PropTypes.func,
};

export default Header;