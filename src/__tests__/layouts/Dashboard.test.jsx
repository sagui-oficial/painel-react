/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from '../../reducers';
import DashboardLayout from '../../layouts/Dashboard';

const hist = createBrowserHistory();

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hist}>
        <DashboardLayout />
      </Router>
    </Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
