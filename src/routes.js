import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import Home from './pages/home';
import Notification from './components/notification';

const Layout = ({ children }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <header>
          Links:
          {' '}
          <a href="/">Back to sails (non react page)</a>
          {' '}
          <Link className="btn" to="/reactDemo">ReactDemo (react)</Link>
          {' '}
          <Link to="/foo">Foo (react)</Link>
          {' '}
          <Link to="/bar">Bar (react)</Link>
        </header>
        <Notification />
        {children}
      </Col>
    </Row>
  </Grid>
);

const Foo = () => (<h2>Foo! router test</h2>);
const Bar = () => (<h2>Bar! router test</h2>);

const routes = (
  <Route path="/reactDemo" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="/foo" component={Foo} />
    <Route path="/bar" component={Bar} />
  </Route>
);

export default routes;
