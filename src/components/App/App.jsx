/* eslint-disable react/jsx-fragments */
import React, {Fragment} from 'react';

import { Tabs } from 'antd';

import Main from '../Main';

import './App.css';

const { TabPane } = Tabs;

const Rate = () => (
  <div className="main">
    Rated content
  </div>
);

const App = () => (
  <div className="main">
    <Fragment>
      <Tabs defaultActiveKey="1" onChange={(key)=>console.log(key)} centered size="large">
        <TabPane tab="Search" key="1">
          <Main /> 
        </TabPane>
        <TabPane tab="Rated" key="2">
          <Rate />
        </TabPane>
      </Tabs> 
    </Fragment>
  </div>
);

export default App;
