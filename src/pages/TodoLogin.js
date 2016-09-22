import React from 'react';
import LoginForm from './forms/LoginForm';
import {Grid} from 'react-bootstrap';

export default class TodoLogin extends React.Component {


  render() {

    return (
      <div className="todo-login-container">
        <Grid>
          <h1>Log in, mate!</h1>
          <div className="todo-login-box">
            <LoginForm />
          </div>
        </Grid>
      </div>);
  }
}
