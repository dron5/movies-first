/* eslint-disable react/jsx-fragments */
/* eslint-disable import/no-useless-path-segments */
import React, {Fragment} from 'react';

import { Tabs } from 'antd';

import MovieService from '../../services/MovieService';

import Main from '../Main';
import Rated from '../Rated';

import "../../components/Main/Main.css";

const { TabPane } = Tabs;

const movie = new MovieService();

const getRated = (key) => {
  if (key === '2') {
    let id = sessionStorage.getItem('guestId');
    id = JSON.parse(id);
    movie
      .getRatedMovies(id)
      .then((body) => {
        console.log(body);
      });
  }
};

const App = () => (
  <div className="main">
    <Fragment>
      <Tabs
        defaultActiveKey="1"
        onChange={getRated}
        centered size="large">
          <TabPane tab="Search" key="1">
            <Main /> 
          </TabPane>
          <TabPane tab="Rated" key="2">
            <Rated />
          </TabPane>
      </Tabs> 
    </Fragment>
  </div>
);

export default App;
