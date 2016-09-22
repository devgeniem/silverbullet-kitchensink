import React from 'react';
import {FormControl, FormGroup, Button, Form, Grid, Row, Col} from 'react-bootstrap';

export default class TodoLogin extends React.Component {


  render() {

    return (<div className="todo-login-container">
      <Grid>

        <h1>Log in, mate!</h1>

        <div className="todo-login-box">

          <Form>
            <FormGroup>
              <FormControl type="email" placeholder="Email"/>
              <FormControl type="password" placeholder="Password"/>
            </FormGroup>
            <Row>
              <Col xs={12}>
                <Button className="todo-button">Login</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Grid>
    </div>);
  }
}
