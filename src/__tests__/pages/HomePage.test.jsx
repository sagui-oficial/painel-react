/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../pages/HomePage';

it('HomePage', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
