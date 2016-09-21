import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router';

export default ({children}) => (
  <div className="todo-wrapper">

    <header className="todo-header-bar">
      <div>
        <Link to="/">
          <img src="../images/logo.svg"
               alt=""/></Link>
      </div>
      <div>
        <Link to="/profile">
          <Glyphicon className="todo-header-bar-user-icon"
                     glyph="user"/></Link>
      </div>

    </header>
    <div className="todo-main-content"> {children}</div>
  </div>
);
