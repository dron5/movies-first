/* eslint-disable react/jsx-fragments */
/* eslint-disable import/no-useless-path-segments */
import React, { Component,Fragment } from 'react';

import { Tabs } from 'antd';

import MovieService from '../../services/MovieService';

import Main from '../Main';
import Rated from '../Rated';

import "../../components/Main/Main.css";

const { TabPane } = Tabs;

export default class App extends Component {
  
  movie = new MovieService();
  
  state = {
    data: [],
    // totalPages: 0,
  }

  getRated = (key) => {
    if (key === '2') {
      let guestId = sessionStorage.getItem('guestId');
      guestId = JSON.parse(guestId);
      const moviesData = [];
      this.movie
        .getRatedMovies(guestId)
        .then((body) => {
          body.results.forEach((el) => {
            moviesData.push({
              id: el.id, title: el.title,
              img: el.poster_path, overview: el.overview,
              genre: el.genre_ids, date: el.release_date,
              vote: el.vote_average
            });
          });
          this.setState(() => ({
            data: moviesData
          }));
        });
    }
  };

  
    render() {
      const { data } = this.state;
      return (
        <div className="main">
          <Fragment>
            <Tabs
              defaultActiveKey="1"
              onChange={this.getRated}
              centered size="large">
                <TabPane tab="Search" key="1">
                  <Main /> 
                </TabPane>
                <TabPane tab="Rated" key="2">
                <Rated data={data}/>
                </TabPane>
            </Tabs> 
          </Fragment>
        </div>
      );
    };
};

