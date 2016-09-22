import React from 'react'
import {FormControl, FormGroup, Button, Form, Grid, Row, Col} from 'react-bootstrap';
import Actions from '../../actions/Creators';

export default class LoginForm extends React.Component {

  submitForm() {
    console.log(this.refs.loginForm)
    //console.log(this.refs)
    //Actions.loginUser(data)
  }

  render() {
    return (
      <Form ref="loginForm">
        <FormGroup>
          <FormControl name="email" type="email" placeholder="Email"/>
          <FormControl name="password" type="password" placeholder="Password"/>
        </FormGroup>
        <Row>
          <Col xs={12}>
            <Button onClick={this.submitForm.bind(this)} className="todo-button">Login</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}