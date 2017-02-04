import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Header, LangSwitcher } from '../../components';
import { UserActions } from '../../actions';

const mapStateToProps = state => ({
  user: state.user,
});

@connect(mapStateToProps)
@translate(['common'])
export default class Main extends React.Component {

  static propTypes = {
    t: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    children: React.PropTypes.node.isRequired,
    user: React.PropTypes.object.isRequired,
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
          <a href="/" onClick={e => this.navigateTo(e, '/')}>
            <img src="../images/logo.svg" alt="Logo" />
          </a>
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
