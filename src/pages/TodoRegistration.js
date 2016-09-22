import React from 'react';
import {FormControl, FormGroup, Button, Form, Grid, Row, Col} from 'react-bootstrap';

export default class TodoRegistration extends React.Component {


  render() {

    return (<div className="todo-registration-container">
      <Grid>

        <h1>Sign up!</h1>

        <div className="todo-registration-box">


          <Form>
            <FormGroup>
              <FormControl type="email" placeholder="Email"/>
              <FormControl type="password" placeholder="Password"/>
            </FormGroup>
            <Row>
              <Col xs={12}>
                <Button className="todo-button">Sign up!</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Grid>
    </div>);
  }
}
