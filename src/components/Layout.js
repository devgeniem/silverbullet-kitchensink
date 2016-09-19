import React from 'react';
import {Link} from 'react-router';
import {Nav, NavItem, Col} from 'react-bootstrap';

export default ({children}) => (
  <Col xs={12} className="todo-wrapper">
    <Nav bsStyle="pills" activeKey={1}>

      <NavItem href="/lists"
               eventKey={1}>Lists</NavItem>

      <NavItem href="/profile"
               eventkey={2}>Profile</NavItem>

    </Nav>

    <div className="todo-main-content">
      { children }
    </div>
  </Col>
);
