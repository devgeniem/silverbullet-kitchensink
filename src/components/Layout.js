import React from 'react';
import {Nav, NavItem, Grid, Row, Col} from 'react-bootstrap';

export default ({children}) => (<div>
    <Grid className="todo-wrapper">
      <Row>
        <Col xs={12}>
          <Nav bsStyle="pills" activeKey={1}>

            <NavItem href="/lists"
                     eventKey={1}>Lists</NavItem>

            <NavItem href="/profile"
                     eventKey={2}>Profile</NavItem>

          </Nav>
        </Col>
      </Row>
    </Grid>

    <div className="todo-main-content">{ children }</div>
  </div>
);
