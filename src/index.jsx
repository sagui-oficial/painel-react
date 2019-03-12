/* global document window */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

/* LOG REDUX STORE ON CONSOLE */
import logger from 'redux-logger';

import reducers from './reducers';
import './assets/styles/default.sass';
import * as serviceWorker from './serviceWorker';
import DashboardLayout from './layouts/Dashboard';

const hist = createBrowserHistory();

let store;
if (process.env.REACT_APP_STAGE === 'development') {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(reducers, composeEnhancers(applyMiddleware(thunk, logger)));
  /* eslint-enable */
} else {
  store = createStore(reducers, applyMiddleware(thunk));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <DashboardLayout />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register();
