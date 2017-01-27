import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import LoginForm from '../forms/LoginForm';

const Login = () => (
  <div className="todo-login-container">
    <Grid>
      <h1>Log in, mate!</h1>
      <div className="todo-login-box">
        <LoginForm />
      </div>
    </Grid>
  </div>
);

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Login);
