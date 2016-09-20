import React from 'react';
import {Nav, NavItem, Grid, Row, Col} from 'react-bootstrap';

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

              <NavItem href="/lists"
                       eventKey={1}>Lists</NavItem>

              <NavItem href="/profile"
                       eventKey={2}>Profile</NavItem>

            </Nav>
          </Col>
        </Row>
      </Grid>
    </header>

    <div className="todo-main-content">{ children }</div>
  </div>
);
