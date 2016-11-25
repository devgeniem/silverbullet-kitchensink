import React from 'react';
import TodoHeaderMenu from '../pages/TodoHeaderMenu';

export default class TodoMain extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  navigateTo(e, url) {
    e.preventDefault();
    e.stopPropagation();
    this.context.router.push(url);
  }

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
          <img onClick={e => this.navigateTo(e, '/')}
               src="../images/logo.svg"
               alt="Logo"/>
        </div>
        <div>
          <TodoHeaderMenu items={this.menuItems}></TodoHeaderMenu>
        </div>

      </header>
      <div className="todo-main-content">{children}</div>
    </div>);
  }
}
