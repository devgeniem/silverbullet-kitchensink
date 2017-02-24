import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import { FormControl, FormGroup, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { UserActions } from '../../../actions';

@connect()
@withRouter
@translate(['common', 'login_register'])
export default class LoginForm extends React.Component {

  static propTypes = {
    t: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: false,
    };
  }

  submitForm = (e) => {
    const { dispatch, location } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    UserActions(dispatch).loginUser({ email, password })
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
          // console.error('LOGIN ERROR', err);
        }
      });
  }

  handleDataChange(data) {
    const obj = {};
    obj[data.name] = data.value;
    this.setState(obj);
  }

  render() {
    const { t } = this.props;

    return (
      <Form onSubmit={this.submitForm}>
        { this.state.error && <Alert bsStyle="danger">{this.state.error}</Alert> }
        <FormGroup>
          <FormControl name="email" type="email" placeholder={t('email')} onChange={e => this.handleDataChange(e.target)} />
          <FormControl name="password" type="password" placeholder={t('password')} onChange={e => this.handleDataChange(e.target)} />
        </FormGroup>
        <Row>
          <Col xs={12}>
            <Button type="submit" className="todo-button">{t('login')}</Button>
          </Col>
          <Col xs={12}>
            <br/>
            <p className="text-center">{t('no_account')} <a href="/register">{t('register')}</a></p>
          </Col>
        </Row>
      </Form>
    );
  }
}
