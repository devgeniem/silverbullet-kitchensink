import React from 'react';
import {connect} from 'react-redux';

// BOOTSTRAP
import {ListGroupItem, Glyphicon, Button} from 'react-bootstrap';


class TodoListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRemove(id) {
    !!this.props.removeFn ? this.props.removeFn() : console.warn('TodoListItem: Callback function has not been set');
  }

  render() {

    var {children} = this.props;

    return (
      <ListGroupItem className="todo-list-item">
        <span>
          {children}
        </span>
        <Glyphicon
          glyph="remove"
          className="todo-list-item-remove-item"
          onClick={() => this.handleRemove()}/>
      </ListGroupItem>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.TodoListItem ? state.TodoListItem.items : [],
  };
}

export default connect(mapStateToProps, {})(TodoListItem);
