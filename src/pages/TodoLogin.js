import React from 'react';
import {Input, Button} from 'react-bootstrap';

export default class TodoLogin extends React.Component {

  render() {
    return (<div className="todo-login-container">
      <Input type="text" placeholder="Email"/>
      <Input type="password" placeholder="Password"/>
      <Button className="todo-button">Login</Button>
    </div>);

  }
}
