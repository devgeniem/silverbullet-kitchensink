import React from 'react';
import { Glyphicon, Dropdown, MenuItem } from 'react-bootstrap';

export default class Header extends React.Component {

  static propTypes = {
    items: React.PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick(e) {
    e.preventDefault();
  }

  defaultItemCb() {
  }

  render() {
    var { items } = this.props;
    return (
      <Dropdown
        id="todo-header-bar-menu"
        pullRight
      >

        <Dropdown.Toggle
          className="todo-header-bar-menu-button"
          bsRole="toggle"
          noCaret
        >

          <Glyphicon
            className="todo-header-bar-user-icon"
            glyph="user"
          /></Dropdown.Toggle>

        <Dropdown.Menu bsRole="menu">
          {items.map((item) => {
            var glyphicon = item.glyphicon ? <Glyphicon glyph={item.glyphicon} /> : null;
            var callback = item.callback ? item.callback : this.defaultItemCb;

            return (<MenuItem
              key={item.title}
              onClick={() => callback(item)}
            >
              {glyphicon} {item.title}
            </MenuItem>);
          },
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

}
