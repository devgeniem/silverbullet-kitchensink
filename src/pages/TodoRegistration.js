import React from 'react';
import {Input, Button} from 'react-bootstrap';

export default class TodoRegistration extends React.Component {

  render() {
    return (<div className="todo-registration-container">
      <Input type="text" placeholder="Email"/>
      <Input type="password" placeholder="Password"/>
      <Button className="todo-button">Register</Button>
    </div>);

  }
}
