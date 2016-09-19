import React from 'react';
import {connect} from 'react-redux';

class Lists extends React.Component {


  render() {

    var {lists} = this.props;

    if (lists && lists.map) {
      return (
        <div>
          Whazzup
          {lists.map(list =>
            <h1>{list.message}</h1>
          )}</div>
      );
    } else {
      return (<div>You haven't got any lists, man</div>);
    }
  }

}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(Lists);
