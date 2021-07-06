import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import AuthorList from './views/AuthorList';
import AuthorDetail from './views/AuthorDetail';
import NotFound from './views/NotFound';
import Login from './views/Login';
import SignUp from './views/SignUp';
import AuthContextProvider from './contexts/AuthContext';

export default function Routes() {
  return (
    <AuthContextProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/authors" component={AuthorList} />
        <Route exact path="/authors/:id" component={AuthorDetail} />
        <Route component={NotFound} />
      </Switch>
    </AuthContextProvider>
  );
}
