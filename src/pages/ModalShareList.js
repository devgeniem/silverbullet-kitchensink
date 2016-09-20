import React from 'react';
import {connect} from 'react-redux';
import {Modal, Button, Glyphicon} from 'react-bootstrap';
import {saveItem} from '../actions/modalShareListActions';

class ModalShareList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  closeModal() {
    this.setState({showModal: false});
  }

  openModal() {
    console.log('OPENING MODAL');
    this.setState({showModal: true});
  }

  render() {

    return (
      <div>
        <Button bsStyle="default">
          <Glyphicon
            onClick={() => this.openModal()}
            glyph="share"/> Share list</Button>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Share List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            adasdsa
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeModal()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(ModalShareList);
