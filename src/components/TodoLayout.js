import React from 'react';
import { translate } from 'react-i18next';
import TodoHeaderMenu from '../pages/TodoHeaderMenu';

class TodoLayout extends React.Component {

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
  }

  getMenuItems() {
    const { t } = this.props
    return ([
      {
        title: t('menuitem_1')
      },
      {
        title: t('menuitem_2')
      },
      {
        title: t('logout'),
        glyphicon: 'log-out',
        callback: function () {
          console.log('Logging out');
        }
      }
    ])
  }

  render() {
    const menuItems = this.getMenuItems();
    var {children} = this.props;
    return (<div className="todo-wrapper">

      <header className="todo-header-bar">
        <div>
          <img onClick={e => this.navigateTo(e, '/')}
               src="../images/logo.svg"
               alt="Logo"/>
        </div>
        <div>
          <TodoHeaderMenu items={menuItems}></TodoHeaderMenu>
        </div>

      </header>
      <div className="todo-main-content">{children}</div>
    </div>);
  }
}

export default translate(['common'])(TodoLayout);
