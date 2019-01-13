/* global document */
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import './assets/styles/default.sass';
import * as serviceWorker from './serviceWorker';

// Core components
import NavBar from './components/NavBar';

// Views/Pages
import HomePage from './views/HomePage';
import Dashboard from './views/Dashboard';
import NotFoundPage from './views/NotFoundPage';

const hist = createBrowserHistory();

ReactDOM.render(
  <Fragment>
    <NavBar />
    <Router history={hist}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  </Fragment>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
