import React from 'react';
import { connect } from 'react-redux';

import { Button, Glyphicon, Row, Col, Grid, ListGroup } from 'react-bootstrap';
import TodoListItem from '../pages/TodoListItem';

class TodoMain extends React.Component {

  render() {
    console.log("props", this.props.lists);
    var lists = this.props.lists;
    const createListPath = "/reactDemo/create-list/";
    var AddNewButton = (
      <Button
        href="/reactDemo/create-list"
        className="todo-button"
      >
        <Glyphicon glyph="plus" /> Add a new list
        </Button>
      );

    if (lists && lists.map) {
      return (
        <Grid>
          <Row>
            <Col xs={12}>
              <ListGroup>
                {lists.map((list) => {
                  return (
                    <TodoListItem
                      id={list.id}
                      key={list.id}
                      href={createListPath + list.id}
                      >
                      {list.name}
                    </TodoListItem>
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
  console.log('maptStateToProps', state);
  return {
    lists: state.todo.lists,
  };
}

export default connect(mapStateToProps)(TodoMain);
