/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";

import { format } from "date-fns";
import { Rate } from "antd";

import MovieService from "../../services/MovieService";
import { voteClassSetter } from "../../services/utils";
import Genres from "../Genres";

import "./Card.css";
import noposter from "./no-poster.jpg";

export default class Card extends Component {
  movieService = new MovieService();

  constructor(props) {
    super(props);
    const { rating } = this.props;
    this.state = {
      ratio: rating,
    };
  }

  // componentDidMount() {
  //   const { flag } = this.props;
  //   if (flag === "RATED"){
  //   console.log("In Card componentDidMount");
  //   }
  // }

  // componentDidUpdate() {
  //   const { rating, title, flag } = this.props;
  //   const { ratio } = this.state;
  //   if (flag === "RATED"){
  //   console.log("In Card componentDidUpdate", rating, title, ratio);
  //   }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.ratio !== nextProps.rating) {
      return {
        ratio: nextProps.rating,
      };
    }
    return null;
  }

  render() {
    const {
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
    } = this.props;

    const basePosterUrl = "http://image.tmdb.org/t/p/w185";
    const className = voteClassSetter(vote);
    const onRateMovie = async (num) => {
      await this.movieService.rateMovie(num, id, guestId);
    };
    // const { ratio } = this.state;
    // if (flag === "RATED") console.log(ratio);
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
  }
}

Card.defaultProps = {
  genre: [0],
  id: 0,
  guestId: "",
  rating: 0,
  flag: '',
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
  flag: PropTypes.string,
};
