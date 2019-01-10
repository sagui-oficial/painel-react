import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Login from '../Login';
import NotFoundPage from '../NotFoundPage';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
