import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

export const Layout = ({ children }) => (
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
