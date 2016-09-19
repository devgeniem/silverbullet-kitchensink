import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Layout from './pages/Layout';


const routes = (
  <Route path="/todo" component={Layout}>
    <Route></Route>
  </Route>
);

export default routes;

