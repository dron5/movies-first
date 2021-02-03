import React from "react";

import { Spin } from "antd";

import "./Spinner.css";

const Spinner = () => (
  <div className="center">
    <div className="example">
      <Spin tip="Loading files..." size="large" />
    </div>
  </div>
);

export default Spinner;
