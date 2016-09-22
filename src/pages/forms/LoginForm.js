import React from 'react'
import {FormControl, FormGroup, Button, Form, Grid, Row, Col} from 'react-bootstrap';
import Actions from '../../actions/Creators';

export default class LoginForm extends React.Component {

  submitForm() {
    console.log(this.refs)
    //Actions.loginUser(data)
  }

  render() {
    return (
      <Form ref="loginForm">
        <FormGroup>
          <FormControl type="email" placeholder="Email"/>
          <FormControl type="password" placeholder="Password"/>
        </FormGroup>
        <Row>
          <Col xs={12}>
            <Button onClick={this.submitForm} className="todo-button">Login</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}