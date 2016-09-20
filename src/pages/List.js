import React from 'react';
import {connect} from 'react-redux';
import {removeList} from '../actions/listActions';

// BOOTSTRAP1222
import {ListGroupItem, Glyphicon} from 'react-bootstrap';


class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    removeList: React.PropTypes.func.isRequired,
  };

  render() {

    var {children} = this.props;

    return (
      <ListGroupItem>{children}
        <Glyphicon glyph="remove-sign"
                   onClick={() => this.props.removeList(this.props.id)}></Glyphicon>
      </ListGroupItem>
    );
  }
}

function mapStateToProps(state) {
  return {
    lists: state.list ? state.list.lists : [],
  };
}

export default connect(mapStateToProps, {
  removeList,
})(List);
