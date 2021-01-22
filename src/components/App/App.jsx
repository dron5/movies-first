/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-fragments */
/* eslint-disable import/no-useless-path-segments */
import React, { Component, Fragment } from 'react';

import { Tabs } from 'antd';

import MovieService from '../../services/MovieService';
import { MovieServiceProvider } from '../MovieServiceContext';

import Main from '../Main';
import Rated from '../Rated';

import "../../components/Main/Main.css";

const { TabPane } = Tabs;

export default class App extends Component {
  
  movie = new MovieService();
  
  state = {
    data: [],
    totalPages: 0,
    guestId: '',
  }

  componentDidMount() {
		this.setGuestId();
	}
  
  setGuestId = () => {
		if (sessionStorage.getItem('guestId') === null) {
      this.movie
				.getSessionId()
        .then((body) => {
					this.setState(() => ({
						guestId: body.guest_session_id,
					}));
					sessionStorage.setItem('guestId',
						JSON.stringify(body.guest_session_id));
				});
		} else {
				const guestId = JSON.parse(sessionStorage.getItem('guestId'));
				this.setState(() => ({
					guestId,
			}));
		}
	}

	getRated = (key) => {
    if (key === 'Rated') {
      const guestId = JSON.parse(sessionStorage.getItem('guestId'));
      const moviesData = [];
      this.movie
        .getRatedMovies(guestId)
        .then((body) => {
					body.results.forEach((el) => {
            moviesData.push({
              id: el.id, title: el.title,
              img: el.poster_path, overview: el.overview,
              genre: el.genre_ids, date: el.release_date,
              vote: el.vote_average, rating: el.rating
            });
          });
          this.setState(() => ({
            data: moviesData,
            totalPages: body.total_pages,
          }));
        });
    }
  };

    render() {
      const { data, totalPages } = this.state;
      return (
        <div className="main">
          <Fragment>
            <MovieServiceProvider value={this.state.guestId}>
            <Tabs
              defaultActiveKey="1"
              onChange={this.getRated}
              centered 
              size="large">
                <TabPane tab="Search" key='Search'>
                  <Main /> 
                </TabPane>
                <TabPane tab="Rated" key='Rated'>
                  <Rated data={data} totalPages={totalPages} />
                </TabPane>
              </Tabs>
            </MovieServiceProvider>
          </Fragment>
        </div>  
      );
    };
};

										