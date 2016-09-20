import React from 'react';
import {connect} from 'react-redux';

// BOOTSTRAP
import {ListGroupItem, Glyphicon} from 'react-bootstrap';


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
    console.log(this.props);

    return (
      <ListGroupItem className="todo-list-item">
        <h4>{children}</h4>
        <Glyphicon glyph="remove-sign"
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
