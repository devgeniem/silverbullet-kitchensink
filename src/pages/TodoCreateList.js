import React from 'react';
import uuid from 'node-uuid';
import {connect} from 'react-redux';
import {Form, Grid, FormControl, Button, Glyphicon, Row, Col, FormGroup} from 'react-bootstrap';
import R from 'ramda';

import Actions from '../actions/Creators';
import TodoListItem from './TodoListItem';
import TodoModalShareList from './TodoModalShareList';

class TodoCreateList extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      itemTitle: '',
      items: [],
    };

  }

  saveDisabled() {
    return !(this.state.listTitle);
  }

  // Fixes an issue with controllable/uncontrollable inputs. You might
  // wanna check if there's better way of doing this
  getListTitle() {
    return this.state.listTitle || '';
  }

  handleSaveButton() {
    var data = {
      items: this.state.items,
      title: this.state.listTitle,
    };
    var {dispatch} =  this.props;
    console.log(data);
    dispatch(Actions.createList);
  }

  handleAddItemButton(name) {
    if (!!name) {

      var item = {
        name,
        id: uuid.v1(),
        modifiedDate: new Date()
      };

      this.setState({
        items: R.append(item, this.state.items),
      });
    }
  }

  handleItemRemoval(id) {
    console.log(this.props, id);
//    this.props.removeItem(id);
  }


  render() {

    var {todos} = this.props;
    var items = this.state.items;
    var existingItem;
    //TODO: this should probably be in didReceiveNewProps or smhitng
    if (!!this.props.params) {
      var itemId = this.props.params.listId;
      var existingItemIndex = R.find(obj => obj.key === itemId, todos);
      if (existingItemIndex !== -1) {
        existingItem = todos[existingItemIndex];
      }
    }

    console.log("items", items);
    console.log("context", this);


    return (
      <div className="todo-create-list-container">
        <Grid>

          <h1>Create a new list</h1>

          <Form>
            <FormGroup>
              <Row>
                <Col xs={12}>
                  <FormControl value={this.getListTitle()}
                               type="text"
                               placeholder="Enter title"
                               onChange={e => this.setState({listTitle: e.target.value})}
                  />

                </Col>
              </Row>

              <br />

              <Row className="todo-create-list-add-item-container">

                <Col xs={12}>

                  <FormControl value={this.state.itemTitle}
                               type="text"
                               placeholder="Item title"
                               onChange={e => this.setState({itemTitle: e.target.value})}
                  />

                  <Button className="todo-create-list-add-item-button"
                          disabled={!this.state.itemTitle}
                          onClick={() => this.handleAddItemButton(this.state.itemTitle)}>
                    <Glyphicon glyph="plus"/>
                  </Button>

                </Col>
              </Row>

              {items.length > 0 ? <div className="todo-create-list-items-container">

                {items.map((item) => {
                    return (
                      <TodoListItem key={item.id}
                                    date={item.modifiedDate}
                                    removeFn={e => this.handleItemRemoval(item)}
                                    id={item.id}>{item.name}</TodoListItem>
                    );
                  }
                )}
              </div> : null }

              <Row className="todo-create-list-control-buttons">
                <Col xs={12}>
                  <Button className="todo-button"
                          onClick={() => this.handleSaveButton()}
                          disabled={this.saveDisabled()}>

                    <Glyphicon glyph="save"/> Save</Button>
                  <TodoModalShareList />
                </Col>
              </Row>
            </FormGroup>
          </Form>

        </Grid>
      </div>
    )
      ;
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todo.lists,
  };
}

export default connect(mapStateToProps)(TodoCreateList);
