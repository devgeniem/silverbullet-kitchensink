import React from 'react';
import {Glyphicon, Dropdown, MenuItem} from 'react-bootstrap';

export default class TodoHeaderMenu extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {};
  }

  handleClick(e) {
    e.preventDefault();
  }

  render() {
    return (
      <Dropdown id="todo-header-bar-menu"
                pullRight>

        <Dropdown.Toggle className="todo-header-bar-menu-button"
                         bsRole="toggle"
                         noCaret>

          <Glyphicon className="todo-header-bar-user-icon"
                     glyph="user"/></Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu"
                       bsRole="menu">
          <MenuItem>Rairai</MenuItem>
          <MenuItem>Logout</MenuItem>

        </Dropdown.Menu>
      </Dropdown>
    )
  }

}
