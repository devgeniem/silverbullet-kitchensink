import React from 'react'
import {FormControl, FormGroup, Button, Form, Grid, Row, Col} from 'react-bootstrap'
import RegisterForm from './forms/RegisterForm'
export default class TodoRegistration extends React.Component {


  render() {

    return (<div className="todo-registration-container">
      <Grid>

        <h1>Sign up!</h1>

        <div className="todo-registration-box">
          <RegisterForm />
        </div>
      </Grid>
    </div>);
  }
}
