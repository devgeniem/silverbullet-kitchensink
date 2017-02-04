import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import { translate } from 'react-i18next';
import LoginForm from '../forms/LoginForm';

const mapStateToProps = state => ({
  user: state.user,
});

@connect(mapStateToProps)
@translate(['login_register'])
export default class Login extends React.Component {

  static propTypes = {
    t: React.PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    return (
      <div className="todo-login-container">
        <Grid>
          <h1>{t('login_heading')}</h1>
          <div className="todo-login-box">
            <LoginForm />
          </div>
        </Grid>
      </div>
    );
  }
}
