import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
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
          <Button bsStyle="danger" onClick={() => this.props.addNotification('danger', 'This it the Error message!')}>
            Fail
          </Button>
          <Button bsStyle="success" type="button" onClick={() => this.props.addNotification('success', 'This is the Success message!')}>
            Succeed
          </Button>
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
