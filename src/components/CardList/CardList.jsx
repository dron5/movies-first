/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";

// import MovieService from "../../services/MovieService";
import { MovieServiceConsumer } from "../MovieServiceContext";
// import { getFromStorage } from "../../services/utils";

import AlertMessage from "../AlertMessage";
import Card from "../Card";
import Spinner from "../Spinner";
import Header from "../Header";
import Footer from "../Footer";

import "./CardList.css";

export default class CardList extends Component {
  // movie = new MovieService();

  // state = {
  //   data: [],
  //   loading: true,
  //   error: false,
  //   errMessage: "",
  //   totalPages: 0,
  //   word: "return",
  //   page: 1,
  // };

  // componentDidMount() {
  //   // debugger;
  //   const { activeTab } = this.props;
  //   if (activeTab === "Search"){
  //     const { word, data } = this.state;
  //     this.searchMovie(word);
  //     console.log('in-Mount-Search', data);
  //   }
  //   if (activeTab === "Rated") {
  //     this.getRated();
  //     const { data } = this.state;
  //     console.log('in-Mount-Rated',data);
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // debugger;
  //   const { activeTab } = this.props;
  //   console.log('prevProps :', activeTab, 'this.props :', this.props.activeTab);
  //   if (activeTab === "Search" && prevProps.activeTab === "Search"){
  //     const { word, page, data } = this.state;
  //     if (word !== prevState.word || page !== prevState.page) {
  //       this.searchMovie(word, page);
  //       console.log(activeTab,'---in-DidUpdate',data);
  //     }
  //   }
  //   // // console.log(activeTab === "Rated" && prevProps.activeTab === "Rated");
    // if (activeTab === "Rated" && prevProps.activeTab !== "Rated") {
  //     this.getRated();
  //     const { data } = prevState;
  //     console.log(activeTab,'---in-DidUpdate',data);
  //   }
  // }

  // setWord = (name) => {
  //   const word = name.trim();
  //   if (!word) return;
  //   this.setState({
  //     word,
  //   });
  //   this.searchMovie(word);
  // };

  // setPage = (page) => {
  //   const { word } = this.state;
  //   this.searchMovie(word, page);
  //   this.setState({page});
  // };

  // onError = (message) => {
  //   this.setState({
  //     error: true,
  //     errMessage: message,
  //     loading: false,
  //     totalPages: 0,
  //   });
  // };

  // getRated = () => {
  //   const guestId = getFromStorage("guestId");
  //   const moviesData = [];
  //   this.movie.getRatedMovies(guestId).then((body) => {
  //     body.results.forEach((el) => {
  //       moviesData.push({
  //         id: el.id,
  //         title: el.title,
  //         img: el.poster_path,
  //         overview: el.overview,
  //         genre: el.genre_ids,
  //         date: el.release_date,
  //         vote: el.vote_average,
  //         rating: el.rating,
  //       });
  //     });
  //     this.setState({
  //       data: moviesData,
  //       totalPages: body.total_pages,
  //       loading: false,
  //       error: false,
  //     });
  //   });
  // };

  // searchMovie = (param, page = 1) => {
  //   this.movie.getMoviesList(param, page).then((body) => {
  //     if (body.results.length === 0) {
  //       throw new Error("По вашему запросу ничего не найдено!!!");
  //     }
  //     this.setState({
  //       data: body.results,
  //       loading: false,
  //       error: false,
  //       totalPages: body.total_pages,
  //     });
  //   });
  // };

  render() {
    // const { data, loading, error, totalPages, errMessage } = this.state;
    // const { activeTab } = this.props;
    const { data, loading, errMessage, activeTab,
      totalPages, setPage, setWord, error } = this.props;
    // console.log('in Render this.props--', activeTab, ', data --', data);
    const elements = data.map((item) => {
      const { id, title, overview, date, img, genre, vote, rating } = item;
      let posterUrl = "";
      if (img) posterUrl = img;
      return (
        <MovieServiceConsumer key={id}>
          {(guestId) => (
            <Card
              id={id}
              vote={vote}
              rating={rating}
              guestId={guestId}
              title={title}
              genre={genre}
              overview={overview}
              date={date === undefined ? "" : date}
              posterUrl={posterUrl}
              activeTab={activeTab}
            />
          )}
        </MovieServiceConsumer>
      );
    });

    return (
      <div className="card-list">
        {activeTab === "Search" && <Header setWord={setWord} />}
        {loading && <Spinner />}
        {error && <AlertMessage message={errMessage} />}
        {!(loading || error) && elements}
        {totalPages > 2 && (
          <Footer setPage={setPage} totalPages={totalPages} />
        )}
      </div>
    );
  }
}

CardList.defaultProps = {
  totalPages: 0,
  loading: false,
  data: [],
  setPage: () => {},
  setWord: () => { },
  errMessage: '',
};

CardList.propTypes = {
  activeTab: PropTypes.string.isRequired,
  errMessage: PropTypes.string,
  totalPages: PropTypes.number,
  loading: PropTypes.bool,
  setPage: PropTypes.func,
  setWord: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.bool.isRequired,
  activeTab: PropTypes.string.isRequired,
};
