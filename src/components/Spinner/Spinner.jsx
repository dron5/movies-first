import React from "react";

import { Spin } from "antd";

import "./Spinner.css";

const Spinner = () => (
  <div className="main">
    <div className="example">
      <Spin tip="Loading files..." size="large" />
    </div>
  </div>
);

export default Spinner;
