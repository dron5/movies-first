/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";
import { getFromStorage } from "../../services/utils";

import "./Genres.css";

const Genres = ({ genre }) => {
  const genres = getFromStorage('genres');
  const part = genre.map((el, i) => (
    <button key={i} type="button" className="card__genres">
      {genres[el]}
    </button>
  ));
  return <div className="card__genre">{part}</div>;
};

Genres.defaultProps = {
  genre: [0],
};

Genres.propTypes = {
  genre: PropTypes.arrayOf(PropTypes.number),
};

export default Genres;
