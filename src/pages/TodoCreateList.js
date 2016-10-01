import React from 'react';
import uuid from 'node-uuid';
import {connect} from 'react-redux';
import {Form, Grid, FormControl, Button, Glyphicon, Row, Col, FormGroup} from 'react-bootstrap';


// FIXME: we should maybe pick one? :)
import R from 'ramda';
import _ from 'lodash';

import Actions from '../actions/Creators';
import TodoListItem from './TodoListItem';
import TodoModalShareList from './TodoModalShareList';


class TodoCreateList extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      itemTitle: '',
      items: [],
      existingItem: false,
    };
  }

  saveDisabled() {
    return !(this.state.listTitle &&
    this.state.items.length !== 0);
  }

  componentDidMount() {
    if (!!this.props.params) {
      var itemId = this.props.params.listId;
      var existingItem = R.find(obj=> obj.id === itemId, this.props.todos )
      if ( !existingItem ) return;
      this.setState({
        listTitle: existingItem.title,
        existingItem: existingItem,
        items: existingItem.items,
      });
    }
  }

  navigateTo(url) {
    this.context.router.push(url);
  }

  // Fixes an issue with controllable/uncontrollable inputs. You might
  // wanna check if there's better way of doing this
  getListTitle() {
    return this.state.listTitle || '';
  }

  handleSaveButton() {

    var items = this.state.items;
    var title = this.state.listTitle;
    var {dispatch} =  this.props;
    var data = {title, items};

    console.log("state", this.state);
    console.log("props", this.props);
    let promise;

    if  (this.state.existingItem) {
      let id = this.state.existingItem.id;  
      promise = Actions(dispatch).modifyList(id, data);
    }
    else {
      promise =  Actions(dispatch).createList(data);
    }
    promise.then(res => {
      this.navigateTo('/reactDemo');
    });
  }

  handleAddItemButton(title) {
    if (!!title) {
      var item = {
        title,
        id: uuid.v1(),
      };
      this.setState({
        items: R.append(item, this.state.items),
      });
    }

    this.setState({itemTitle: ''});
  }


  handleItemRemoval(item) {
    var tempItems = this.state.items;

    _.remove(tempItems, tempItem => tempItem.id === item.id);

    this.setState({
      items: tempItems
    });

  }


  render() {
    var {todos} = this.props;
    var items = this.state.items;
    var pageTitle = !!this.props.params.listId ? 'Edit list ' + (this.state.listTitle || '') : 'Create a new list';

    return (
      <div className="todo-create-list-container">
        <Grid>

          <h1>{pageTitle}</h1>

          <Form>
            <FormGroup>
              <Row>
                <Col xs={12}>
                  <FormControl value={this.getListTitle()}
                               type="text"
                               placeholder="Enter title"
                               onChange={e => this.setState({listTitle: e.target.value})}/>
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

              {items.length > 0 ?
                <div className="todo-create-list-items-container">
                  {items.map((item) => {
                    if ( !item ) return;
                      return (
                        <TodoListItem
                          key={item.id}
                          removeFn={e => this.handleItemRemoval(item)}
                          id={item.id}
                          date={item.date}>

                          {item.title}
                        </TodoListItem>
                      );
                    }
                  )}
                </div>
                : null }

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
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todo.lists,
  };
}

export default connect(mapStateToProps)(TodoCreateList);
