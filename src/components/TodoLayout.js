import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';

export default ({children}) => (
  <div className="todo-wrapper">

    <header className="todo-header-bar">
      <Grid>
        <Row>
          <Col xs={1}>
            <Link to="/"
                  eventKey={1}><img src="../images/logo.svg"
                                    alt=""/></Link>
          </Col>
          <Col xs={11}
               className="todo-header-nav-items">


            <Link to="/profile"
                  eventKey={2}>Profile</Link>

          </Col>
        </Row>
      </Grid>
    </header>

    <div className="todo-main-content">{ children }</div>
  </div>
);
