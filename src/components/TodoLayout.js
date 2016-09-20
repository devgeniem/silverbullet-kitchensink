import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router';

export default ({children}) => (
  <div className="todo-wrapper">

    <header className="todo-header-bar">
      <Grid>
        <Row>
          <Col xs={1}>
            <h3>Todo</h3>
          </Col>
          <Col xs={11}>
            <Nav bsStyle="pills" activeKey={1}>

              <Link href="/lists"
                    eventKey={1}>Lists</Link>

              <Link href="/profile"
                    eventKey={2}>Profile</Link>

            </Nav>
          </Col>
        </Row>
      </Grid>
    </header>

    <div className="todo-main-content">{ children }</div>
  </div>
);
