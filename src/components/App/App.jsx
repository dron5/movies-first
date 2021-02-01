/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-fragments */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from "react";

import { Tabs } from "antd";

import { MovieServiceProvider } from "../MovieServiceContext";
import { setToStorage, getFromStorage } from "../../services/utils";

import Main from "../Main";
import Rated from "../Rated";

import "../../components/Main/Main.css";

const { TabPane } = Tabs;

export default class App extends Component {
  
  state = {
    guestId: "",
  };

  componentDidMount() {
    this.setGuestId();
  }

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
    const { guestId } = this.state;
    return (
      <div className="main">
        <Fragment>
          <MovieServiceProvider value={guestId}>
            <Tabs
              defaultActiveKey="Search"
              centered
              size="large"
            >
              <TabPane tab="Search" key="Search">
                <Main />
              </TabPane>
              <TabPane tab="Rated" key="Rated">
                <Rated guestId={guestId} />
              </TabPane>
            </Tabs>
          </MovieServiceProvider>
        </Fragment>
      </div>
    );
  }
}
