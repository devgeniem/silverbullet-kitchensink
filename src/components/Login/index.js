import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import { translate } from 'react-i18next';
import LoginForm from '../forms/LoginForm';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const Login = ({ t }) => (
  <div className="todo-login-container">
    <Grid>
      <h1>{t('login_heading')}</h1>
      <div className="todo-login-box">
        <LoginForm />
      </div>
    </Grid>
  </div>
);
export default connect(mapStateToProps)(translate(['login_register'])(Login));
