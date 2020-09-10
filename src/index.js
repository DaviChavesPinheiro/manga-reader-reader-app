import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from './App'
import './index.css';
import 'antd/dist/antd.css';
import 'font-awesome/css/font-awesome.min.css'

import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
