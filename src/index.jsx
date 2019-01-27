/* global document window */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

/* LOG REDUX STORE ON CONSOLE */
// import logger from 'redux-logger';

import reducers from './reducers';
import './assets/styles/default.sass';
import * as serviceWorker from './serviceWorker';
import DashboardLayout from './layouts/Dashboard.layout';

const hist = createBrowserHistory();

/**
 * Chrome Extension Redux Store
 * @param __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
 */
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <DashboardLayout />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

/**
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: http://bit.ly/CRA-PWA
 */
serviceWorker.register();
