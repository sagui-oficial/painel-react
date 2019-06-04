/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from '../../reducers';
import MainRouters from '../../routes';

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MainRouters />
    </Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
