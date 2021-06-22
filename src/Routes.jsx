import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import AuthorList from './views/AuthorList';
import AuthorDetail from './views/AuthorDetail';
import NotFound from './views/NotFound';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/authors" component={AuthorList} />
        <Route exact path="/authors/:id" component={AuthorDetail} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
