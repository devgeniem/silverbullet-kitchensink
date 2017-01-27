import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import { translate } from 'react-i18next';
import RegisterForm from '../forms/RegisterForm';

const Register = ({ t }) => (
  <div className="todo-registration-container">
    <Grid>
      <h1>{t('register_heading')}</h1>
      <div className="todo-registration-box">
        <RegisterForm />
      </div>
    </Grid>
  </div>
);

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(translate(['login_register'])(Register));
