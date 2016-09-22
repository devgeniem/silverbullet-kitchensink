import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// BOOTSTRAP
import { ListGroupItem, Glyphicon } from 'react-bootstrap';


class TodoListItem extends React.Component {

  static propTypes = {
    href: React.PropTypes.string,
    date: React.PropTypes.string,
    children: React.PropTypes.node,
    removeFn: React.PropTypes.func,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateTo(e, url) {
    e.preventDefault();
    e.stopPropagation();
    this.context.router.push(url);
  }

  getPrettyDate(date) {
    if (date) return moment(date).format('DD.M.YYYY ');
    return null;
  }

  getPrettyTime(date) {
    if (date) return moment(date).format('HH:mm');
    return null;
  }

  handleRemove(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.removeFn ? this.props.removeFn() : console.warn('TodoListItem: Callback function has not been set');
  }

  render() {

    var { children } = this.props;

    return (
      <ListGroupItem className="todo-list-item" onClick={e => this.navigateTo(e, this.props.href)}>
        <div className="todo-list-item-title">
          <span>{children}</span>
          <span>
            <Glyphicon
              className="time"
              glyph="calendar"
            /> {this.getPrettyDate(this.props.date)}

            <Glyphicon
              className="time"
              glyph="time"
            /> {this.getPrettyTime(this.props.date)}
          </span>
        </div>
        <Glyphicon
          glyph="remove"
          className="todo-list-item-remove-item"
          onClick={(e) => this.handleRemove(e)}
        />
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
