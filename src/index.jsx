/* global document window */
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

/* LOG REDUX STORE ON CONSOLE */
import logger from 'redux-logger';

import reducers from './reducers';
import { env } from './config/variables';
import firebaseConfig from './config/firebase';
import DashboardLayout from './layouts/Dashboard';

import './assets/styles/default.sass';
import * as serviceWorker from './serviceWorker';

let store;
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

if (env.REACT_APP_ENV !== 'production') {
  store = createStore(reducers,
    composeEnhancers(
      applyMiddleware(logger, thunk.withExtraArgument({ getFirebase, getFirestore })),
      reactReduxFirebase(firebaseConfig, { userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true }),
      reduxFirestore(firebaseConfig),
    ));
} else {
  store = createStore(reducers,
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
      reactReduxFirebase(firebaseConfig, { userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true }),
      reduxFirestore(firebaseConfig),
    ));
}

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <DashboardLayout />
    </Provider>,
    document.getElementById('root'),
  );
});

serviceWorker.register();
