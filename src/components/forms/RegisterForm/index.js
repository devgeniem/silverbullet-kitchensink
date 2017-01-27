import React from 'react';
import { FormControl, FormGroup, Button, Form, Row, Col } from 'react-bootstrap';
import { UserActions } from '../../../actions';

export default class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  submitForm = () => {
    const { dispatch } = this.props;
    UserActions(dispatch).registerUser(this.state);
  }

  handleDataChange(data) {
    const obj = {};
    obj[data.name] = data.value;
    this.setState(obj);
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <FormControl name="name" type="text" placeholder="Name" onChange={e => this.handleDataChange(e.target)} />
          <FormControl name="email" type="email" placeholder="Email" onChange={e => this.handleDataChange(e.target)} />
          <FormControl name="password" type="password" placeholder="Password" onChange={e => this.handleDataChange(e.target)} />
        </FormGroup>
        <Row>
          <Col xs={12}>
            <Button onClick={this.submitForm} className="todo-button">Sign up!</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
