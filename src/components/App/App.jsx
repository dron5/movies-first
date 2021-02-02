/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-fragments */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from "react";

import { Tabs } from "antd";
import MovieService from "../../services/MovieService";
import { MovieServiceProvider } from "../MovieServiceContext";
import { setToStorage, getFromStorage } from "../../services/utils";

import Main from "../Main";
import Rated from "../Rated";

import "../../components/Main/Main.css";

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
      <div className="main">
        <Fragment>
          <MovieServiceProvider value={guestId}>
            <Tabs
              defaultActiveKey="Search"
              centered
              onChange={this.onChangeTab}
              size="large"
            >
              <TabPane tab="Search" key="Search">
                <Main activeTab={activeTab} />
              </TabPane>
              <TabPane tab="Rated" key="Rated">
                <Rated guestId={guestId} activeTab={activeTab} />
              </TabPane>
            </Tabs>
          </MovieServiceProvider>
        </Fragment>
      </div>
    );
  }
}
