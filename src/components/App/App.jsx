/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-fragments */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable react/no-did-update-set-state */
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
    // page: 1,
  };

  componentDidMount() {
    this.searchGenres();
    this.setGuestId();
    const { word } = this.state;
    this.searchMovie(word);
    setToStorage('prevTab', 'Search');
    setToStorage('currentTab', 'Search');
  }

  componentDidUpdate() {
    const currentTab = getFromStorage('currentTab');
    const prevTab = getFromStorage('prevTab');
    if (currentTab === 'Rated' && prevTab === 'Search') {
      this.setState({ data: [] }); // !
      this.getRated();
      setToStorage('prevTab', 'Rated');
    }

    if (currentTab === 'Search' && prevTab === 'Rated') {
      this.setState({ data: [] }); // !
      this.searchMovie('return');
      setToStorage('prevTab', 'Search');
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
    if (activeTab === 'Search') {
      setToStorage('currentTab', 'Search');
    }else setToStorage('currentTab', 'Rated');
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
    this.movie.getRatedMovies(guestId)
      .then(result => {
      this.setState({
            data: result.results,
            totalPages: result.totalPages,
            loading: false,
            error: false,
          });
        });
  };

  searchMovie = (param = 'return', page = 1) => {
    const guestId = getFromStorage("guestId");
    this.movie.getMoviesList(param, page).then((movies) => {
      if (movies.results.length === 0) {
        throw new Error("По вашему запросу ничего не найдено!!!");
      };
      return movies;
    })
      .then(movies => {
        this.movie.getRatedMovies(guestId)
          .then(rated => {
            
            const dataMovies = movies.results.reduce((acc, elem) => {
              let movie = elem;
              rated.results.forEach((el)=>{
                if (el.id === movie.id){
                  movie = el;
                }
              });
              acc.push(movie);
              return acc;
            }, []);
            this.setState({
              data: dataMovies,
              loading: false,
              error: false,
              totalPages: movies.total_pages,
            });
          });
      })
      .catch (error=> this.onError(error.message));
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
    // this.setState({page});
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
