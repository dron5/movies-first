import React from "react";
import PropTypes from "prop-types";

import { format } from "date-fns";
import { Rate } from "antd";

import MovieService from "../../services/MovieService";
import { voteClassSetter } from "../../services/utils";
import Genres from "../Genres";

import "./Card.css";
import noposter from "./no-poster.jpg";

const movie = new MovieService();

const Card = ({
      title,
      overview,
      date,
      posterUrl,
      genre,
      id,
      guestId,
      vote,
      rating,
    }) => {

    const basePosterUrl = "http://image.tmdb.org/t/p/w185";
    const className = voteClassSetter(vote);
    // console.log(rating, title);
    const onRateMovie = async (num) => {
      await movie.rateMovie(num, id, guestId);
    };

    return (
      <div className="card">
        <div className="card__img">
          <img
            src={posterUrl ? `${basePosterUrl}${posterUrl}` : noposter}
            alt="poster"
          />
        </div>
        <div className="card__content">
          <div className="card__header">
            <div className="card__title">{title}</div>
            <div className={className}>{vote}</div>
          </div>
          <div>{date ? format(new Date(date), "PP") : "not release date"}</div>
          <Genres genre={genre} />
          <p>{overview}</p>
          <Rate
            allowHalf
            count={10}
            defaultValue={rating}
            onChange={onRateMovie}
            className="card__stars"
          />
        </div>
      </div>
    );
  };

Card.defaultProps = {
  genre: [0],
  id: 0,
  guestId: "",
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
};
export default Card;
