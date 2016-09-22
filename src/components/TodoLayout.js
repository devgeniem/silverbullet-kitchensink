import React from 'react';
import TodoHeaderMenu from '../pages/TodoHeaderMenu';
import {Link} from 'react-router';


export default class TodoMain extends React.Component {

  constructor(props) {
    super(props);

    this.menuItems = [{
      title: 'Rairai'
    }, {
      title: 'Logout',
      glyphicon: 'log-out',
      callback: function () {
        console.log('Logging out');
      }
    }];
  }

  render() {

    var {children} = this.props;

    return (<div className="todo-wrapper">

      <header className="todo-header-bar">
        <div>
          <Link to="/reactDemo/">
            <img src="../images/logo.svg"
                 alt="Logo"/></Link>
        </div>
        <div>
          <TodoHeaderMenu items={this.menuItems}></TodoHeaderMenu>
        </div>

      </header>
      <div className="todo-main-content">{children}</div>
    </div>);
  }
}
