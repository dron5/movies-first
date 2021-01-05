/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

// import { Button } from 'antd';

import './Genres.css';

const Genres = ({ genre }) => {
  const genres = {
    '0': 'No genres',
    '16': 'Animation',
    '35': 'Comedy',
    '27': 'Horror',
    '18': 'Drama',
    '28': 'Action',
    '14': 'Fantasy',
    '12': 'Adventure'
  };
  const part = genre.map((el,i) =>
    <button key={i} type="button" className="genres">{genres[el]}</button>);
  return (
    <div className="genre">{part}</div>
  );
};

Genres.defaultProps = {
  genre: [10770],
};

Genres.propTypes = {
  genre: PropTypes.arrayOf(PropTypes.number),
};

export default Genres;