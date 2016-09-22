import React from 'react'
import {FormControl, FormGroup, Button, Form, Grid, Row, Col} from 'react-bootstrap';

export default class RegisterForm extends React.Component {

  render() {
    return (
      <Form>
        <FormGroup>
          <FormControl type="email" placeholder="Email"/>
          <FormControl type="password" placeholder="Password"/>
        </FormGroup>
        <Row>
          <Col xs={12}>
            <Button className="todo-button">Sign up!</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}