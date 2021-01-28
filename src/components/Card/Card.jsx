import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { format } from 'date-fns';
import { Rate } from 'antd';

import MovieService from '../../services/MovieService';
import { voteClassSetter } from '../../services/utils';
import Genres from '../Genres';

import './Card.css';
import noposter from'./no-poster.jpg';

const movieService = new MovieService();

const { rateMovie } = movieService;

const Card = ({ title, overview, date, posterUrl, genre,
  id, guestId, vote, flag, rating }) => {

  const [ ratio, setRatio ] = useState(rating);

  const basePosterUrl = 'http://image.tmdb.org/t/p/w185';

  if (!guestId) {
    console.log('in Card Rated title : --', title, 'rating :', ratio);
  }
  useEffect(() => setRatio(rating), [rating]);
  const className = voteClassSetter(vote);

  let releaseDate = 'not release date';
  if (date) {
    releaseDate = format(new Date(date), 'PP');
  }
  const count = ratio;
  const toRateMovie = (num) => rateMovie(num, id, guestId);
  return (
    <div className="card">
      <div className="img">
        <img src={ posterUrl? `${basePosterUrl}${posterUrl}`: noposter}
          alt="poster"
        />
      </div>
      <div className="content">
        <div className="card_header">
          <div className="title">{title}</div>
          <div className={className}>{vote}</div>
        </div>
        <div>{releaseDate}</div>
        <Genres genre={genre} />
        <p>{overview}</p>
        <Rate
          allowHalf
          count={10}
          defaultValue={flag ? count : 0}
          onChange={guestId && toRateMovie}
        />
      </div>
    </div>

  );
};

Card.defaultProps = {
  genre: [0],
  id: 0,
  guestId: '',
  flag: 0,
  rating: 0,
};

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  genre: PropTypes.arrayOf(PropTypes.number),
  guestId: PropTypes.string,
  vote: PropTypes.number.isRequired,
  rating: PropTypes.number,
  flag: PropTypes.number,
};

export default Card;
