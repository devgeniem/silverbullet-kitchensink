import React from 'react';
import { connect } from 'react-redux';
import { addNotification } from '../actions/notificationActions';

class Home extends React.Component {

  static propTypes = {
    addNotification: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <h1>React Demo App</h1>
        <form>
          <input type="text" name="demo" />
          <button type="button" onClick={() => this.props.addNotification('success', 'Button pressed')}>Set</button>
        </form>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {
  addNotification,
})(Home);
