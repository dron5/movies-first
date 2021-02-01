/* eslint-disable react/no-array-index-key */
import React from "react";
import PropTypes from "prop-types";

import "./Genres.css";

const Genres = ({ genre }) => {
  let genres = sessionStorage.getItem("genres");
  genres = JSON.parse(genres);
  const part = genre.map((el, i) => (
    <button key={i} type="button" className="genres">
      {genres[el]}
    </button>
  ));
  return <div className="genre">{part}</div>;
};

Genres.defaultProps = {
  genre: [0],
};

Genres.propTypes = {
  genre: PropTypes.arrayOf(PropTypes.number),
};

export default Genres;
