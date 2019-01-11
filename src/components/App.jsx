import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import NotFoundPage from '../pages/NotFoundPage';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={Login} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
