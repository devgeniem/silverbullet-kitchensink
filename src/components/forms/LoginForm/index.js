import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FormControl, FormGroup, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import Actions from '../../../actions/Creators';

@connect()
@withRouter
export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false,
    };
  }

  submitForm = (e) => {
    const { dispatch, location, router } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    Actions(dispatch).loginUser({ email, password })
      .then(() => {
        if (location.state && location.state.nextPathname) {
          window.location.replace(location.state.nextPathname);
        } else {
          window.location.replace('/');
        }
      })
      .catch((err) => {
        if (err.text) {
          this.setState({
            error: err.text,
          });
        } else {
          console.error('LOGIN ERROR', err);
        }
      });
  }

  handleDataChange(data) {
    const obj = {};
    obj[data.name] = data.value;
    this.setState(obj);
  }

  render() {
    return (
      <Form onSubmit={this.submitForm}>
        { this.state.error && <Alert bsStyle="danger">{this.state.error}</Alert> }
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
