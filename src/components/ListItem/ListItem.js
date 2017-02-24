import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ListGroupItem, Glyphicon } from 'react-bootstrap';

const mapStateToProps = state => ({
  items: state.TodoListItem ? state.TodoListItem.items : [],
});

@connect(mapStateToProps, {})
export default class ListItem extends React.Component {

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

  navigateTo = (e) => {
    const { allowNavigation, href } = this.props;
    if (allowNavigation) {
      e.preventDefault();
      e.stopPropagation();
      this.context.router.push(href);
    }
  }

  getPrettyDate = () => {
    const { date } = this.props;
    if (date) {
      return moment(date).format('DD.M.YYYY ');
    }
    return null;
  }

  getPrettyTime = () => {
    const { date } = this.props;
    if (date) {
      return moment(date).format('HH:mm');
    }
    return null;
  }

  getTime = () => {
    
  }
  handleRemove = (e) => {
    const { removeFn } = this.props;
    e.preventDefault();
    e.stopPropagation();
    if (removeFn) {
      removeFn();
    } else {
      // console.warn('TodoListItem: Callback function has not been set');
    }
  }

  render() {
    var { children } = this.props;

    return (
      <ListGroupItem className="todo-list-item" onClick={this.navigateTo}>
        <div className="todo-list-item-title">
          <span className="title">{children}</span>

          {this.getPrettyDate() && this.getPrettyTime() ? (
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
          ) : null }

        </div>
        <Glyphicon
          glyph="remove"
          className="todo-list-item-remove-item"
          onClick={this.handleRemove}
        />
      </ListGroupItem>
    );
  }
}
