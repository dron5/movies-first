/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-fragments */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable */
import React, { Component } from "react";
import { Tabs } from "antd";
import MovieService from "../../services/MovieService";
import { MovieServiceProvider } from "../MovieServiceContext";
import { setToStorage, getFromStorage } from "../../services/utils";

import CardList from "../CardList";

import "./App.css";

const { TabPane } = Tabs;

export default class App extends Component {
  movie = new MovieService();

  state = {
    guestId: "",
    activeTab: "Search",
    data: [],
    loading: true,
    error: false,
    errMessage: "",
    totalPages: 0,
    word: "return",
    page: 1,
  };

  componentDidMount() {
    this.searchGenres();
    this.setGuestId();
    const { word } = this.state;
    this.searchMovie(word);
  }

  componentDidUpdate(prevProps, prevState) {
    const { word, page, activeTab } = this.state;
    if ((page !== prevState.page || word !== prevState.word) || (
      activeTab === 'Seacrch' && prevState.activeTab !== 'Search')) {
      this.searchMovie({word, page});
    }
    if (activeTab === 'Rated' && prevState.activeTab !== 'Rated') {
      this.getRated();
    }
  }

  setSessionStorage = (genreList) => {
    if ("genres" in sessionStorage) return;
    const genres = { 0: "No genre" };
    genreList.forEach((el) => {
      genres[el.id.toString()] = el.name;
    });
    setToStorage("genres", genres);
  };

  searchGenres = () => {
    this.movie.getGenres().then((body) => {
      this.setSessionStorage(body.genres);
    });
  };

  onChangeTab = (activeTab) => {
    this.setState({ activeTab });
  };

  setGuestId = () => {
    if (getFromStorage("guestId") === null) {
      this.movie.getSessionId().then((body) => {
        this.setState({
          guestId: body.guest_session_id,
        });
        setToStorage("guestId", body.guest_session_id);
      });
    } else {
      this.setState({
        guestId: getFromStorage("guestId"),
      });
    }
  };

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
        loading: false,
        error: false,
      });
    });
  };

  searchMovie = (param, page = 1) => {
    this.movie.getMoviesList(param, page).then((body) => {
      if (body.results.length === 0) {
        throw new Error("По вашему запросу ничего не найдено!!!");
      }
      this.setState({
        data: body.results,
        loading: false,
        error: false,
        totalPages: body.total_pages,
      });
    });
  };

  setWord = (name) => {
    const word = name.trim();
    if (!word) return;
    this.setState({
      word,
    });
    this.searchMovie(word);
  };

  setPage = (page) => {
    const { word } = this.state;
    this.searchMovie(word, page);
    this.setState({page});
  };

  onError = (message) => {
    this.setState({
      error: true,
      errMessage: message,
      loading: false,
      totalPages: 0,
    });
  };

  render() {
    const {
      guestId, errMessage, totalPages, error,
      loading, data, activeTab,
    } = this.state;
    return (
      <MovieServiceProvider value={guestId}>
        <div className="app">
          <Tabs
            defaultActiveKey="Search"
            centered
            onChange={this.onChangeTab}
            size="large"
          >
            <TabPane tab="Search" key="Search">
              <CardList
                guestId={guestId}
                errMessage={errMessage}
                totalPages={totalPages}
                loading={loading}
                setPage={this.setPage}
                setWord={this.setWord}
                data={data}
                activeTab={activeTab}
                error={error}
              />
            </TabPane>
            <TabPane tab="Rated" key="Rated">
              <CardList
                guestId={guestId}
                data={data}
                activeTab={activeTab}
                error={error}
              />
            </TabPane>
          </Tabs>
        </div>
      </MovieServiceProvider>
    );
  }
}
