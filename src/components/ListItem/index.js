import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// BOOTSTRAP
import { ListGroupItem, Glyphicon } from 'react-bootstrap';


class ListItem extends React.Component {

  static propTypes = {
    href: React.PropTypes.string,
    date: React.PropTypes.string,
    children: React.PropTypes.node,
    removeFn: React.PropTypes.func,
    allowNavigation: React.PropTypes.bool,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  static defaultProps = {
    href: '',
    date: null,
    children: null,
    removeFn: () => {},
    allowNavigation: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateTo(e, url) {
    if (this.props.allowNavigation) {
      e.preventDefault();
      e.stopPropagation();
      this.context.router.push(url);
    }
  }

  getPrettyDate() {
    const { date } = this.props;
    if (date) {
      return moment(date).format('DD.M.YYYY ');
    }

    return null;
  }

  getPrettyTime() {
    const { date } = this.props;
    if (date) {
      return moment(date).format('HH:mm');
    }

    return null;
  }

  handleRemove(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.removeFn) {
      this.props.removeFn();
    } else {
      // console.warn('TodoListItem: Callback function has not been set');
    }
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
            /> {this.getPrettyDate()}

            <Glyphicon
              className="time"
              glyph="time"
            /> {this.getPrettyTime()}
          </span>
        </div>
        <Glyphicon
          glyph="remove"
          className="todo-list-item-remove-item"
          onClick={e => this.handleRemove(e)}
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

export default connect(mapStateToProps, {})(ListItem);
