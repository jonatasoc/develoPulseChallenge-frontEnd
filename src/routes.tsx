import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Success from './pages/Success';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/success" component={Success} />
    </Switch>
  );
}

export default Routes;
