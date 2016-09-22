import React from 'react'
import {FormControl, FormGroup, Button, Form, Grid, Row, Col} from 'react-bootstrap';
import Actions from '../../actions/Creators';

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  submitForm() {
    const { dispatch } = this.props
    Actions(dispatch).loginUser(this.state)
  }

  handleDataChange(data) {
    let obj = {}
    obj[data.name] = data.value
    this.setState(obj)
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <FormControl name="email" type="email" placeholder="Email" onChange={(e) => this.handleDataChange(e.target)} />
          <FormControl name="password" type="password" placeholder="Password" onChange={(e) => this.handleDataChange(e.target)}/>
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