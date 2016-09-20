import React from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

class Notification extends React.Component {
  render() {
    var { notifications } = this.props;
    if (notifications && notifications.map) {
      return (
        <div>
          {notifications.map(notification =>
            <Alert key={notification.id} bsStyle={notification.style} onDismiss={() => this.props.removeNotification(notification.id)}>
              <h4>{notification.message}</h4>
            </Alert>
          )}
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notification ? state.notification.notifications : [],
  };
}

export default connect(mapStateToProps, {

})(Notification);
