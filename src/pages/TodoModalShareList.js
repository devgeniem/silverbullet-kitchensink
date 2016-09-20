import React from 'react';
import {connect} from 'react-redux';
import {Modal, Button, Glyphicon} from 'react-bootstrap';
import {saveItem} from '../actions/modalShareListActions';

class TodoModalShareList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  close() {
    this.setState({showModal: false});
  }

  open() {
    console.log('OPENING MODAL');
    this.setState({showModal: true});
  }

  render() {

    return (
      <div>
        <Button bsStyle="default"
                onClick={() => this.open()}>
          <Glyphicon glyph="share"/> Share list</Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Share List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            adasdsa
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.close()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(TodoModalShareList);
