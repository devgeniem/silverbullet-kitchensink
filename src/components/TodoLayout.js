import React from 'react';
import TodoHeaderMenu from '../pages/TodoHeaderMenu';
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
        <TodoHeaderMenu></TodoHeaderMenu>
      </div>

    </header>
    <div className="todo-main-content">{children}</div>
  </div>


);
