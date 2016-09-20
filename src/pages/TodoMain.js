import React from 'react';
import {connect} from 'react-redux';
import {Button, Glyphicon, Row, Col, Grid, ListGroup} from 'react-bootstrap';
import TodoListItem from './TodoListItem';

// FIXME: only for mocking purposes
import uuid from 'node-uuid';

class TodoMain extends React.Component {

  render() {


    // FIXME: fix the href
    var AddNewButton = (<Button href="create-list"
                                className="todo-button"><Glyphicon glyph="plus"/> Add a new list</Button>);

    var listMock = [{
      name: 'Mock lista nummer uno',
      id: uuid.v1(),
      modified: new Date(),
      items: [{
        id: uuid.v1(),
        name: 'Osta tyynyjä'
      }]
    }, {
      name: 'Mocklista 2',
      modified: new Date(),
      id: uuid.v1(),
      items: [{
        id: uuid.v1(),
        name: 'Osta matto'
      }]
    }];

    var lists = listMock;

    if (lists && lists.map) {
      return (
        <Grid>
          <Row>
            <Col xs={12}>
              <ListGroup>
                {lists.map(list => {
                    return (
                      <TodoListItem id={list.id}
                                    key={list.id}>{list.name}</TodoListItem>
                    );
                  }
                )}
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12}> { AddNewButton }</Col>
          </Row>
        </Grid>
      );

    } else {
      return (
        <Grid>
          <Row>
            <Col xs={12}>You haven't got any lists, man</Col>
          </Row>
          <Row>
            <Col xs={12}>{ AddNewButton }</Col>
          </Row>
        </Grid>);
    }
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {};
}

export default connect(mapStateToProps, {})(TodoMain);
