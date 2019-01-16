/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './assets/styles/default.sass';
import * as serviceWorker from './serviceWorker';
import DashboardLayout from './layouts/Dashboard.layout';

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <DashboardLayout />
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
