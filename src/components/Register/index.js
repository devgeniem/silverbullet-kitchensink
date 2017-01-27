import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import RegisterForm from '../forms/RegisterForm';

const Register = () => {
  return (
    <div className="todo-registration-container">
      <Grid>
        <h1>Sign up!</h1>
        <div className="todo-registration-box">
          <RegisterForm />
        </div>
      </Grid>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Register);

