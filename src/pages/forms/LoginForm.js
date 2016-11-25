import React from 'react';
import { connect } from 'react-redux';
import { FormControl, FormGroup, Button, Form, Row, Col } from 'react-bootstrap';
import Actions from '../../actions/Creators';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  submitForm(e) {
    const { dispatch } = this.props;
    console.log('LOGIN', this.state);
    Actions(dispatch).loginUser(this.state);
    e.preventDefault();
  }

  handleDataChange(data) {
    let obj = {};
    obj[data.name] = data.value;
    this.setState(obj);
  }

  render() {
    return (
      <Form onSubmit={(e) => this.submitForm(e)}>
        <FormGroup>
          <FormControl name="email" type="email" placeholder="Email" onChange={e => this.handleDataChange(e.target)} />
          <FormControl name="password" type="password" placeholder="Password" onChange={e => this.handleDataChange(e.target)} />
        </FormGroup>
        <Row>
          <Col xs={12}>
            <Button type="submit" className="todo-button">Login</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default connect()(LoginForm);
