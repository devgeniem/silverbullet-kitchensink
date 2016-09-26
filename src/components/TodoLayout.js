import React from 'react';
import { connect } from 'react-redux';
import TodoHeaderMenu from '../pages/TodoHeaderMenu';
import Actions from '../actions/Creators';

class TodoMain extends React.Component {

  static propTypes = {
    dispatch: React.PropTypes.func,
    children: React.PropTypes.node,
    user: React.PropTypes.object,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.menuItems = [];

    if (props.user.name) {
      var { dispatch } = props;
      this.menuItems = [{
        title: props.user.name,
      }, {
        title: 'Logout',
        glyphicon: 'log-out',
        callback: () => Actions(dispatch).logoutUser(),
      }];
    }
  }

  navigateTo(e, url) {
    e.preventDefault();
    e.stopPropagation();
    this.context.router.push(url);
  }

  render() {
    var { children, user } = this.props;
    return (<div className="todo-wrapper">
      <header className="todo-header-bar">
        <div>
          <a href="#" onClick={e => this.navigateTo(e, '/reactDemo')}>
            <img src="../images/logo.svg" alt="Logo" />
          </a>
        </div>
        { user.isLoggedIn ?
          <div>
            <TodoHeaderMenu items={this.menuItems} />
          </div> :
          null
        }
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

export default connect(mapStateToProps)(TodoMain);
