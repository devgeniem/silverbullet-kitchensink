import React from 'react';
import {connect} from 'react-redux';
import {Nav, NavItem} from 'react-bootstrap';

class Layout extends React.Component {


  render() {

    var {children} = this.props;

    return (
      <div className="todo-wrapper">
        <header>
          <Nav bsStyle="pills" activeKey={1}>
            <NavItem href="/todo" eventKey={1}>Rock</NavItem>
            <NavItem eventKey={2}>On</NavItem>
          </Nav>
        </header>
        <article>
          {children}
        </article>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(Layout);
