/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";

import MovieService from "../../services/MovieService";
import { getFromStorage } from "../../services/utils";
import Footer from "../Footer";
import Card from "../Card";

export default class Rated extends Component {
  movie = new MovieService();

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      totalPages: null,
    };
  }

  componentDidMount() {
    this.getRated();
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeTab } = this.props;
    // console.log(activeTab === "Rated" && prevProps.activeTab === "Rated");
    if (activeTab === "Rated" && prevProps.activeTab !== "Rated")
      this.getRated();
  }
  // componentDidUpdate(prevProps) {
  //   const { status } = this.state;
  //   if (status !== prevProps.status) this.getRated();
  // }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //     if (prevState.status !== nextProps.status) {
  //       return {
  //         status: nextProps.status,
  //       };
  //     }
  //     return null;
  //   }

  getRated = () => {
    const guestId = getFromStorage("guestId");
    const moviesData = [];
    this.movie.getRatedMovies(guestId).then((body) => {
      body.results.forEach((el) => {
        moviesData.push({
          id: el.id,
          title: el.title,
          img: el.poster_path,
          overview: el.overview,
          genre: el.genre_ids,
          date: el.release_date,
          vote: el.vote_average,
          rating: el.rating,
        });
      });
      this.setState({
        data: moviesData,
        totalPages: body.total_pages,
      });
    });
  };

  render() {
    const { data, totalPages } = this.state;
    const { guestId } = this.props;
    const elements = data.map((item) => {
      const { id, title, overview, date, img, genre, vote, rating } = item;
      return (
        <Card
          key={id}
          id={id}
          vote={vote}
          rating={rating}
          title={title}
          genre={genre}
          overview={overview}
          guestId={guestId}
          date={date === undefined ? "" : date}
          posterUrl={img || ""}
          flag="RATED"
        />
      );
    });
    return (
      <div className="main">
        {elements}
        {totalPages > 2 && (
          <Footer totalPages={totalPages} showSizeChanger={false} />
        )}
      </div>
    );
  }
}

Rated.propTypes = {
  guestId: PropTypes.string.isRequired,
};
