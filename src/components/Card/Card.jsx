import React, {useEffect} from "react";
import PropTypes from "prop-types";

import { format } from "date-fns";
import { Rate } from "antd";

import MovieService from "../../services/MovieService";
import { voteClassSetter } from "../../services/utils";
import Genres from "../Genres";

import "./Card.css";
import noposter from "./no-poster.jpg";

const movieService = new MovieService();

const { rateMovie } = movieService;

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
  flag,
  changeStatus
}) => {

  useEffect(() => {
    if (flag === 'RATED') console.log("useEffect()");
  });

  const basePosterUrl = "http://image.tmdb.org/t/p/w185";

  const className = voteClassSetter(vote);

  const onRateMovie = (num) => {
    rateMovie(num, id, guestId);
    setTimeout(changeStatus, 500);
  };
  
  if (flag === 'RATED') console.log(flag, "rating", rating);
  return (
    <div className="card">
      <div className="img">
        <img
          src={posterUrl ? `${basePosterUrl}${posterUrl}` : noposter}
          alt="poster"
        />
      </div>
      <div className="content">
        <div className="card_header">
          <div className="title">{title}</div>
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
  changeStatus: ()=>{},
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
  flag: PropTypes.string.isRequired,
  changeStatus: PropTypes.func,
};

export default Card;
