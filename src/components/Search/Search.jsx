import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { Input } from 'antd';

import './Search.css';

const Search = ({ setWord }) => {
  const debounced = debounce((event) => { setWord(event); }, 900);
  return (
    <div className="input">
      <Input
        placeholder="Type to search..."
        size="large"
        onChange={(event) => { debounced(event.target.value); }}
      />
    </div>
  );
};

Search.defaultProps = {
  setWord: () => {},
};

Search.propTypes = {
  setWord: PropTypes.func,
};

export default Search;