/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from "react";
import { Tabs } from "antd";
import MovieService from "../../services/MovieService";
import { MovieServiceProvider } from "../MovieServiceContext";
import {
  setToStorage, getFromStorage, setGuestId, searchMovie, setSessionStorage,
  onChangeTab, setWord, setPage, onError, searchGenres, getRated
} from "../../services/utils";

import CardList from "../CardList";

import "./App.css";

const { TabPane } = Tabs;

export default class App extends Component {
  movie = new MovieService();

  constructor(props) {
    super(props);
    this.onChangeTab = onChangeTab.bind(this);
    this.setWord = setWord.bind(this);
    this.setPage = setPage.bind(this);
    this.setGuestId = setGuestId.bind(this);
    this.onError = onError.bind(this);
    this.searchGenres = searchGenres.bind(this);
    this.searchMovie = searchMovie.bind(this);
    this.getRated = getRated.bind(this);
    this.setSessionStorage = setSessionStorage.bind(this);
  }

  state = {
    guestId: "",
    activeTab: "Search",
    data: [],
    loading: true,
    error: false,
    errMessage: "",
    totalPages: 0,
    word: "return",
  };

  componentDidMount() {
    this.setGuestId();
    this.searchGenres();
    const { word } = this.state;
    this.searchMovie(word);
    setToStorage('prevTab', 'Search');
    setToStorage('currentTab', 'Search');
  }

  componentDidUpdate() {
    const currentTab = getFromStorage('currentTab');
    const prevTab = getFromStorage('prevTab');
    if (currentTab === 'Rated' && prevTab === 'Search') {
      this.setState({ data: [], loading: true }); // !
      this.getRated();
      setToStorage('prevTab', 'Rated');
    }

    if (currentTab === 'Search' && prevTab === 'Rated') {
      this.setState({ data: [], loading: true }); // !
      this.searchMovie();
      setToStorage('prevTab', 'Search');
    }
  }

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
                loading={loading}
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
