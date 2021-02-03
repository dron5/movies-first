/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-fragments */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import { Tabs } from "antd";
import MovieService from "../../services/movieService";
import { MovieServiceProvider } from "../MovieServiceContext";
import { setToStorage, getFromStorage } from "../../services/utils";

import SearchTab from "../SearchTab";
import RatedTab from "../RatedTab";

import "./App.css";

const { TabPane } = Tabs;

export default class App extends Component {
  movie = new MovieService();

  state = {
    guestId: "",
    activeTab: "Search",
  };

  componentDidMount() {
    this.setGuestId();
  }

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

  render() {
    const { guestId, activeTab } = this.state;
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
              <SearchTab guestId={guestId} activeTab={activeTab} />
            </TabPane>
            <TabPane tab="Rated" key="Rated">
              <RatedTab guestId={guestId} activeTab={activeTab} />
            </TabPane>
          </Tabs>
        </div>
      </MovieServiceProvider>
    );
  }
}
