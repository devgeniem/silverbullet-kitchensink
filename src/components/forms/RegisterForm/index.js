import React from 'react';
import { translate } from 'react-i18next';
import { FormControl, FormGroup, Button, Form, Row, Col } from 'react-bootstrap';
import { UserActions } from '../../../actions';

@translate('login_register', 'common')
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
    const { t } = this.props;

    return (
      <Form>
        <FormGroup>
          <FormControl name="name" type="text" placeholder={t('name')} onChange={e => this.handleDataChange(e.target)} />
          <FormControl name="email" type="email" placeholder={t('email')} onChange={e => this.handleDataChange(e.target)} />
          <FormControl name="password" type="password" placeholder={t('password')} onChange={e => this.handleDataChange(e.target)} />
        </FormGroup>
        <Row>
          <Col xs={12}>
            <Button onClick={this.submitForm} className="todo-button">{t('register')}</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
