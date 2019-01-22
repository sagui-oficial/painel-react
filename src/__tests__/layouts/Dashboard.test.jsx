/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import DashboardLayout from '../../layouts/Dashboard.layout';

const hist = createBrowserHistory();

it('Renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router history={hist}>
      <DashboardLayout />
    </Router>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
