import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Header from '../../components/Header';
import LangSwitcher from '../../components/LangSwitcher';
import { UserActions } from '../../actions';

class App extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func,
    children: React.PropTypes.node,
    user: React.PropTypes.object,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  getMenuItems() {
    const { t, user, dispatch } = this.props;
    if (user.isLoggedIn) {
      return [
        {
          title: user.profile.name ? user.profile.name : 'no name',
        },
        {
          title: t('menuitem_1'),
        },
        {
          title: t('menuitem_2'),
        },
        {
          title: t('logout'),
          glyphicon: 'log-out',
          callback: function () {
            UserActions(dispatch).logoutUser();
            window.location.replace('/login');
          },
        },
      ];
    }
    return [];
  }

  navigateTo(e, url) {
    e.preventDefault();
    e.stopPropagation();
    this.context.router.push(url);
  }

  render() {
    const menuItems = this.getMenuItems();
    const { children, user } = this.props;

    return (<div className="todo-wrapper">
      <header className="todo-header-bar">
        <div>
          <img
            onClick={e => this.navigateTo(e, '/')}
            src="../images/logo.svg"
            alt="Logo"
          />
        </div>
        <div>
          <LangSwitcher />
          { user.isLoggedIn ?
            <Header items={menuItems} /> : null
          }
        </div>
      </header>
      <div className="todo-main-content">{children}</div>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(translate(['common'])(App));
